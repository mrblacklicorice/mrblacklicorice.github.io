var pixel = 15;

var offset = pixel / 5;

var cols = 20;

var rows = 40;

var tiles = [];

var curr_piece;

var curr_piece_hover;

var global_timer;

var movement_timer;

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

	curr_piece = spawnTile(1, false);
	curr_piece_hover = spawnTile(1, true);

	global_timer = setInterval(shift_piece, 500, 0, 1);

	movement_timer = setInterval(movement, 100);
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
		curr_piece_hover[i].show();
	}

}

function spawnTile(tile, hover) {
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
	if (hover) {
		for (let i = 0; i < result.length; i++) {
			result[i].show = () => {
				var colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];
				noFill();

				// noStroke();
				strokeWeight(1);
				stroke(colors[result[i].c]);
				rect(result[i].x_pos, result[i].y_pos, result[i].l, result[i].l);
			}

		}
	}
	return result;
}

function shift_piece(x_diff, y_diff) {
	// var statement = false;

	for (let i = 0; i < curr_piece_hover.length; i++) {
		curr_piece_hover[i].x = curr_piece[i].x;
		curr_piece_hover[i].y = curr_piece[i].y;
		curr_piece_hover[i].shift(0, 0);
	}

	// for (let i = 0; i < curr_piece.length; i++) {
	// 	// if (curr_piece[i].y == rows - 1 || (curr_piece[i].y > -1 && tiles[curr_piece[i].y + y_diff][curr_piece[i].x + x_diff].c != 0)) {


	// 	// }
	// }


	var hover_done = shift_piece_hover(x_diff, y_diff);
	while (!hover_done) {
		hover_done = shift_piece_hover(0, 1);
	}

	for (let i = 0; i < curr_piece.length; i++) {
		if (curr_piece[i].x == curr_piece_hover[i].x && curr_piece[i].y == curr_piece_hover[i].y) {
			clearInterval(global_timer);
			for (let i = 0; i < curr_piece.length; i++) {
				tiles[curr_piece[i].y][curr_piece[i].x] = curr_piece[i];
				checkLine(curr_piece[i].y, true);
			}

			curr_piece = spawnTile(1, false);
			curr_piece_hover = spawnTile(1, true);

			global_timer = setInterval(shift_piece, 500, 0, 1);
			if (checkLine(0, false) && checkLine(1, false)) {

			}
			return true;
		}
	}

	for (let i = 0; i < curr_piece.length; i++) {
		curr_piece[i].shift(x_diff, y_diff);
	}

	return false;
}

function shift_piece_hover(x_diff, y_diff) {
	for (let i = 0; i < curr_piece_hover.length; i++) {
		if (curr_piece_hover[i].y + y_diff >= rows || (curr_piece_hover[i].y > -1 && tiles[curr_piece_hover[i].y + y_diff][curr_piece_hover[i].x + x_diff].c != 0)) {
			// clearInterval(global_timer);
			// for (let i = 0; i < curr_piece_hover.length; i++) {
			// 	tiles[curr_piece_hover[i].y][curr_piece_hover[i].x] = curr_piece_hover[i];
			// }

			// global_timer = setInterval(shift_piece, 500, 0, 1);
			return true;
		}
	}

	for (let i = 0; i < curr_piece_hover.length; i++) {
		curr_piece_hover[i].shift(x_diff, y_diff);
	}

	return false;
}



// function keyPressed() {
// 	var lowest_x = 1000;
// 	var highest_x = -1;
// 	var highest_y = -1;

// 	for (let i = 0; i < curr_piece.length; i++) {
// 		if (curr_piece[i].y > highest_y) {
// 			highest_y = curr_piece[i].y;
// 		}
// 		if (curr_piece[i].x > highest_x) {
// 			highest_x = curr_piece[i].x;
// 		}
// 		if (curr_piece[i].x < lowest_x) {
// 			lowest_x = curr_piece[i].x;
// 		}
// 	}

// 	if (keyCode == LEFT_ARROW && lowest_x > 0) {
// 		shift_piece(-1, 0)
// 		// curr_piece[i].shift(-1, 0);
// 	} else if (keyCode === RIGHT_ARROW && highest_x < cols - 1) {
// 		shift_piece(1, 0)
// 		// curr_piece[i].shift(1, 0);
// 	} else if (keyCode === DOWN_ARROW && highest_y < rows - 1) {
// 		shift_piece(0, 1)
// 		// curr_piece[i].shift(0, 1);
// 		clearInterval(global_timer);
// 		global_timer = setInterval(shift_piece, 500, 0, 1);
// 	}

// }

function movement() {
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

	if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && lowest_x > 0) {
		shift_piece(-1, 0)
		// curr_piece[i].shift(-1, 0);
	} else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && highest_x < cols - 1) {
		shift_piece(1, 0)
		// curr_piece[i].shift(1, 0);
	} else if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && highest_y < rows - 1) {
		shift_piece(0, 1)
		// curr_piece[i].shift(0, 1);
		clearInterval(global_timer);
		global_timer = setInterval(shift_piece, 500, 0, 1);

	}
}

function checkLine(y, IsZero) {
	for (let i = 0; i < tiles[y].length; i++) {
		if ((IsZero) ? (tiles[y][i].c == 0) : (tiles[y][i].c != 0)) {
			return false;
		}
	}

	if (IsZero) {
		tiles.splice(y, 1);
		tiles.unshift(new Array(tiles[0].length))

		for (let i = 0; i < tiles[0].length; i++) {
			tiles[0][i] = new Tile(i, 0, pixel, 0, offset);

		}

		for (let i = y; i > 0; i--) {
			for (let j = 0; j < tiles[i].length; j++) {
				tiles[i][j].shift(0, 1);

			}
		}
	}
}


// see key held instead of key pressed
// create new tiles
// create rotation


function keyTyped() {
	if (key == " ") {
		var down = false;

		while (!down) {
			down = shift_piece(0, 1)
		}
	}
}