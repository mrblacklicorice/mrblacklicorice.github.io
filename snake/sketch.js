var pixel = 20;

var rows = 25;
var cols = 25;

var snake = [new Segment(Math.floor(rows / 2), Math.floor(cols / 2)), new Segment(Math.floor(rows / 2), Math.floor(cols / 2) + 1), new Segment(Math.floor(rows / 2), Math.floor(cols / 2) + 2)];
snake[0].h = true;
var canvas;
var queue = [];
var [sdX, sdY] = [pixel / 4, pixel / 4];
var coord;
var temp;
var highScore = 0;

function setup() {
	canvas = createCanvas(cols * pixel, rows * pixel + 5 * pixel);
	canvas.center("horizontal");
	strokeWeight(0);

	document.body.style.background = '#222222';
	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());


	frameRate(12);
}

function draw() {
	clear();
	textSize(pixel * 1.2);
	textAlign(CENTER, CENTER);
	fill("#f47a60");
	rect(0, 0, cols * pixel, rows * pixel);

	if (snake[0].x == sdX && snake[0].y == sdY) {
		while (snake.some((s) => s.x == sdX && s.y == sdY)) {
			[sdX, sdY] = [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)];
		}

		snake.push(new Segment(snake[snake.length - 1].x, snake[snake.length - 1].y));

		if (snake.length - 3 > highScore) {
			highScore = snake.length - 3;
		}
	}

	if (queue.length != 0) {
		coord = (queue.length == 1) ? queue[0] : queue.shift();

		temp = snake.pop();

		snake[0].h = false;
		temp.x = (snake[0].x + coord[0]).mod(cols);
		temp.y = (snake[0].y + coord[1]).mod(rows);
		temp.h = true;

		snake.unshift(temp);
	}


	for (var i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			snake = [new Segment(Math.floor(rows / 2), Math.floor(cols / 2)), new Segment(Math.floor(rows / 2), Math.floor(cols / 2) + 1), new Segment(Math.floor(rows / 2), Math.floor(cols / 2) + 2)];
			snake[0].h = true;
			queue = [];
		}
	}
	fill("#b266b2");
	text("M", sdX * pixel + pixel / 2, sdY * pixel + pixel / 2);

	fill("#316879");
	for (var i = 0; i < snake.length; i++) {
		snake[i].show();
	}

	textSize(pixel * 2);
	fill("#f47a60");

	textAlign(LEFT, CENTER);
	text("Score: " + (snake.length - 3), pixel, rows * pixel + pixel * 2);

	textAlign(RIGHT, CENTER);
	text("High Score: " + highScore, cols * pixel - pixel, rows * pixel + pixel * 2);
}

function keyPressed() {
	if (keyCode == 38 && (queue.length == 0 || queue[queue.length - 1][1] != 1)) {
		queue.push([0, -1]);
	} else if (keyCode == 40 && (queue.length == 0 || queue[queue.length - 1][1] != -1)) {
		queue.push([0, 1]);
	} else if (keyCode == 37 && (queue.length == 0 || queue[queue.length - 1][0] != 1)) {
		queue.push([-1, 0]);
	} else if (keyCode == 39 && (queue.length == 0 || queue[queue.length - 1][0] != -1)) {
		queue.push([1, 0]);
	}
}

Number.prototype.mod = function (n) {
	"use strict";
	return ((this % n) + n) % n;
};	