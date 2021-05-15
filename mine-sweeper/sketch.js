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
var lastkey = "";
var gamepad_X = offset + pixel / 2;
var gamepad_Y = offset + pixel / 2;
var move_dist = (pixel * 2) / offset;

var mouse_X = 0;
var mouse_Y = 0;

function draw() {
	if (!gameover) {
		clear();
		gameover = grid.show();

		if (gamepads[0] != undefined) {
			if (navigator.webkitGetGamepads) {
				var gp = navigator.webkitGetGamepads()[0];
				if (gp.buttons[0] == 1) {
					if (lastkey != "A") {
						lastkey = "A";
						grid.left_click(mouseX, mouseY);
					}
				} else if (gp.buttons[1] == 1) {
					if (lastkey != "B") {
						lastkey = "B";
						grid.right_click(mouseX, mouseY);
					}
				}
			} else {
				var gp = navigator.getGamepads()[0];
				if (gp.buttons[0].value > 0.75 || gp.buttons[0].pressed == true) {
					if (lastkey != "A") {
						lastkey = "A";
						grid.left_click(gamepad_X, gamepad_Y);
					}
				} else if (gp.buttons[1].value > 0.75 || gp.buttons[1].pressed == true) {
					if (lastkey != "B") {
						lastkey = "B";
						grid.right_click(gamepad_X, gamepad_Y);
					}
				} else {
					lastkey = "";
				}
			}

			if (Math.abs(gp.axes[0]) > 0.8) {
				if (gp.axes[0] > 0.8 && (gamepad_X + move_dist < pixel * cols + offset)) {
					gamepad_X += move_dist;
				} else if (gp.axes[0] < -0.8 && (gamepad_X - move_dist > offset)) {
					gamepad_X -= move_dist;
				}
				console.log(gp.axes[0]);
			}
			if (Math.abs(gp.axes[1]) > 0.8) {
				if (gp.axes[1] > 0.8 && (gamepad_Y + move_dist < pixel * rows + offset)) {
					gamepad_Y += move_dist;
				} else if (gp.axes[1] < -0.8 && (gamepad_Y - move_dist > offset)) {
					gamepad_Y -= move_dist;
				}
				console.log(gp.axes[1]);
			}
			grid.check_hover(gamepad_X, gamepad_Y);
		}

		if (mouse_X != mouseX || mouse_Y != mouseY) {
			mouse_X = mouseX;
			mouse_Y = mouseY;
			grid.check_hover(mouseX, mouseY);
		}

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

window.addEventListener("gamepadconnected", function (e) {
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		e.gamepad.index, e.gamepad.id,
		e.gamepad.buttons.length, e.gamepad.axes.length);
	gamepadHandler(e, true);

});

window.addEventListener("gamepaddisconnected", function (e) {
	console.log("Gamepad disconnected from index %d: %s",
		e.gamepad.index, e.gamepad.id);
	gamepadHandler(e, false);
});

var gamepads = {};

function gamepadHandler(event, connecting) {
	var gamepad = event.gamepad;
	// Note:
	// gamepad === navigator.getGamepads()[gamepad.index]

	if (connecting) {
		gamepads[gamepad.index] = gamepad;
	} else {
		delete gamepads[gamepad.index];
	}
}