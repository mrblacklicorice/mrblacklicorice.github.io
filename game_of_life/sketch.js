var padding = 20;
var pixel = 16;
var rows = 50;
var cols = 50;
var canvas;

var idX, idY;
var dim = 2500;
var offsetX = dim / 2;
var offsetY = dim / 2;

let isMouseDragged = false;
let pmouseX = null;
let pmouseY = null;

var buttons = [
	{ name: "Start", x1: 0, y1: 0, x2: 0, y2: 0, function: "startBtn", hover: false },
	{ name: "Import", x1: 0, y1: 0, x2: 0, y2: 0, function: "importBtn", hover: false },
	{ name: "Export", x1: 0, y1: 0, x2: 0, y2: 0, function: "exportBtn", hover: false }];

var board = new Array(dim);

function setup() {
	for (let i = 0; i < dim; i++) {
		board[i] = new Array(dim);
		for (let j = 0; j < dim; j++) {
			board[i][j] = false;
		}
	}

	windowResized();

	noStroke();
	document.body.style.background = '#222222';
	// frameRate(12);
}

function draw() {
	clear();

	noStroke();
	fill(255);
	rect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// console.log(board[i][j]);
			if (board[i + offsetX][j + offsetY]) {
				fill(0);
				rect(i * pixel, j * pixel, pixel, pixel);
			}
		}
	}

	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i].x1 < mouseX && mouseX < buttons[i].x2 && buttons[i].y1 < mouseY && mouseY < buttons[i].y2 && !isMouseDragged) {
			fill(200, 200, 200);
			buttons[i].hover = true;
		} else {
			fill(150, 150, 150);
			buttons[i].hover = false;
		}

		rect(buttons[i].x1, buttons[i].y1, buttons[i].x2 - buttons[i].x1, buttons[i].y2 - buttons[i].y1);

		rectMode(CENTER);
		fill(0);
		text(buttons[i].name, (buttons[i].x2 + buttons[i].x1) / 2, (buttons[i].y2 + buttons[i].y1) / 2);
		rectMode(CORNER);
	}

	if (!isMouseDragged && buttons.every((button) => !button.hover) && 0 <= idX && idX < rows && 0 <= idY && idY < cols) {
		stroke(pixel / 5);
		fill(0, 0, 0, 100);
		rect(idX * pixel, idY * pixel, pixel, pixel);
	}
}

function startBtn() {
	console.log("start");
}

function importBtn() {
	console.log("import");
}

function exportBtn() {
	console.log("export");

	noLoop();
	var blob = new Blob([JSON.stringify(board)], {
		type: "text/plain;charset=utf-8"
	});
	saveAs(blob, `${prompt("Enter a file name", "gol_board")}.json`);
	loop();
}

function windowResized() {
	rows = Math.floor((windowWidth - padding) / pixel);
	cols = Math.floor((windowHeight - padding) / pixel);

	// alert(rows + "" + cols)
	console.log(rows + ", " + cols)

	canvas = createCanvas(rows * pixel, cols * pixel);
	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].x1 = (i * (canvas.width / buttons.length)) + (canvas.width / 100);
		buttons[i].y1 = canvas.height - (canvas.height / 9);
		buttons[i].x2 = ((i + 1) * (canvas.width / buttons.length)) - (canvas.width / 100);
		buttons[i].y2 = canvas.height - (canvas.height / 60);
	}

	textSize(canvas.height / 25);
	textAlign(CENTER, CENTER);
}

function mouseMoved() {
	idX = Math.floor(mouseX / pixel);
	idY = Math.floor(mouseY / pixel);
}

function mousePressed() {
	pmouseX = mouseX;
	pmouseY = mouseY;
}

function mouseDragged() {
	isMouseDragged = true;

	var changeX = Math.trunc((mouseX - pmouseX) / pixel);
	var changeY = Math.trunc((mouseY - pmouseY) / pixel);


	if (changeX != 0 && offsetX - changeX >= 0 && offsetX - changeX <= dim - rows) {
		pmouseX = mouseX;
		offsetX -= changeX;
		console.log(changeX);
	}

	if (changeY != 0 && offsetY - changeY >= 0 && offsetY - changeY <= dim - cols) {
		pmouseY = mouseY;
		offsetY -= changeY
		console.log(changeY);
	}

	// console.log(offsetX + ", " + offsetY);
}

function mouseReleased() {
	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i].hover) {
			window[buttons[i].function]();
		}
	}

	if (!isMouseDragged && buttons.every((button) => !button.hover)) {
		board[offsetX + idX][offsetY + idY] = !board[offsetX + idX][offsetY + idY];
	}

	pmouseX = null;
	pmouseY = null;
	isMouseDragged = false;
}

function mouseWheel(event) {
	var tempX = Math.round(mouseX / pixel);
	var tempY = Math.round(mouseY / pixel);
	var tempP = pixel;

	if (event.delta < 0 && pixel < 64) {
		// Zoom in
		pixel *= 1.5;
		pixel = Math.round(pixel);
		offsetX += Math.floor((1 - (tempP / pixel)) * tempX);
		offsetY += Math.floor((1 - (tempP / pixel)) * tempY);

	} else if (event.delta > 0 && pixel > 8) {
		// Zoom out
		pixel /= 1.5;
		pixel = Math.round(pixel);
		offsetX -= Math.floor(((tempP / pixel) - 1) * tempX);
		offsetY -= Math.floor(((tempP / pixel) - 1) * tempY);
	}

	mouseMoved();
	windowResized();

	// Disable page scroll
	return false;
}