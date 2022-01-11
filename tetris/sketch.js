var pixel = 30;

var side_bar = pixel;

var offset = pixel / 5;

var cols = 10;

var rows = 24;

var tiles = [];

var curr_piece;

var curr_piece_hover;

var global_timer;

var movement_timer;

var piece_queue = [Math.floor(Math.random() * 7) + 1, Math.floor(Math.random() * 7) + 1, Math.floor(Math.random() * 7) + 1, Math.floor(Math.random() * 7) + 1];

var canvas;

var hold = [new Tile(0, 0, 0, 0, offset)];

var colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];

var show_tiles = [spawnTile(piece_queue, false, piece_queue[0]), spawnTile(piece_queue, false, piece_queue[1]), spawnTile(piece_queue, false, piece_queue[2]), spawnTile(piece_queue, false, piece_queue[3])];

var held = false;

var lines = 0;

var timer = 0;
var pressed = 0;

function setup() {
	canvas = createCanvas(pixel * cols + (offset * 2) + (side_bar * offset * 2), pixel * rows + (offset * 2) + (offset * 10));

	canvas.center("horizontal");
	document.body.style.background = '#222222';

	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	for (let i = 0; i < rows; i++) {
		tiles[i] = [];
		for (let j = 0; j < cols; j++) {
			tiles[i][j] = new Tile(j, i, pixel, 0, offset);
		}
	}

	curr_piece = spawnTile(piece_queue, false);
	curr_piece_hover = spawnTile(piece_queue, true);

	show_tiles_changing(1);
	show_tiles_changing(2);
	show_tiles_changing(3);

	hold_piece_showing();

	global_timer = setInterval(shift_piece, 500, 0, 1);

	frameRate(100);
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

	stroke(colors[hold[0].c]);
	rect(offset * 0.1 * side_bar, offset * 10, pixel * 5, pixel * 5);
	for (let i = 0; i < hold.length; i++) {
		hold[i].show();

	}
	// this is for hold

	for (let i = 0; i < 3; i++) {
		noFill();
		stroke(colors[piece_queue[i + 1]]);
		rect(canvas.width - (side_bar * offset * 0.9), (offset * (i + 1)) + (pixel * (i * 5)), pixel * 5, pixel * 5);

		for (let j = 0; j < show_tiles[i + 1].length; j++) {
			show_tiles[i + 1][j].show();
		}
	}
	// this is for peices in order
	if (timer % 6 == 0 && pressed == 0) {
		if (keyIsDown(40)) {
			p.moveDown();
		} else if (keyIsDown(37)) {
			p.moveLeft();
		} else if (keyIsDown(39)) {
			p.moveRight();
		}
	}

	if (pressed > 0) {
		pressed--;
	}

	timer++;
}

function spawnTile(tile_array, hover, i) {
	// [none, I, J, L, S, Z, O, T]
	// [  0 , 1, 2, 3, 4, 5, 6, 7]
	var center = ((cols / 2)) - 1;
	var result;
	var tile = (i == undefined) ? tile_array[0] : i;

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
			result = [new Tile(center, -1, pixel, tile, offset, 0), new Tile(center + 1, -1, pixel, tile, offset, 1), new Tile(center, -2, pixel, tile, offset, 2), new Tile(center + 1, -2, pixel, tile, offset, 3)];
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
			if (curr_piece[i].y < 0) {
				console.log("game over");
				clearInterval(global_timer);
				noLoop();
				return;
			}
			tiles[curr_piece[i].y][curr_piece[i].x] = curr_piece[i];
		}
		for (let i = 0; i < curr_piece.length; i++) {
			if (!checkLine(curr_piece[i].y, true)) {
				lines++;
			}
		}

		if (lines > 0 && (lines % 3 == 0)) {
			flip_tiles();
		}

		piece_queue.shift();
		piece_queue.push(Math.floor(Math.random() * 7) + 1);

		show_tiles.shift();
		show_tiles.push(spawnTile(piece_queue, false, piece_queue[3]))

		show_tiles_changing(1);
		show_tiles_changing(2);
		show_tiles_changing(3);

		held = false;

		curr_piece = spawnTile(piece_queue, false);
		curr_piece_hover = spawnTile(piece_queue, true);

		global_timer = setInterval(shift_piece, 500, 0, 1);
		if (checkLine(0, false)) {
			console.log("game over");
			clearInterval(global_timer);
			noLoop();
			return;
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


function show_tiles_changing(i) {
	var lowest_x = 1000;
	var highest_x = -1000;
	var lowest_y = 1000;
	var highest_y = -1000;

	for (let j = 0; j < show_tiles[i].length; j++) {
		if (lowest_x > show_tiles[i][j].x) lowest_x = show_tiles[i][j].x;
		if (highest_x < show_tiles[i][j].x) highest_x = show_tiles[i][j].x;
		if (lowest_y > show_tiles[i][j].y) lowest_y = show_tiles[i][j].y;
		if (highest_y < show_tiles[i][j].y) highest_y = show_tiles[i][j].y;
	}

	var width = (highest_x - lowest_x + 1) * pixel;
	var height = (highest_y - lowest_y + 1) * pixel;
	var cor_x = ((canvas.width - (side_bar * offset * 0.9)) + (pixel * (5 / 2)) - width / 2);
	var cor_y = (offset * (i)) + (pixel * ((i - 1) * 5)) + (pixel * (5 / 2)) - height / 2;

	for (let j = 0; j < show_tiles[i].length; j++) {
		show_tiles[i][j].x_pos = (highest_x - show_tiles[i][j].x) * pixel + cor_x;
		show_tiles[i][j].y_pos = (highest_y - show_tiles[i][j].y) * pixel + cor_y;
	}
}

function hold_piece_showing() {
	var lowest_x = 1000;
	var highest_x = -1000;
	var lowest_y = 1000;
	var highest_y = -1000;

	for (let j = 0; j < hold.length; j++) {
		if (lowest_x > hold[j].x) lowest_x = hold[j].x;
		if (highest_x < hold[j].x) highest_x = hold[j].x;
		if (lowest_y > hold[j].y) lowest_y = hold[j].y;
		if (highest_y < hold[j].y) highest_y = hold[j].y;
	}

	var width = (highest_x - lowest_x + 1) * pixel;
	var height = (highest_y - lowest_y + 1) * pixel;
	var cor_x = (offset * 0.1 * side_bar) + (pixel * (5 / 2)) - width / 2;
	var cor_y = (offset * 10) + (pixel * (5 / 2)) - height / 2;

	for (let j = 0; j < hold.length; j++) {
		hold[j].x_pos = (highest_x - hold[j].x) * pixel + cor_x;
		hold[j].y_pos = (highest_y - hold[j].y) * pixel + cor_y;
	}
}

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
			return true;
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
	return false;
}

function flip_tiles() {
	var temp_tiles = ((new Array(tiles.length)).fill(0)).map(ele => (new Array(tiles[0].length)).fill(0));
	console.log(temp_tiles);

	for (var i = tiles.length - 1; i >= 0; i--) {
		for (var j = tiles[0].length - 1; j >= 0; j--) {
			//   console.log(i + "," + j)
			temp_tiles[tiles.length - (i + 1)][tiles[0].length - (j + 1)] = deepCopy(tiles[i][j]);
		}
	}

	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[0].length; j++) {
			temp_tiles[i][j].x = tiles[i][j].x;
			temp_tiles[i][j].y = tiles[i][j].y;
			temp_tiles.shift(0, 0);
		}
	}

	tiles = deepCopy(temp_tiles);
}

function deepCopy(inObject) {
	var outObject;
	var value;
	var key;

	if (typeof inObject !== "object" || inObject === null) {
		return inObject;
	}

	outObject = Array.isArray(inObject) ? [] : {};

	for (key in inObject) {
		value = inObject[key];
		outObject[key] = deepCopy(value);
	}

	return outObject;
}


// see key held instead of key pressed --- kinda done??
// create new tiles --- done!!
// create rotation --- done!!


function keyPressed() {
	if (keyCode == 32) {
		var down = false;

		while (!down) {
			down = shift_piece(0, 1)
		}
	} else if (keyCode == 67 && !held) {
		held = true;
		var temp;

		if (hold[0].c == 0) {
			hold = spawnTile(piece_queue, false);
			piece_queue.shift();
			piece_queue.push(Math.floor(Math.random() * 7) + 1);
			show_tiles.shift();
			show_tiles.push(spawnTile(piece_queue, false, piece_queue[3]));

			show_tiles_changing(1);
			show_tiles_changing(2);
			show_tiles_changing(3);
		} else {
			temp = piece_queue[0];
			piece_queue[0] = hold[0].c;
			hold = spawnTile([temp], false);

			show_tiles[0] = spawnTile(piece_queue, false, piece_queue[0]);
		}
		curr_piece = spawnTile(piece_queue, false);
		curr_piece_hover = spawnTile(piece_queue, true);
		hold_piece_showing();
	} else if (keyCode == 38) {
		p.rotate();
	} else if (keyCode == 40) {
		p.moveDown();
		pressed = 7;
	} else if (keyCode == 37) {
		p.moveLeft();
		pressed = 7;
	} else if (keyCode == 39) {
		p.moveRight();
		pressed = 7;
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

// document.addEventListener("keydown", CONTROL);

// function CONTROL(event) {
// 	const k = event.keyCode;

// 	if (k < 37 || k > 40) return;

// 	event.preventDefault();
// 	// if (k == 37 || k == 39) dropStart = Date.now();

// 	return {
// 		37: p.moveLeft,
// 		38: p.rotate,
// 		39: p.moveRight,
// 		40: p.moveDown
// 	}[k]();
// }