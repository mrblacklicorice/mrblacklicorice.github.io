const queryString = window.location.search;
const URLparams = new URLSearchParams(queryString);


var pixel = 45;

var offset = pixel / 5;

let side_bar = pixel / 4;

var rows = 10;

var cols = 10;

var tiles = [];

var ships = [true, true, true, true, true];
var shipLengths = [5, 4, 3, 3, 2];
var shipOrientation = [1, 1, 1, 1, 0]; // 0 horizontal, 1 vertical
var shipsIndicies = [[-1, -1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, -1]];
var currentShip = -1;

var gamemode = -1;
// -2 connect with player, -1 place ships, 0 shoot, 1 game over

// var url = "https://mrblacklicorice.github.io/mine-sweeper/?" + Object.keys(settings).map(key => `${key}=${settings[key]}`).join('&');

// console.log(url);

function setup() {
    canvas = createCanvas(pixel * cols + (offset * 2) + (side_bar * offset * 1.5), pixel * rows + (offset * 2) + (offset * 10));


    canvas.center("horizontal");
    document.body.style.background = '#222222';

    document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

    for (let i = 0; i < rows; i++) {
        tiles[i] = [];
        for (let j = 0; j < cols; j++) {
            tiles[i][j] = new Tile(i, j, pixel);
        }
    }
}

function draw() {
    clear();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tiles[i][j].show();
            tiles[i][j].showShips();
        }
    }

    drawShips();


    // fill('white');
    // rect(pixel * cols + (offset * 2), 0, (side_bar * offset * 1.5), pixel * rows);

    if (gamemode == -1) {
        if (currentShip != -1) {
            fill("#316879");
            stroke("#000000");
            strokeWeight(2);

            for (let i = 0; i < shipLengths[currentShip]; i++) {
                if (shipOrientation[currentShip] == 0) {
                    // CENTER ON THE MOUSE
                    rect(mouseX + (pixel * i * 0.85) - (pixel * shipLengths[currentShip] / 2 * 0.85), mouseY - (pixel * 0.85 / 2), pixel * 0.85, pixel * 0.85);
                } else {
                    rect(mouseX - (pixel * 0.85 / 2), mouseY + (pixel * i * 0.85) - (pixel * shipLengths[currentShip] / 2 * 0.85), pixel * 0.85, pixel * 0.85);
                }
            }
        }


    } else if (gamemode == 0) {
        var index = hoverGrid(mouseX, mouseY);

        if (index != -1) {
            stroke('#222222');
            strokeWeight(2);
            noFill();
            rect(pixel * (index % cols), pixel * Math.floor(index / rows), pixel, pixel);
        }
    }


    // text
    {
        textAlign(LEFT, CENTER);
        fill('#ffe9e3');
        noStroke();

        textSize((cols * rows * pixel * pixel) * 0.0001);
        text(`Flags: ${21}`, offset, pixel * rows + (offset * 3));

        text(`Seed: ${21}`, offset, pixel * rows + (offset * 6));

        textAlign(RIGHT, CENTER);
        // text(`Time: ${((grid.start == 0) ? timer_parser(0) : timer_parser(Date.now() - grid.start))}`, pixel * cols + (offset * 1), pixel * rows + (offset * 3));
    }

    // console.log(hoverShips(mouseX, mouseY));
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

function hoverGrid(mouse_X, mouse_Y) {
    if (mouse_X > 0 && mouse_X < pixel * cols && mouse_Y > 0 && mouse_Y < pixel * rows) {
        xindex = Math.floor(mouse_X / pixel);
        yindex = Math.floor(mouse_Y / pixel);

        return xindex + yindex * cols;
    }
    return -1;
}

function hoverShips(mouse_X, mouse_Y) {
    // return index of the ship the mouse is hovering over
    if (mouse_X > pixel * cols + (offset * 2) && mouse_X < pixel * cols + (offset * 2) + (side_bar * offset * 0.75) && mouse_Y > 0 && mouse_Y < pixel * 5)
        return 0;
    else if (mouse_X > pixel * cols + (offset * 2) + (side_bar * offset * 0.75) && mouse_X < pixel * cols + (offset * 2) + (side_bar * offset * 1.5) && mouse_Y > 0 && mouse_Y < pixel * 5)
        return 1;
    else if (mouse_X > pixel * cols + (offset * 2) && mouse_X < pixel * cols + (offset * 2) + (side_bar * offset * 0.75) && mouse_Y > pixel * 5 && mouse_Y < pixel * 8.5)
        return 2;
    else if (mouse_X > pixel * cols + (offset * 2) + (side_bar * offset * 0.75) && mouse_X < pixel * cols + (offset * 2) + (side_bar * offset * 1.5) && mouse_Y > pixel * 5 && mouse_Y < pixel * 8.5)
        return 3;
    else if (mouse_X > pixel * cols + (offset * 2) && mouse_X < pixel * cols + (offset * 2) + (side_bar * offset * 0.75) && mouse_Y > pixel * 8.5 && mouse_Y < pixel * 10)
        return 4;
    else
        return -1;
}

function mousePressed() {
    if (mouseButton == "left") {
        if (gamemode == -1) {
            var index = hoverShips(mouseX, mouseY);
            console.log(index, currentShip);
            if (currentShip == -1) {
                if (index != -1 && ships[index]) {
                    currentShip = index;
                    ships[index] = false;
                }
            } else {
                var gi = hoverGrid(mouseX, mouseY);
                if (gi != -1 && checkShips(gi, currentShip)) {
                    updateShips(gi, currentShip);
                    currentShip = -1;
                }
            }
        } else if (gamemode == 0) {
            if (index != -1) {
                tiles[index % cols][Math.floor(index / rows)].click();
            }
        }
    } else if (mouseButton == "right") {
        if (gamemode == -1) {
            if (currentShip != -1) {
                shipOrientation[currentShip] = (shipOrientation[currentShip] + 1) % 2;
            }
        }
    }
}

function checkShips(coord, ship) {
    if (shipOrientation[ship] == 0) {
        if (shipLengths[ship] + (coord % cols) <= cols) {
            for (let i = 0; i < shipLengths[ship]; i++) {
                if (tiles[coord % cols + i][Math.floor(coord / rows)].ship != -1) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    } else {
    }
}

function updateShips(coord, ship) {
    if (shipOrientation[ship] == 0) {
        for (let i = 0; i < shipLengths[ship]; i++) {
            tiles[coord % cols + i][Math.floor(coord / rows)].s = ship;
        }
    } else {
    }
}


function drawShips() {
    strokeWeight(2);

    // 5
    fill("#FFFFFF");
    stroke('#316879');
    rect(pixel * cols + (offset * 2), 0, (side_bar * offset * 0.75), pixel * 5);

    if (ships[0]) {
        fill("#316879");
        stroke("#000000");

        for (let i = 0; i < shipLengths[0]; i++) {
            rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.375) - (pixel * 0.8 / 2), ((pixel * 5) - ((pixel * 0.8 * 5))) / 2 + (pixel * 0.8 * i), pixel * 0.8, pixel * 0.8);
        }
    }

    // 4
    fill("#FFFFFF");
    stroke('#316879');
    rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.75), 0, (side_bar * offset * 0.75), pixel * 5);

    if (ships[1]) {
        fill("#316879");
        stroke("#000000");

        for (let i = 0; i < shipLengths[1]; i++) {
            rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.375) - (pixel * 0.8 / 2) + (side_bar * offset * 0.75), ((pixel * 5) - ((pixel * 0.8 * 4))) / 2 + (pixel * 0.8 * i), pixel * 0.8, pixel * 0.8);
        }
    }

    // 3
    fill("#FFFFFF");
    stroke('#316879');
    rect(pixel * cols + (offset * 2), pixel * 5, (side_bar * offset * 0.75), pixel * 3.5);

    if (ships[2]) {
        fill("#316879");
        stroke("#000000");

        for (let i = 0; i < shipLengths[2]; i++) {
            rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.375) - (pixel * 0.8 / 2), ((pixel * 3.5) - ((pixel * 0.8 * 3))) / 2 + (pixel * 0.8 * i) + (pixel * 5), pixel * 0.8, pixel * 0.8);
        }
    }

    // 3
    fill("#FFFFFF");
    stroke('#316879');
    rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.75), pixel * 5, (side_bar * offset * 0.75), pixel * 3.5);

    if (ships[3]) {
        fill("#316879");
        stroke("#000000");

        for (let i = 0; i < shipLengths[3]; i++) {
            rect(pixel * cols + (offset * 2) + (side_bar * offset * 0.375) - (pixel * 0.8 / 2) + (side_bar * offset * 0.75), ((pixel * 3.5) - ((pixel * 0.8 * 3))) / 2 + (pixel * 0.8 * i) + (pixel * 5), pixel * 0.8, pixel * 0.8);
        }
    }

    // 2
    fill("#FFFFFF");
    stroke('#316879');
    rect(pixel * cols + (offset * 2), pixel * 8.5, (side_bar * offset * 1.5), pixel * 1.5);

    if (ships[4]) {
        fill("#316879");
        stroke("#000000");
        // center horizontally

        for (let i = 0; i < shipLengths[4]; i++) {
            rect(pixel * cols + (offset * 2) + ((side_bar * offset * 1.5) - (pixel * 2 * 0.8)) / 2 + (pixel * 0.8 * i), pixel * 8.5 + ((pixel * 1.5 - pixel * 0.8) / 2), pixel * 0.8, pixel * 0.8);
        }
    }
}