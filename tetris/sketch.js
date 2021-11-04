var pixel = 30;

var offset = pixel / 5;

var cols = 10;

var rows = 24;

var tiles = [];

var curr_piece;

var curr_piece_hover;

var global_timer;

var movement_timer;

var x = Math.floor(Math.random() * 7) + 1;

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

	curr_piece = spawnTile(x, false);
	curr_piece_hover = spawnTile(x, true);

	global_timer = setInterval(shift_piece, 500, 0, 1);

	frameRate(100);
	// movement_timer = setInterval(movement, 100);
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
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center + 1, -1, pixel, tile, offset, 2), new Tile(center + 2, -1, pixel, tile, offset, 3)];
			break;
		case 2:
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center + 1, -1, pixel, tile, offset, 2), new Tile(center - 1, -2, pixel, tile, offset, 3)];
			break;
		case 3:
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center + 1, -1, pixel, tile, offset, 2), new Tile(center + 1, -2, pixel, tile, offset, 3)];
			break;
		case 4:
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center, -2, pixel, tile, offset, 2), new Tile(center + 1, -2, pixel, tile, offset, 3)];
			break;
		case 5:
			result = [new Tile(center + 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center, -2, pixel, tile, offset, 2), new Tile(center - 1, -2, pixel, tile, offset, 3)];
			break;
		case 6:
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center - 1, -2, pixel, tile, offset, 2), new Tile(center, -2, pixel, tile, offset, 3)];
			break;
		case 7:
			result = [new Tile(center - 1, -1, pixel, tile, offset, 0), new Tile(center, -1, pixel, tile, offset, 1), new Tile(center + 1, -1, pixel, tile, offset, 2), new Tile(center, -2, pixel, tile, offset, 3)];
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
				strokeWeight(2);
				stroke(colors[result[i].c]);
				rect(result[i].x_pos, result[i].y_pos, result[i].l, result[i].l);
			}

		}
	}
	return result;
}

function shift_piece(x_diff, y_diff) {

	if (check_piece(x_diff, y_diff)) {
		clearInterval(global_timer);
		for (let i = 0; i < curr_piece.length; i++) {
			tiles[curr_piece[i].y][curr_piece[i].x] = curr_piece[i];
		}
		for (let i = 0; i < curr_piece.length; i++) {
			checkLine(curr_piece[i].y, true);
		}
		x = Math.floor(Math.random() * 7) + 1;
		curr_piece = spawnTile(x, false);
		curr_piece_hover = spawnTile(x, true);

		global_timer = setInterval(shift_piece, 500, 0, 1);
		if (checkLine(0, false) && checkLine(1, false)) {
			clearInterval(global_timer);
			console.log("game over")
		}
		return true;
	} else {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].shift(x_diff, y_diff);
		}
	}
	return false;
}

function check_piece(x_diff, y_diff) {
	for (let i = 0; i < curr_piece_hover.length; i++) {
		curr_piece_hover[i].x = curr_piece[i].x;
		curr_piece_hover[i].y = curr_piece[i].y;
		curr_piece_hover[i].r = curr_piece[i].r;
		curr_piece_hover[i].shift(0, 0);
	}

	var hover_done = check_piece_hover(x_diff, y_diff);
	while (!hover_done) {
		hover_done = check_piece_hover(0, 1);
	}

	for (let i = 0; i < curr_piece.length; i++) {
		if (curr_piece[i].x == curr_piece_hover[i].x && curr_piece[i].y == curr_piece_hover[i].y) {
			return true;
		}
	}
	return false;
}

// ok, so, ur mim big gae
// make shift peice 2 functions
// make it check peice and shifting the piece based on the check


function check_piece_hover(x_diff, y_diff) {
	for (let i = 0; i < curr_piece_hover.length; i++) {
		if (curr_piece_hover[i].y + y_diff >= rows || ((curr_piece_hover[i].y > -1) && tiles[curr_piece_hover[i].y + y_diff][curr_piece_hover[i].x + x_diff].c != 0)) {
			return true;
		}
	}

	for (let i = 0; i < curr_piece_hover.length; i++) {
		curr_piece_hover[i].shift(x_diff, y_diff);
	}

	return false;
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



// see key held instead of key pressed --- kinda done??
// create new tiles --- done!!
// create rotation --- done!!


function keyTyped() {
	if (key == " ") {
		var down = false;

		while (!down) {
			down = shift_piece(0, 1)
		}
	}
}


const p = {
	lowest_x: 10000,
	highest_x: -1,
	highest_y: -1,

	generic_calc(array) {
		p.lowest_x = 1000;
		p.highest_x = -1;
		p.highest_y = -1;

		for (let i = 0; i < array.length; i++) {
			if (array[i].y > p.highest_y) {
				p.highest_y = array[i].y;
			}
			if (array[i].x > p.highest_x) {
				p.highest_x = array[i].x;
			}
			if (array[i].x < p.lowest_x) {
				p.lowest_x = array[i].x;
			}
		}
	},
	moveLeft() {
		p.generic_calc(curr_piece);
		var moveable = (p.lowest_x > 0);
		for (let i = 0; i < curr_piece.length && moveable; i++) {
			if (curr_piece[i].y > -1) moveable = (tiles[curr_piece[i].y][curr_piece[i].x - 1].c == 0);
		}
		if (moveable) {
			shift_piece(-1, 0);
		}

	},
	rotate() {
		// clearInterval(global_timer);
		curr_piece.forEach((ele) => { ele.rotate(); })
		curr_piece_hover.forEach((ele) => { ele.rotate(); })
		p.generic_calc(curr_piece);

		var good = !(p.lowest_x > -1 && p.highest_x < cols);
		console.log(good);
		console.log(p.lowest_x, p.highest_x);
		for (let i = 0; i < curr_piece.length && !good; i++) {
			if (curr_piece[i].y >= rows || ((curr_piece[i].y > -1) && tiles[curr_piece[i].y][curr_piece[i].x].c != 0)) {
				good = true;
			}
		}
		// console.log(good);

		if (good) {
			curr_piece.forEach((ele) => { ele.inv_rotate(); })
			curr_piece_hover.forEach((ele) => { ele.inv_rotate(); })
		}
		shift_piece(0, 0);
		// global_timer = setInterval(shift_piece, 500, 0, 1);
	},
	moveRight() {
		p.generic_calc(curr_piece);
		var moveable = (p.highest_x < cols - 1);
		for (let i = 0; i < curr_piece.length && moveable; i++) {
			if (curr_piece[i].y > -1) moveable = (tiles[curr_piece[i].y][curr_piece[i].x + 1].c == 0);
		}
		if (moveable) {
			shift_piece(1, 0);
		}
	},
	moveDown() {
		p.generic_calc(curr_piece);
		if (p.highest_y < rows - 1) shift_piece(0, 1);
	},
};

document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
	const k = event.keyCode;

	if (k < 37 || k > 40) return;

	event.preventDefault();
	if (k == 37 || k == 39) dropStart = Date.now();

	return {
		37: p.moveLeft,
		38: p.rotate,
		39: p.moveRight,
		40: p.moveDown
	}[k]();
}