var rows = Number(prompt("Enter number of rows:", 10));
var cols = Number(prompt("Enter number of cols:", 10));;
var pixel = Number(prompt("Enter cell size:", 50));;
var offset = pixel / 5;
var mines = Number(prompt("Enter number of mines:", 15));;
var grid;

function setup() {
	createCanvas(pixel * cols + (offset * 2), pixel * rows + (offset * 2) + (offset * 10));
	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());
	textAlign(CENTER, CENTER);
	textSize(pixel / 2);
	grid = new Grid(rows, cols, pixel, offset, mines);
}

var gameover = false;

function draw() {
	if (!gameover) {
		clear();

		gameover = grid.show();

		grid.check_hover(mouseX, mouseY);

		textAlign(LEFT, CENTER);
		fill('#ed225d');
		noStroke();
		text(`Flags: ${grid.flags}`, offset, pixel * rows + (offset * 3));
	} else {
		console.log("gameover");
		noLoop();
	}
}

function mousePressed() {
	if (mouseButton == "left") {
		grid.left_click(mouseX, mouseY);
	} else if (mouseButton == "right") {
		grid.right_click(mouseX, mouseY);
	}
}