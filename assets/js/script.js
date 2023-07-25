var parent = document.querySelector("section#one>div.inner");
var isLeft = false;

var data = [
    {
        "img": "https://mrblacklicorice.github.io/images/sudoku.png",
        "heading": "SWEET SWEET SUDOKU",
        "content": "\n\t\t\t\t\t\tSudoku Solver is my first project developed without relying on third-party websites like\n\t\t\t\t\t\tCode.org. It provided valuable learning experiences in HTML5 and JS. Feel free to give it a try!\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/sudoku",
        "date": "May 1, 2020"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/pong.gif",
        "heading": "PONG BUT BETTER",
        "content": "\n\t\t\t\t\t\tFor my second project, I aimed to create a fully Object-Oriented game. I added powerups to\n\t\t\t\t\t\tenhance the classic gaming experience while maintaining an object-oriented approach.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/Pong",
        "date": "May 26, 2020"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/maze.png",
        "heading": "MAZES AND BACKTRACKING",
        "content": "\n\t\t\t\t\t\tThis project showcases a maze generation algorithm using Recursive Backtracking. Additionally,\n\t\t\t\t\t\tthere's an algorithm to solve the maze. Follow the prompts for instructions.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/Maze",
        "date": "Jun 28, 2020"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/terrain.jpg",
        "heading": "CRAZY NOISY BIZARRE WORLD",
        "content": "\n\t\t\t\t\t\tI created a demonstration using Perlin &amp; Simplex noise, exploring their applications in various\n\t\t\t\t\t\tareas like terrain generation for open-world games. It served as an introduction to their\n\t\t\t\t\t\tpotential uses.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/2d_terrarin_generation",
        "date": "Jul 20, 2020"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/mal.png",
        "heading": "MAL BOT FOR DISCORD",
        "content": "\n\n\t\t\t\t\t\tThis bot integrates the Anime and Manga database,\n\t\t\t\t\t\t<a href=\"https://myanimelist.net/\">MAL</a>, into\n\t\t\t\t\t\t<a href=\"https://discord.com/\">Discord</a>. Using the\n\t\t\t\t\t\t<a href=\"https://jikan.moe/\">Jikan(時間) API</a>, it retrieves data based on different parameters\n\t\t\t\t\t\tand IDs. Type \"m! help\" to get started.\n\t\t\t\t\t",
        "link": "https://discord.com/api/oauth2/authorize?client_id=753825107490897982&permissions=1610742848&scope=bot",
        "date": "Mar 11, 2021",
        "btn": "ADD IT TO DISCORD"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/mine_sweeper.png",
        "heading": "MINE SWEEPER",
        "content": "\n\t\t\t\t\t\tI recreated the classic game Minesweeper with a simplistic view. Future plans include adding an\n\t\t\t\t\t\tArtificial Intelligence component to learn and play Minesweeper. Working with the P5.js library\n\t\t\t\t\t\tmade the development process much smoother.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/mine-sweeper-generator",
        "date": "May 14, 2021"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/neuroevolution.jpeg",
        "heading": "AI FLAPPY BIRD",
        "content": "\n\t\t\t\t\t\tI created a Flappy Bird clone as a demonstration of the basics of neuroevolution. The game\n\t\t\t\t\t\tincorporates a neuroevolution algorithm powered by TensorFlow.js, utilizing\n\t\t\t\t\t\t<a href=\"https://thecodingtrain.com/\">The Coding Train's</a> neural network library.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/bird_game",
        "date": "Aug 5, 2021"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/tetris.png",
        "heading": "TETRIS WITH A TWIST",
        "content": "\n\t\t\t\t\t\tThis project is an enhanced version of Tetris with a unique twist. Inspired by an\n\t\t\t\t\t\tupperclassman's mention of its complexity, I embarked on the challenge to recreate Tetris\n\t\t\t\t\t\twithout external references. The addition of the twist mechanic adds excitement to the game.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/tetris",
        "date": "Jan 27, 2022"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/battleship.png",
        "heading": "BATTLESHIP WITH DATABASES",
        "content": "\n\t\t\t\t\t\tThis project is a recreation of the multiplayer game Battleship, initially aiming for Peer to\n\t\t\t\t\t\tPeer connections using PeerJs but transitioning to Firestore databases. Challenge a friend to a\n\t\t\t\t\t\tgame!\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/battleship",
        "date": "Dec 30, 2022"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/ascii_art_banner.jpg",
        "heading": "ASCII VIDEO",
        "content": "\n\t\t\t\t\t\tWith this project, you can turn the output of P5.js's capture function into live ASCII art. It\n\t\t\t\t\t\twas a fun experiment, exploring the possibility of converting videos into ASCII art within a\n\t\t\t\t\t\tlimited time frame of 40 minutes.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/ascii_video",
        "date": "Apr 11, 2023"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/spotifyQuizzer.gif",
        "heading": "SPOTIFY QUIZZER",
        "content": "\n\t\t\t\t\t\tThis project generates quizzes based on your saved Spotify playlists. Utilizing the Spotify API,\n\t\t\t\t\t\tit retrieves data about titles, artists, and albums to create engaging quizzes. Due to quizzers\n\t\t\t\t\t\tnot being allowed by the Spotify API, this project cannot be made public and will always stay in\n\t\t\t\t\t\tdevelopment mode. <b>Please send me your Spotify email and full name for access.</b>\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/spotify_quizzer",
        "date": "Jun 21, 2023"
    },
    {
        "img": "https://mrblacklicorice.github.io/images/gameOfLife.gif",
        "heading": "CONWAY'S GAME OF LIFE",
        "content": "\n\t\t\t\t\t\tExplore Conway's Game of Life with this project. This project taught me a lot about\n\t\t\t\t\t\ttransformations and scaling as I needed them to implement zooming and dragging. Developed using\n\t\t\t\t\t\tthe P5.js library, it provides an example board to get started.\n\t\t\t\t\t",
        "link": "https://mrblacklicorice.github.io/game_of_life",
        "date": "Jul 9, 2023"
    }
];

for (let i = 0; i < data.length; i++) {
    parent.innerHTML += articleTemplate(data[i]);
    isLeft = !isLeft;
}

function articleTemplate(data) {
    return `<article class="feature ${isLeft ? 'left' : 'right'}">
				<span class="image"><img src="${data.img}" alt="" /></span>
				<div class="content">
					<h2>${data.heading}</h2>
					<p>
                        ${data.content}
					</p>
					<div class="date-cont">
						<ul class="actions">
							<li>
								<a href="${data.link}" class="button alt">${data.btn == null ? "Try it out" : data.btn}</a>
							</li>
						</ul>
						<div class="date">
							${data.date}
						</div>
					</div>
				</div>
			</article>`;
}