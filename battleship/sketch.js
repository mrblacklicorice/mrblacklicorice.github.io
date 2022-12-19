const queryString = window.location.search;
const URLparams = new URLSearchParams(queryString);


var pixel = 45;

var offset = pixel / 5;

let side_bar = pixel;

var rows = 10;

var cols = 10;

var tiles = [];

// var url = "https://mrblacklicorice.github.io/mine-sweeper/?" + Object.keys(settings).map(key => `${key}=${settings[key]}`).join('&');

// console.log(url);

function setup() {
    canvas = createCanvas(pixel * cols + (offset * 2) + (side_bar * offset * 2), pixel * rows + (offset * 2) + (offset * 10));


    canvas.center("horizontal");
    document.body.style.background = '#222222';

    document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

    for (let i = 0; i < rows; i++) {
        tiles[i] = [];
        for (let j = 0; j < cols; j++) {
            tiles[i][j] = new Tile(i, j, 0, pixel, offset, side_bar);
        }
    }
}

function draw() {
    clear();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tiles[i][j].show();
        }
    }

    textAlign(LEFT, CENTER);
    fill('#ffe9e3');
    noStroke();

    textSize((cols * rows * pixel * pixel) * 0.0001);
    text(`Flags: ${21}`, offset, pixel * rows + (offset * 3));

    text(`Seed: ${21}`, offset, pixel * rows + (offset * 6));

    textAlign(RIGHT, CENTER);
    // text(`Time: ${((grid.start == 0) ? timer_parser(0) : timer_parser(Date.now() - grid.start))}`, pixel * cols + (offset * 1), pixel * rows + (offset * 3));

}

function makeid(length) {
    var result = [];
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

