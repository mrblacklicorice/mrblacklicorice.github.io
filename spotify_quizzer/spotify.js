var intro = document.getElementById("intro");
var playlistQuiz = document.getElementById("playlistQuiz");
var results = document.getElementById("results");

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

var currentQuestion = 0;
var correctAnswers = 0;
var maxAnswers = 0;

loginBtn.addEventListener("click", function () {
    // set login to not active
    login.classList.toggle("active");
    login.nextElementSibling.classList.toggle("active-content");

    // set allPlaylists to active
    allPlaylists.classList.toggle("active");
    allPlaylists.nextElementSibling.classList.toggle("active-content");


    var playlist = { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png", name: "test", id: "balls" };
    // add playlists to playlistList
    for (var i = 0; i < 8; i++) {
        playlistList.innerHTML += helperPlaylistTemplate(playlist);
    }
});

generateQuizBtn.addEventListener("click", function () {
    if ((titleOpt.checked || artistOpt.checked || albumOpt.checked) && numQuestions.value >= 1 && numQuestions.value < 101) {
        numQuestions.value = String(Math.floor(Number(numQuestions.value)));
        console.log(numQuestions.value);
        maxAnswers = Number(numQuestions.value);

        // set options to not active
        options.classList.toggle("active");
        options.nextElementSibling.classList.toggle("active-content");

        intro.style.display = "none";
        playlistQuiz.style.display = "flex";
    } else {
        alert("Please select at least one option and enter a valid number of questions");
    }
});


function displayPlaylistOptions(id) {
    // set allPlaylists to not active
    allPlaylists.classList.toggle("active");
    allPlaylists.nextElementSibling.classList.toggle("active-content");

    // set options to active
    options.classList.toggle("active");
    options.nextElementSibling.classList.toggle("active-content");

    // set metadata to active
    var data = { title: "Test Title", description: "this is a test playlist", author: "bobert", totalTracks: "200", validTracks: "135" };
    metadata.innerHTML = helperOptionTemplate(data);
}


function helperPlaylistTemplate(playlist) {
    return `<li>
                <div class="list-element">
                    <div class="playlist-container" onclick="displayPlaylistOptions('${playlist.id}')">
                        <img src="${playlist.url}"
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