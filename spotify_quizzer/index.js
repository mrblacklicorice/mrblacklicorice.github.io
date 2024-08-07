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
    mainPlaceholder.innerHTML = errorTemplate({
        status: error.response.status,
        message: error.error.error_description,
    });
}

async function addThrowErrorToFetch(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw { response, error: await response.json() };
    }
}

function logout() {
    localStorage.clear();
    // window.location.reload();
    window.location.href = redirect_uri;
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

    oauthPlaceholder.innerHTML = oAuthTemplate({
        access_token,
        refresh_token,
        expires_at,
    });

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
        document.getElementById('login').style.display = 'none';
        document.getElementById('loggedin').style.display = 'unset';
        mainPlaceholder.innerHTML = userProfileTemplate(data);

        getUserPlaylistData();
    }).catch((error) => {
        if (error.error.status === 401) {
            refreshToken();
        } else {
            console.error(error);
            mainPlaceholder.innerHTML = errorTemplate(error.error);
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
        document.getElementById('playlistsContainer').style.display = 'unset';
        allPlaylistsPlaceholder.innerHTML = userAllPlaylistsTemplate(data);
    }).catch((error) => {
        console.error(error);
        allPlaylistsPlaceholder.innerHTML = errorTemplate(error.error);
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
            tempPlaylists = userPlaylistTemplate(data);
        }

        for (let i = 0; i < data.tracks.items.length; i++) {
            tempPlaylists += userPlaylistItem(data.tracks.items[i]);
        }

        if (data.tracks.next) {
            setTimeout(() => {
                getPlaylistData(playlistID, data.tracks.next);
            }, 100);
        } else {
            tempPlaylists += "</table>";
            // console.log(tempPlaylists);
            playlistPlaceholder.innerHTML = tempPlaylists;
        }
    }).catch((error) => {
        console.error(error);
        playlistPlaceholder.innerHTML = errorTemplate(error.error);
    });
}

function userProfileTemplate(data) {
    return `<h1>Logged in as ${data.display_name}</h1>
      <table>
          <tr><td>Display name</td><td>${data.display_name}</td></tr>
          <tr><td>Id</td><td>${data.id}</td></tr>
          <tr><td>Email</td><td>${data.email}</td></tr>
          <tr><td>Spotify URI</td><td><a href="${data.external_urls.spotify}">${data.external_urls.spotify}</a></td></tr>
          <tr><td>Link</td><td><a href="{{href}">${data.href}</a></td></tr>
          <tr><td>Profile Image</td><td><a href="${data.images[0].url}">${data.images[0].url}</a></td></tr>
          <tr><td>Country</td><td>${data.country}</td></tr>
      </table>`;
}

// https://open.spotify.com/playlist/4vHvIsQ4sxeRJyggYx3frl

function userAllPlaylistsTemplate(data) {
    console.log(data);

    var string = "";

    for (var i = 0; i < data.items.length; i++) {
        string += `<button onclick="getPlaylistData('${data.items[i].id}')">${data.items[i].name}</button>\n`;
    }

    return string;
}

function userPlaylistTemplate(data) {
    return `<h2>${data.name}</h2>
                <p>${data.description}</p>
                <p>Author: ${data.owner.display_name}</p>
                <p>Tracks: ${data.tracks.total}</p>
                <table>`;
}

function userPlaylistItem(item) {
    const defImg = 'https://play-lh.googleusercontent.com/eN0IexSzxpUDMfFtm-OyM-nNs44Y74Q3k51bxAMhTvrTnuA4OGnTi_fodN4cl-XxDQc';
    if (item.track && item.track.name != null) {
        return `<tr>
                <td><img src="${(item.track.album.images != 0) ? item.track.album.images[0].url : defImg}" width="100px"></td>
                <td>${item.track.name}</td>
                <td>${item.track.artists[0].name}</td>
                <td>${item.track.album.name}</td>
                ${item.track.preview_url ? `<td><audio controls><source src="${item.track.preview_url}" type="audio/mpeg"></audio></td>` : `<td>No Song Found</td>`}
                </tr>`;
    }
    return `<tr> <td colspan="5">Empty track</td> </tr>`;
}

function oAuthTemplate(data) {
    return `<h2>oAuth info</h2>
        <table>
            <tr>
                <td>Access token</td>
                <td>${data.access_token}</td>
            </tr>
            <tr>
                <td>Refresh token</td>
                <td>${data.refresh_token}</td>
            </tr>
            <tr>
                <td>Expires at</td>
                <td>${new Date(parseInt(data.expires_at, 10)).toLocaleString()}</td>
            </tr>
        </table>`;
}

function errorTemplate(data) {
    return `<h2> Error info</h2>
        <table>
            <tr>
                <td>Status</td>
                <td>${data.status}</td>
            </tr>
            <tr>
                <td>Message</td>
                <td>${data.message}</td>
            </tr>
        </table>`;
}

// Your client id from your app in the spotify dashboard:
// https://developer.spotify.com/dashboard/applications
const client_id = '3fd2f3455a9d44c892ff4547a8b354c8';
const redirect_uri = 'https://mrblacklicorice.github.io/spotify_quizzer/'; // Your redirect uri

// Restore tokens from localStorage
let access_token = localStorage.getItem('access_token') || null;
let refresh_token = localStorage.getItem('refresh_token') || null;
let expires_at = localStorage.getItem('expires_at') || null;

// References for HTML rendering
const mainPlaceholder = document.getElementById('main');
const allPlaylistsPlaceholder = document.getElementById('playlistsContainer');
const oauthPlaceholder = document.getElementById('oauth');
const playlistPlaceholder = document.getElementById('playlist');

//playlistsPlaceholder temp
var tempPlaylists = "";

// If the user has accepted the authorize request spotify will come back to your application with the code in the response query string
// Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

if (code) {
    // we have received the code from spotify and will exchange it for a access_token
    exchangeToken(code);
} else if (access_token && refresh_token && expires_at) {
    // we are already authorized and reload our tokens from localStorage
    document.getElementById('loggedin').style.display = 'unset';

    oauthPlaceholder.innerHTML = oAuthTemplate({
        access_token,
        refresh_token,
        expires_at,
    });

    getUserData();
} else {
    // we are not logged in so show the login button
    document.getElementById('login').style.display = 'unset';
}

document
    .getElementById('login-button')
    .addEventListener('click', redirectToSpotifyAuthorizeEndpoint, false);

document
    .getElementById('refresh-button')
    .addEventListener('click', refreshToken, false);

document
    .getElementById('logout-button')
    .addEventListener('click', logout, false);


