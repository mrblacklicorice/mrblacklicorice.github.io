var circles = [];

let pixel = 70;

var row = 6;
var col = 7;
var borders = new Array(col);


var x_mar;
var y_mar;

var p1_scr = 0;
var p2_scr = 0;

var curry;

var p1 = true;
var pause = false;

var board = ((new Array(row)).fill(0)).map(ele => (new Array(col)).fill("-"));

var canvas;

function setup() {
	canvas = createCanvas(10 * pixel, 10 * pixel);

	canvas.center("horizontal");

	document.body.style.background = '#222222';
	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	x_mar = ((width - (col * pixel)) / 2);
	y_mar = ((height - (row * pixel)) / 2);
	borders.fill(row * pixel + y_mar - (pixel / 2));
	textSize(pixel / 2);
	textAlign(CENTER, CENTER);
	strokeJoin(ROUND);
}

function draw() {
	clear();

	fill("blue");
	text(p1_scr, x_mar + pixel, (y_mar / 2));
	fill("red");
	text(p2_scr, x_mar + ((col - 1) * pixel), (y_mar / 2));

	noFill();
	if (p1) {
		stroke("blue");
		rect(x_mar + (pixel / 2), (y_mar / 2) - (pixel / 2), pixel, pixel);
	} else if (!p1) {
		stroke("red");
		rect((x_mar + ((col - 1) * pixel)) - (pixel / 2), (y_mar / 2) - (pixel / 2), pixel, pixel);
	}


	fill("grey");
	stroke("#555555");
	strokeWeight(5);
	for (let x = 0; x < (col * pixel); x += pixel) {
		for (let y = 0; y < (row * pixel); y += pixel) {
			rect(x + x_mar, y + y_mar, pixel, pixel);
		}
	}

	noStroke();
	for (let i = 0; i < circles.length; i++) {
		fill(circles[i].c);
		ellipse(circles[i].x, circles[i].y, pixel - (pixel / 10), pixel - (pixel / 10));
	}

	if (pause) {
		fill(50, 50, 50, 150);
		rect(0, 0, width, height, pixel / 4);
		text("Press ESC to play", x_mar + (pixel * col / 2), y_mar + (pixel * row / 2));
	} else {
		if (circles.length > 0 && circles[circles.length - 1].y < borders[curry]) {
			circles[circles.length - 1].y += pixel / 10;
		}

		if (circles.length > 0 && circles[circles.length - 1].y == borders[curry] && check_win("o")) {
			p1_scr++;
			console.log("player 1 wins");
			board = ((new Array(row)).fill(0)).map(ele => (new Array(col)).fill("-"));
			circles = [];
			borders.fill(row * pixel + y_mar - (pixel / 2));
			curry = undefined;
			p1 = true;
		}

		if (circles.length > 0 && circles[circles.length - 1].y == borders[curry] && check_win("x")) {
			p2_scr++;
			console.log("player 2 wins");
			board = ((new Array(row)).fill(0)).map(ele => (new Array(col)).fill("-"));
			circles = [];
			borders.fill(row * pixel + y_mar - (pixel / 2));
			curry = undefined;
			p1 = true;
		}

		if (circles.length == col * row && circles[circles.length - 1].y == borders[curry]) {
			board = ((new Array(row)).fill(0)).map(ele => (new Array(col)).fill("-"));
			circles = [];
			borders.fill(row * pixel + y_mar - (pixel / 2));
			curry = undefined;
			p1 = true;
		}
	}
}

function mouseClicked() {
	if (x_mar < mouseX && mouseX < x_mar + (col * pixel) && !pause && (curry == undefined || borders[curry] == circles[circles.length - 1].y) && borders[Math.floor(((mouseX - x_mar) / pixel))] > y_mar + pixel) {
		if (circles.length > 0 && circles[circles.length - 1].y == borders[curry]) {
			borders[curry] -= pixel;
		}
		circles.push({ x: (Math.floor(((mouseX - x_mar) / pixel)) * pixel) + (pixel / 2) + x_mar, y: y_mar - pixel, c: (p1 ? "blue" : "red") });
		p1 = !p1;
		curry = Math.floor(((mouseX - x_mar) / pixel));
		board[(borders[curry] - y_mar - (pixel / 2)) / pixel][curry] = p1 ? "x" : "o";
		console.table(board);
	}
}


function check_win(p) {
	var tr, tc, i;
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[r].length; c++) {
			if (board[r][c] == p) {
				for (let l = -1; l <= 1; l++) {
					for (let k = -1; k <= 1; k++) {
						tr = l, tc = k, i = 1;
						if (!(l == 0 && k == 0)) {
							while ((r + tr > -1 && r + tr < board.length && c + tc > -1 && c + tc < board[r].length) && board[r + tr][c + tc] == p) {
								tr += l;
								tc += k;
								i++;
								if (i == 4) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}


document.addEventListener('keydown', (event) => {
	if (event.code == "Escape") {
		pause = !pause;
	}
});

window.addEventListener("resize", canvas.center("horizontal"));

