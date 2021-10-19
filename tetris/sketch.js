var pixel = 15;

var offset = pixel / 5;

var cols = 20;

var rows = 40;

var tiles = [];

function setup() {
	var canvas = createCanvas(pixel * cols + (offset * 2), pixel * rows + (offset * 2) + (offset * 10));

	canvas.center("horizontal");
	document.body.style.background = '#222222';

	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	for (let i = 0; i < rows; i++) {
		tiles[i] = [];
		for (let j = 0; j < cols; j++) {
			tiles[i][j] = new Tile(j, i, pixel, 0, 0);
		}

	}
}



function draw() {
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			tiles[i][j].show();
		}
	}
}

