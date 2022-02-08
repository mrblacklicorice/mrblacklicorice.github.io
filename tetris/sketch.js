let pixel = 30;

let side_bar = pixel;

let offset = pixel / 5;

const cols = 10;

const rows = 24;

let tiles = [];

let curr_piece;

let curr_piece_hover;

let global_timer;
let global_timeout;
let global_time_left = 0;

let movement_timer;

let piece_queue = random_piece().concat(random_piece());

let canvas;

let hold = [new Tile(0, 0, 0, 0, offset)];

let colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];

let show_tiles = [spawnTile(piece_queue, false, piece_queue[0]), spawnTile(piece_queue, false, piece_queue[1]), spawnTile(piece_queue, false, piece_queue[2]), spawnTile(piece_queue, false, piece_queue[3])];

let held = false;

let lines = 0;
let flip_times;
let temp_lines;

let timer = [0, 0, 0];

let already_flipped = false;

let gamestate = -1;

let points = 0;
let combo = 1;
let highscore = 0;
// -1 == didnt start, 0 == started, 1 == paused, 2 == ended

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

	frameRate(100);
}



function draw() {
	clear();

	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			tiles[i][j].show();
		}
	}

	noFill();
	stroke("#347589");
	rect((offset * 0.1 * side_bar), (offset * 11) + (pixel * 5), pixel * 5, pixel * 10);


	if (gamestate == -1) {
		stroke(colors[0]);
		noFill();
		rect(offset * 0.1 * side_bar, offset * 10, pixel * 5, pixel * 5);

		for (let i = 0; i < 3; i++) {
			noFill();
			stroke(colors[hold[0].c]);
			rect(canvas.width - (side_bar * offset * 0.9), (offset * (i + 1)) + (pixel * (i * 5)), pixel * 5, pixel * 5);
		}

		fill(50, 50, 50, 150);
		stroke(50, 50, 50, 150);
		rect(tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
		textSize(24);
		fill("#FFFFFF");
		noStroke();
		textAlign(CENTER, CENTER);
		text('PRESS SPACE TO START', tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
		textSize(12);
		textAlign(CENTER, TOP);
		text('PRESS ESC TO PAUSE\nUSE ARROWS TO NAVIGATE\nPRESS C TO HOLD\nPRESS SPACE TO HARD DROP', (offset * 0.1 * side_bar), (offset * 12) + (pixel * 5), pixel * 5, pixel * 10);
	} else if (gamestate == 0) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].show();
			curr_piece_hover[i].show();
		}

		stroke(colors[hold[0].c]);
		noFill();
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
				stroke(colors[piece_queue[i + 1]]);
				show_tiles[i + 1][j].show();
			}
		}
		// this is for peices in order

		if (keyIsDown(40)) {
			timer[0]++;
			if (timer[0] % 7 == 0) {
				p.moveDown();
				points += combo * 10;
			}
		} else if (keyIsDown(37)) {
			timer[1]++;
			if (timer[1] % 7 == 0) p.moveLeft();;
		} else if (keyIsDown(39)) {
			timer[2]++;
			if (timer[2] % 7 == 0) p.moveRight();;
		}

		fill("#FFFFFF");
		noStroke();
		textSize(16);
		textAlign(CENTER, TOP);
		text('Points: ' + Math.floor(points), (offset * 0.1 * side_bar), (offset * 12) + (pixel * 5), pixel * 5, pixel * 10);
		text('Combo: ' + Math.floor(combo) + "x", (offset * 0.1 * side_bar), (offset * 16) + (pixel * 5), pixel * 5, pixel * 10);
		text('Lines Left: ' + (3 - (Math.floor(lines) % 3)), (offset * 0.1 * side_bar), (offset * 20) + (pixel * 5), pixel * 5, pixel * 10);
		text('Highscore: ' + Math.floor(highscore), (offset * 0.1 * side_bar), (offset * 28) + (pixel * 5), pixel * 5, pixel * 10);
	} else if (gamestate == 1) {
		for (let i = 0; i < curr_piece.length; i++) {
			curr_piece[i].show();
			curr_piece_hover[i].show();
		}

		stroke(colors[hold[0].c]);
		noFill();
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
				stroke(colors[piece_queue[i + 1]]);
				show_tiles[i + 1][j].show();
			}
		}

		fill(50, 50, 50, 150);
		stroke(50, 50, 50, 150);
		rect(tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
		textSize(32);
		fill("#FFFFFF");
		noStroke();
		textAlign(CENTER, CENTER);
		text('PAUSED', tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
		textSize(12);
		textAlign(CENTER, TOP);
		text('PRESS ESC TO PAUSE\nUSE ARROWS TO NAVIGATE\nPRESS C TO HOLD\nPRESS SPACE TO HARD DROP', (offset * 0.1 * side_bar), (offset * 12) + (pixel * 5), pixel * 5, pixel * 10);
	} else if (gamestate == 2) {
		stroke(colors[0]);
		noFill();
		rect(offset * 0.1 * side_bar, offset * 10, pixel * 5, pixel * 5);

		for (let i = 0; i < 3; i++) {
			noFill();
			stroke(colors[hold[0].c]);
			rect(canvas.width - (side_bar * offset * 0.9), (offset * (i + 1)) + (pixel * (i * 5)), pixel * 5, pixel * 5);
		}

		fill(50, 50, 50, 150);
		stroke(50, 50, 50, 150);
		rect(tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
		textSize(32);
		fill("#FFFFFF");
		noStroke();
		textAlign(CENTER, CENTER);
		text('GAME OVER', tiles[0][0].x_pos, tiles[0][0].y_pos, cols * pixel, rows * pixel);
	}
}

function spawnTile(tile_array, hover, i) {
	// [none, I, J, L, S, Z, O, T]
	// [  0 , 1, 2, 3, 4, 5, 6, 7]
	let center = ((cols / 2)) - 1;
	let result;
	let tile = (i == undefined) ? tile_array[0] : i;

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
				let colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];
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
				// debugger;
				gamestate = 2;
				for (let i = 0; i < rows; i++) {
					tiles[i] = [];
					for (let j = 0; j < cols; j++) {
						tiles[i][j] = new Tile(j, i, pixel, 0, offset);
					}
				}
				setTimeout(() => { gamestate = -1; }, 1000);
				highscore = highscore > points ? highscore : points;
				return true;
			}
			tiles[curr_piece[i].y][curr_piece[i].x] = curr_piece[i];
		}

		temp_lines = 0;
		flip_times = 0;
		for (let i = 0; i < curr_piece.length; i++) {
			if (!checkLine(curr_piece[i].y, true)) {
				lines++;
				temp_lines++;
				already_flipped = false;
			}

			if (lines > 0 && (lines % 3 == 0) && !already_flipped) {
				flip_times++;
				already_flipped = true;
			}
		}

		combo += 0.1 * flip_times;

		if (flip_times % 2 == 1) {
			flip_tiles();
		}

		lines += combo * (temp_lines > 1 ? (temp_lines > 2 ? (temp_lines > 3 ? 700 : 500) : 300) : temp_lines * 100);

		piece_queue.shift();
		if (piece_queue.length == 7) piece_queue = piece_queue.concat(random_piece());

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
			gamestate = 2;
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

	let hover_done = check_piece_hover(x_diff, y_diff);
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

function show_tiles_changing(i) {
	let lowest_x = 1000;
	let highest_x = -1000;
	let lowest_y = 1000;
	let highest_y = -1000;

	for (let j = 0; j < show_tiles[i].length; j++) {
		if (lowest_x > show_tiles[i][j].x) lowest_x = show_tiles[i][j].x;
		if (highest_x < show_tiles[i][j].x) highest_x = show_tiles[i][j].x;
		if (lowest_y > show_tiles[i][j].y) lowest_y = show_tiles[i][j].y;
		if (highest_y < show_tiles[i][j].y) highest_y = show_tiles[i][j].y;
	}

	let width = (highest_x - lowest_x + 1) * pixel;
	let height = (highest_y - lowest_y + 1) * pixel;
	let cor_x = ((canvas.width - (side_bar * offset * 0.9)) + (pixel * (5 / 2)) - width / 2);
	let cor_y = (offset * (i)) + (pixel * ((i - 1) * 5)) + (pixel * (5 / 2)) - height / 2;

	for (let j = 0; j < show_tiles[i].length; j++) {
		show_tiles[i][j].x_pos = (highest_x - show_tiles[i][j].x) * pixel + cor_x;
		show_tiles[i][j].y_pos = (highest_y - show_tiles[i][j].y) * pixel + cor_y;
	}
}

function hold_piece_showing() {
	let lowest_x = 1000;
	let highest_x = -1000;
	let lowest_y = 1000;
	let highest_y = -1000;

	for (let j = 0; j < hold.length; j++) {
		if (lowest_x > hold[j].x) lowest_x = hold[j].x;
		if (highest_x < hold[j].x) highest_x = hold[j].x;
		if (lowest_y > hold[j].y) lowest_y = hold[j].y;
		if (highest_y < hold[j].y) highest_y = hold[j].y;
	}

	let width = (highest_x - lowest_x + 1) * pixel;
	let height = (highest_y - lowest_y + 1) * pixel;
	let cor_x = (offset * 0.1 * side_bar) + (pixel * (5 / 2)) - width / 2;
	let cor_y = (offset * 10) + (pixel * (5 / 2)) - height / 2;

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
	let sp = 0;
	while (sp < tiles.length && !checkLine(sp, false)) {
		sp++;
	}

	let temp_tiles = [];
	for (let i = 0; i < rows - sp; i++) {
		temp_tiles[i] = [];
		for (let j = 0; j < cols; j++) {
			temp_tiles[i][j] = {};
		}
	}

	for (let i = 0; i < tiles.length - sp; i++) {
		for (let j = 0; j < tiles[0].length; j++) {
			temp_tiles[i][j].i = tiles[i + sp][j].i;
			temp_tiles[i][j].c = tiles[i + sp][j].c;
			temp_tiles[i][j].r = tiles[i + sp][j].r;
		}
	}

	for (let i = 0; i < tiles.length - sp; i++) {
		for (let j = 0; j < tiles[0].length; j++) {
			tiles[i + sp][j].i = temp_tiles[temp_tiles.length - (i + 1)][temp_tiles[0].length - (j + 1)].i;
			tiles[i + sp][j].c = temp_tiles[temp_tiles.length - (i + 1)][temp_tiles[0].length - (j + 1)].c;
			tiles[i + sp][j].r = temp_tiles[temp_tiles.length - (i + 1)][temp_tiles[0].length - (j + 1)].r;
		}
	}
}
function random_piece() {
	var nums = [1, 2, 3, 4, 5, 6, 7];
	var ranNums = [];

	while (nums.length > 0) {
		ranNums.push(nums.splice(Math.floor(Math.random() * (nums.length)), 1)[0]);
	}

	return ranNums;
}

function keyPressed() {
	if (gamestate == 0) {
		if (keyCode == 32) {
			let down = false;

			while (!down) {
				down = shift_piece(0, 1);
				points += combo * 15;
			}
		} else if (keyCode == 27) {
			gamestate = 1;
			global_time_left = (global_timeout == -1) ? (global_timer._idleStart + global_timer._idleTimeout - Date.now()) : (global_timer._idleStart + global_timer._idleTimeout - Date.now());
			clearTimeout(global_timeout);
			clearInterval(global_timer);
		} else if (keyCode == 67 && !held) {
			held = true;
			let temp;

			if (hold[0].c == 0) {
				hold = spawnTile(piece_queue, false);
				piece_queue.shift();
				if (piece_queue.length == 7) piece_queue = piece_queue.concat(random_piece());
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
		}
		// else if (keyCode == 40) {
		// 	p.moveDown();
		// 	timer[0] = 0;
		// 	points += combo * 10;
		// } else if (keyCode == 37) {
		// 	p.moveLeft();
		// 	timer[1] = 0;
		// } else if (keyCode == 39) {
		// 	p.moveRight();
		// 	timer[2] = 0;
		// }
	} else if (gamestate == -1 && keyCode == 32) {
		global_timeout;
		global_time_left = 0;
		movement_timer;
		piece_queue = random_piece().concat(random_piece());
		hold = [new Tile(0, 0, 0, 0, offset)];
		show_tiles = [spawnTile(piece_queue, false, piece_queue[0]), spawnTile(piece_queue, false, piece_queue[1]), spawnTile(piece_queue, false, piece_queue[2]), spawnTile(piece_queue, false, piece_queue[3])];
		held = false;
		lines = 0;
		timer = [0, 0, 0];
		already_flipped = false;
		points = 0;
		combo = 1;

		curr_piece = spawnTile(piece_queue, false);
		curr_piece_hover = spawnTile(piece_queue, true);

		show_tiles_changing(1);
		show_tiles_changing(2);
		show_tiles_changing(3);

		hold_piece_showing();

		global_timer = setInterval(shift_piece, 500, 0, 1);
		gamestate = 0;
	} else if (gamestate == 1 && keyCode == 27) {
		gamestate = 0;
		global_timeout = setTimeout(() => {
			global_timeout = -1;
			global_timer = setInterval(shift_piece, 500, 0, 1);
		}, global_time_left);
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
		let moveable = (p.lowest_x > 0);
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

		let good = !(p.lowest_x > -1 && p.highest_x < cols);
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
		let moveable = (p.highest_x < cols - 1);
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