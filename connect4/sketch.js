let pixel = 30;

let side_bar = pixel;

let offset = pixel / 5;

const cols = 10;

const rows = 24;

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