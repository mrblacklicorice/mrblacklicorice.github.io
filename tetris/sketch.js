var pixel = 15;

var offset = pixel / 5;

var cols = 20;

var rows = 40;

var tiles = [];

var curr_piece;

var global_timer;

function setup() {
	var canvas = createCanvas(pixel * cols + (offset * 2), pixel * rows + (offset * 2) + (offset * 10));

	canvas.center("horizontal");
	document.body.style.background = '#222222';

	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	for (let i = 0; i < rows; i++) {
		tiles[i] = [];
		for (let j = 0; j < cols; j++) {
			tiles[i][j] = new Tile(j, i, pixel, 0, offset);
		}
	}

	curr_piece = spawnTile(1);
	global_timer = setInterval(tilePerTick, 500);
}



function draw() {
	clear();


	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			tiles[i][j].show();
		}
	}

	for (let i = 0; i < curr_piece.length; i++) {
		curr_piece[i].show();
	}
}

function spawnTile(tile) {
	// [none, I, J, L, S, Z, O, T]
	// [  0 , 1, 2, 3, 4, 5, 6, 7]
	center = (cols / 2) - 1;
	var result;

	switch (tile) {
		case 1:
			result = [new Tile(center - 1, -1, pixel, tile, offset), new Tile(center, -1, pixel, tile, offset), new Tile(center + 1, -1, pixel, tile, offset), new Tile(center + 2, -1, pixel, tile, offset)];
			break;

		default:
			break;
	}
	return result;
}

function tilePerTick() {
	for (let i = 0; i < curr_piece.length; i++) {
		if (curr_piece[i].y == rows - 1 || tiles[curr_piece.y][curr_piece.x].c != 0) {
			clearInterval(global_timer);
			for (let i = 0; i < curr_piece.length; i++) {
				tiles[curr_piece[i].y][curr_piece[i].x] = curr_piece[i];
			}

			curr_piece = spawnTile(1);
			global_timer = setInterval(tilePerTick, 500);

			break;
		}
		curr_piece[i].shift(0, 1);
	}

}

function keyPressed() {
	var lowest_x = 1000;
	var highest_x = -1;
	var highest_y = -1;

	for (let i = 0; i < curr_piece.length; i++) {
		if (curr_piece[i].y > highest_y) {
			highest_y = curr_piece[i].y;
		}
		if (curr_piece[i].x > highest_x) {
			highest_x = curr_piece[i].x;
		}
		if (curr_piece[i].x < lowest_x) {
			lowest_x = curr_piece[i].x;
		}
	}

	if (keyCode == LEFT_ARROW && lowest_x > 0) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(-1, 0);
		}
	} else if (keyCode === RIGHT_ARROW && highest_x < cols - 1) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(1, 0);
		}
	} else if (keyCode === DOWN_ARROW && highest_y < rows - 1) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(0, 1);
		}
		clearInterval(global_timer);
		global_timer = setInterval(tilePerTick, 500);
	}

}

function keyTyped() {
	var lowest_x = 1000;
	var highest_x = -1;
	var highest_y = -1;

	for (let i = 0; i < curr_piece.length; i++) {
		if (curr_piece[i].y > highest_y) {
			highest_y = curr_piece[i].y;
		}
		if (curr_piece[i].x > highest_x) {
			highest_x = curr_piece[i].x;
		}
		if (curr_piece[i].x < lowest_x) {
			lowest_x = curr_piece[i].x;
		}
	}

	if (key == "a" && lowest_x > 0) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(-1, 0);
		}
	} else if (key == "d" && highest_x < cols - 1) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(1, 0);
		}
	} else if (key == "s" && highest_y < rows - 1) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(0, 1);
		}
		clearInterval(global_timer);
		global_timer = setInterval(tilePerTick, 500);

	}
}