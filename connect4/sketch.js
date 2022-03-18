let pixel = 90;

let side_bar = pixel;

let offset = pixel / 5;

// const cols = 7;

// const rows = 6;

function setup() {
	canvas = createCanvas(pixel * cols + (offset * 2) + (side_bar * offset * 2), pixel * rows + (offset * 2) + (offset * 10));

	canvas.center("horizontal");
	document.body.style.background = '#222222';

	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	frameRate(100);
}



function draw() {
	clear();
}


const cols = 7;

const rows = 6;

// x and o
var d = [
	["-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-"],
	["-", "x", "x", "x", "x", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-"],
	["-", "-", "-", "-", "-", "-", "-"],
];

function check_win(p) {
	var tr, tc, i;
	for (let r = 0; r < d.length; r++) {
		for (let c = 0; c < d[r].length; c++) {
			if (d[r][c] == p) {
				for (let l = -1; l < 1; l++) {
					for (let k = -1; k < 1; k++) {
						tr = 0, tc = 0, i = 1;
						if (!(l == 0 && k == 0)) {
							while (isInBorder(r + tr, c + tc) && d[r + tr][c + tc] == p) {
								if (i == 4) return true;
								tr += l;
								tc += k;
								i++;
							}
						}
					}
				}
			}
		}
	}
	return false;
}

function isInBorder(r, c) {
	return (r > -1 && r < rows && c > -1 && c < cols);
}

console.log(check_win("x"));