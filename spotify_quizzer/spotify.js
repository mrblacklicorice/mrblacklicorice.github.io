var intro = document.getElementById("intro");
var playlistQuiz = document.getElementById("playlistQuiz");

var login = document.getElementById("login");
var allPlaylists = document.getElementById("allPlaylists");
var options = document.getElementById("options");

var loginBtn = document.getElementById("loginBtn");
var playlistList = document.getElementById("playlistList");
var metadata = document.getElementById("metadata");
var generateQuizBtn = document.getElementById("generateQuizBtn");

var titleOpt = document.getElementById("titleOpt");
var artistOpt = document.getElementById("artistOpt");
var albumOpt = document.getElementById("albumOpt");
var numQuestions = document.getElementById("numQuestions");

var tracker = document.getElementById("tracker");
var answerBtnCont = document.getElementById("answers");
var questionPrompt = document.getElementById("question-prompt");
var playBtn = document.getElementById("play-btn");
var audio = document.getElementById("audio");

var allSongs = {};

// Your client id from your app in the spotify dashboard:
// https://developer.spotify.com/dashboard/applications
const client_id = '3fd2f3455a9d44c892ff4547a8b354c8';
const redirect_uri = 'https://mrblacklicorice.github.io/spotify_quizzer/'; // Your redirect uri

// Restore tokens from localStorage
let access_token = localStorage.getItem('access_token') || null;
let refresh_token = localStorage.getItem('refresh_token') || null;
let expires_at = localStorage.getItem('expires_at') || null;

// If the user has accepted the authorize request spotify will come back to your application with the code in the response query string
// Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

if (code) {
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
} else if (access_token && refresh_token && expires_at) {
    // we are already authorized and reload our tokens from localStorage
    // document.getElementById('loggedin').style.display = 'unset';
    getUserData();
}

var currentQuestion = 0;
var correctAnswers = 0;
var maxQuestions = 0;

loginBtn.addEventListener("click", redirectToSpotifyAuthorizeEndpoint, false);

generateQuizBtn.addEventListener("click", function () {
    if ((titleOpt.checked || artistOpt.checked || albumOpt.checked) && numQuestions.value >= 1 && numQuestions.value < 51) {
        numQuestions.value = String(Math.floor(Number(numQuestions.value)));
        console.log(numQuestions.value);
        maxQuestions = Number(numQuestions.value);

        // set options to not active
        options.classList.toggle("active");
        options.nextElementSibling.classList.toggle("active-content");

        intro.style.display = "none";
        playlistQuiz.style.display = "flex";

        for (let i = 0; i < maxQuestions; i++) {
            tracker.innerHTML += `<span class="fut"> </span>`;
        }

        displayQuestions();
    } else {
        alert("Please select at least one option and enter a valid number of questions");
    }
});

playBtn.addEventListener("click", function () {
    playBtn.classList.toggle("paused");

    if (!playBtn.classList.contains("paused")) audio.pause();
    else audio.play();
});

function displayQuestions() {
    console.log(currentQuestion);
    tracker.querySelectorAll("span")[currentQuestion].className = "cur";

    var question = { question: "What is the album", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png", answers: ["option 1", "option 2", "option 3", "option 4"], correct: "option 1" };
    var answerButtons = answerBtnCont.querySelectorAll("button");
    questionPrompt.querySelector("img").src = question.url;
    questionPrompt.querySelector("p").innerHTML = question.question;

    for (let i = 0; i < 4; i++) {
        answerButtons[i].innerText = question.answers[i];
        answerButtons[i].addEventListener("click", function callback() {
            if (answerButtons[i].innerText == question.correct) {
                correctAnswers++;
                tracker.querySelectorAll("span")[currentQuestion].className = "cr";
            } else {
                tracker.querySelectorAll("span")[currentQuestion].className = "icr";
            }

            for (let j = 0; j < answerButtons.length; j++) {
                if (answerButtons[j].innerText == question.correct) answerButtons[j].style.backgroundColor = "#1ED760";
                else answerButtons[j].style.backgroundColor = "#ee5151";

                answerButtons[j].disabled = true;
            }

            setTimeout(function () {
                if (currentQuestion == maxQuestions - 1) {
                    playlistQuiz.innerHTML = `<h2>You got ${correctAnswers} out of ${maxQuestions} correct!</h2><button onclick="location.reload()">Start Over</button>`;
                } else {
                    currentQuestion++;
                    audio.pause();
                    playBtn.classList.remove("paused");
                    audio.src = "https://p.scdn.co/mp3-preview/234b101c79bc2141a46b389c441ec1dadd5be384?cid=3fd2f3455a9d44c892ff4547a8b354c8";
                    answerBtnCont.innerHTML = `<button></button><button></button><button></button><button></button>`;
                    displayQuestions();
                }
            }, 500);
        });
    }
}


function displayPlaylistOptions(id) {
    // set allPlaylists to not active
    allPlaylists.classList.toggle("active");
    allPlaylists.nextElementSibling.classList.toggle("active-content");

    // set options to active
    options.classList.toggle("active");
    options.nextElementSibling.classList.toggle("active-content");

    // set metadata to active
    metadata.innerHTML = helperOptionTemplate(data);
}


function helperPlaylistTemplate(playlist) {
    return `<li>
                <div class="list-element">
                    <div class="playlist-container" onclick="getPlaylistData('${playlist.id}')">
                        <img src="${(playlist.images.length > 0) ? playlist.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png'}"
                            alt="logo">
                            <p>${playlist.name}</p>
                    </div>
                </div>
            </li>`
}

function helperOptionTemplate(data) {
    return `<div class="col">
                        <h2>${data.title}</h2>
            </div>
            <div class="col">
                <p>${data.description}</p>
            </div>
            <div class="col">
                <p>Author: ${data.author}</p>
                <p>Total Tracks: ${data.totalTracks}</p>
                <p>Valid Tracks: ${data.validTracks}</p>
            </div>`;
}

function generateRandomString(length) {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier),
    );

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function generateUrlWithSearchParams(url, params) {
    const urlObject = new URL(url);
    urlObject.search = new URLSearchParams(params).toString();

    return urlObject.toString();
}

function redirectToSpotifyAuthorizeEndpoint() {
    const codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((code_challenge) => {
        window.localStorage.setItem('code_verifier', codeVerifier);

        // Redirect to example:
        // GET https://accounts.spotify.com/authorize?response_type=code&client_id=77e602fc63fa4b96acff255ed33428d3&redirect_uri=http%3A%2F%2Flocalhost&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256

        window.location = generateUrlWithSearchParams(
            'https://accounts.spotify.com/authorize',
            {
                response_type: 'code',
                client_id,
                scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative',
                code_challenge_method: 'S256',
                code_challenge,
                redirect_uri,
            },
        );

        // If the user accepts spotify will come back to your application with the code in the response query string
        // Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
    });
}

function exchangeToken(code) {
    const code_verifier = localStorage.getItem('code_verifier');

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
            code_verifier,
        }),
    }).then(addThrowErrorToFetch).then((data) => {
        processTokenResponse(data);

        // clear search query params in the url
        window.history.replaceState({}, document.title, '/');
    }).catch(handleError);
}

function refreshToken() {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'refresh_token',
            refresh_token,
        }),
    }).then(addThrowErrorToFetch).then(processTokenResponse).catch(handleError);
}

function handleError(error) {
    console.error(error);
    alert(error.message);
}

async function addThrowErrorToFetch(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw { response, error: await response.json() };
    }
}

function processTokenResponse(data) {
    console.log(data);

    access_token = data.access_token;
    refresh_token = data.refresh_token;

    const t = new Date();
    expires_at = t.setSeconds(t.getSeconds() + data.expires_in);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_at', expires_at);

    // load data of logged in user
    getUserData();
}

function getUserData() {
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + access_token,
        },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw await response.json();
        }
    }).then((data) => {
        // set login to not active
        login.classList.toggle("active");
        login.nextElementSibling.classList.toggle("active-content");

        // greet user
        login.innerText = "Hello " + data.display_name;

        // set allPlaylists to active
        allPlaylists.classList.toggle("active");
        allPlaylists.nextElementSibling.classList.toggle("active-content");

        getUserPlaylistData();
    }).catch((error) => {
        if (error.error.status === 401) {
            refreshToken();
        } else {
            console.error(error);
            handleError(error);
        }
    });
}

function getUserPlaylistData() {
    fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: 'Bearer ' + access_token,
        },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw await response.json();
        }
    }).then((data) => {
        console.log(data);

        // add playlists to playlistList
        for (var i = 0; i < data.items.length; i++) {
            // console.log(data.items[i]);
            playlistList.innerHTML += helperPlaylistTemplate(data.items[i]);
        }

        // document.getElementById('playlistsContainer').style.display = 'unset';
        // allPlaylistsPlaceholder.innerHTML = userAllPlaylistsTemplate(data);
    }).catch((error) => {
        console.error(error);
        handleError(error);
    });
}

function getPlaylistData(playlistID, fetchURL) {
    console.log(playlistID, fetchURL);
    fetch((fetchURL) ? fetchURL : `https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
            Authorization: 'Bearer ' + access_token,
        },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw await response.json();
        }
    }).then((d) => {
        console.log(d);
        var data = {};
        if (d.tracks == undefined) data.tracks = d;
        else data = d;

        if (!fetchURL) {
            allSongs = data;
        } else {
            allSongs.tracks.items.push(...data.tracks.items);
        }

        console.log(allSongs);

        // for (let i = 0; i < data.tracks.items.length; i++) {
        //     tempPlaylists += userPlaylistItem(data.tracks.items[i]);
        // }

        // if (data.tracks.next) {
        //     setTimeout(() => {
        //         getPlaylistData(playlistID, data.tracks.next);
        //     }, 50);
        // } else {
        //     // tempPlaylists += "</table>";
        //     // // console.log(tempPlaylists);
        //     // playlistPlaceholder.innerHTML = tempPlaylists;
        // }
    }).catch((error) => {
        console.error(error);
        handleError(error);
    });
}