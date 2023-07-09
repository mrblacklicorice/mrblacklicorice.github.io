var padding = 20;
var pixel = 16;
var rows = 50;
var cols = 50;
var canvas;

var idX, idY;
var dim = 1000;
var offsetX = dim / 2;
var offsetY = dim / 2;

let isMouseDragged = false;
let pmouseX = null;
let pmouseY = null;

var buttons = [
	{ name: "Start", x1: 0, y1: 0, x2: 0, y2: 0, function: "startBtn", hover: false },
	{ name: "Import", x1: 0, y1: 0, x2: 0, y2: 0, function: "importBtn", hover: false },
	{ name: "Export", x1: 0, y1: 0, x2: 0, y2: 0, function: "exportBtn", hover: false },
	{ name: "Patterns", x1: 0, y1: 0, x2: 0, y2: 0, function: "patternBtn", hover: false }
];

var board = new Array(dim);

var details = document.getElementById("details");

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


	// White Background
	noStroke();
	fill(255);
	rect(0, 0, canvas.width, canvas.height);


	// Draw all filled squares
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// console.log(board[i][j]);
			if (board[(i + offsetX) % dim][(j + offsetY) % dim]) {
				fill(0);
				rect(i * pixel, j * pixel, pixel, pixel);
			}
		}
	}

	// Draw grid lines
	stroke(125);
	strokeWeight(pixel / 25);
	for (let i = 0; i < rows; i++) {
		line(i * pixel, 0, i * pixel, canvas.height);
	}

	for (let i = 0; i < cols; i++) {
		line(0, i * pixel, canvas.width, i * pixel);
	}

	// Draw buttons
	noStroke();
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
		textAlign(CENTER, CENTER);
		textSize((canvas.width / 40) + (canvas.width / 200));
		text(buttons[i].name, (buttons[i].x2 + buttons[i].x1) / 2, (buttons[i].y2 + buttons[i].y1) / 2);
		rectMode(CORNER);
	}

	// Draw cursor
	if (!isMouseDragged && buttons.every((button) => !button.hover) && 0 <= idX && idX < rows && 0 <= idY && idY < cols) {
		// stroke(pixel / 5);
		fill(0, 0, 0, 100);
		rect(idX * pixel, idY * pixel, pixel, pixel);
	}

	fill(0);
	textAlign(LEFT, TOP);
	textSize(((canvas.width / 25) + (canvas.width / 200)) / 2);
	text("[" + offsetX + ", " + offsetY + "]", canvas.width / 75, canvas.width / 75);
}

function startBtn() {
	console.log("start");
}

function importBtn() {
	document.getElementById("file_upload").click();
}

document.getElementById("file_upload").addEventListener("change", function () {
	noLoop();

	if (this.value) {
		let reader = new FileReader();
		reader.readAsText(this.files[0]);
		console.log(reader);
		reader.onload = function () {

			console.log("loaded")
			var tempBoard = JSON.parse(reader.result);

			if (tempBoard.length == dim && tempBoard.every((row) => row.length == dim)) {
				for (let i = 0; i < tempBoard.length; i++) {
					for (let j = 0; j < tempBoard.length; j++) {
						if (typeof tempBoard[i][j] != "boolean") {
							alert("Invalid file");
							return;
						}
					}
				}

				board = tempBoard;
			} else {
				alert("Invalid file");
			}
		};
		reader.onerror = function () {
			alert(reader.error);
		};
	}

	document.getElementById('file_upload').value = "";

	loop();
});

function exportBtn() {
	noLoop();
	var blob = new Blob([JSON.stringify(board)], {
		type: "text/plain;charset=utf-8"
	});
	var name = prompt("Enter a file name", "gol_board");
	if (name != null) {
		saveAs(blob, `${name}.json`);
	}
	loop();
}

function patternBtn() {
	console.log("menu");
	noLoop();
	if (details.open) {
		details.close();
		loop();
	}
	else {
		details.showModal();
	}
}

function windowResized() {
	if (details.open) {
		details.close();
		loop();
	}

	rows = Math.floor((windowWidth - padding) / pixel);
	cols = Math.floor((windowHeight - padding) / pixel);

	canvas = createCanvas(rows * pixel, cols * pixel);
	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].x1 = (i * (canvas.width / buttons.length)) + (canvas.width / 100);
		buttons[i].y1 = canvas.height - (canvas.height / 9);
		buttons[i].x2 = ((i + 1) * (canvas.width / buttons.length)) - (canvas.width / 100);
		buttons[i].y2 = canvas.height - (canvas.height / 60);
	}

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


	if (changeX > 0) {
		pmouseX = mouseX;
		offsetX = offsetX - changeX;
		if (offsetX < 0) {
			offsetX = dim + offsetX;
		}
	} else if (changeX < 0) {
		pmouseX = mouseX;
		offsetX = (offsetX - changeX) % dim;
	}

	console.log(changeX + ", " + changeY);

	if (changeY > 0) {
		pmouseY = mouseY;
		offsetY = offsetY - changeY;
		if (offsetY < 0) {
			offsetY = dim + offsetY;
		}
	} else if (changeY < 0) {
		pmouseY = mouseY;
		offsetY = (offsetY - changeY) % dim;
	}

	// console.log(offsetX + ", " + offsetY);
}

function mouseReleased() {
	if (isLooping()) {
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].hover) {
				window[buttons[i].function]();
			}
		}

		if (!isMouseDragged && buttons.every((button) => !button.hover)) {
			board[(offsetX + idX) % dim][(offsetY + idY) % dim] = !board[(offsetX + idX) % dim][(offsetY + idY) % dim];
		}

		pmouseX = null;
		pmouseY = null;
		isMouseDragged = false;
	}
}

function mouseWheel(event) {
	if (isLooping()) {

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
}