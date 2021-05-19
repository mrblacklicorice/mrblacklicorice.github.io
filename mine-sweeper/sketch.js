var rows = 10;
// Number(prompt("Enter number of rows:", 10));
var cols = 10;
// Number(prompt("Enter number of cols:", 10));;
var pixel = 50;
// Number(prompt("Enter cell size:", 50));;
var offset = pixel / 5;
var mines = 15;
// Number(prompt("Enter number of mines:", 15));;
var grid;

function setup() {
	// var div = createDiv();
	// var button = createButton("click to create");
	// button.mousePressed(() => {
	// 	console.log("hekki");
	// });
	// button.parent(div);
	// div.center();

	// noLoop();



	var canvas = createCanvas(pixel * cols + (offset * 2), pixel * rows + (offset * 2) + (offset * 10));
	textFont("Courier Prime");

	canvas.center("horizontal");
	document.body.style.background = '#222222';
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
var loop_around = false;

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
				} else if (gp.buttons[2] == 1) {
					if (lastkey != "X") {
						lastkey = "X";
						location.reload();
					}
				} else {
					lastkey = "";
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
				}
				else if (gp.buttons[2].value > 0.75 || gp.buttons[2].pressed == true) {
					if (lastkey != "X") {
						lastkey = "X";
						location.reload();
					}
				} else {
					lastkey = "";
				}
			}

			if (Math.abs(gp.axes[0]) > 0.7) {
				if (gp.axes[0] > 0.7) {
					if ((gamepad_X + move_dist < pixel * cols + offset)) {
						gamepad_X += move_dist * Math.abs(gp.axes[0]);
					} else if (loop_around) {
						gamepad_X = offset + move_dist * Math.abs(gp.axes[1]);
					}
				} else if (gp.axes[0] < -0.7)
					if ((gamepad_X - move_dist > offset)) {
						gamepad_X -= move_dist * Math.abs(gp.axes[0]);
					} else if (loop_around) {
						gamepad_X = pixel * cols + offset - move_dist * Math.abs(gp.axes[0]);
					}
			}

			if (Math.abs(gp.axes[1]) > 0.7) {
				if (gp.axes[1] > 0.7) {
					if ((gamepad_Y + move_dist < pixel * rows + offset)) {
						gamepad_Y += move_dist * Math.abs(gp.axes[1]);
					} else if (loop_around) {
						gamepad_Y = offset + move_dist * Math.abs(gp.axes[1]);
					}
				} else if (gp.axes[1] < -0.7) {
					if ((gamepad_Y - move_dist > offset)) {
						gamepad_Y -= move_dist * Math.abs(gp.axes[1]);
					} else if (loop_around) {
						gamepad_Y = pixel * rows + offset - move_dist * Math.abs(gp.axes[1]);
					}
				}
			}
			grid.check_hover(gamepad_X, gamepad_Y);
		}

		if (mouse_X != mouseX || mouse_Y != mouseY || gamepads[0] == undefined) {
			mouse_X = mouseX;
			mouse_Y = mouseY;
			grid.check_hover(mouseX, mouseY);
		}

		textAlign(LEFT, CENTER);
		fill('#ed225d');
		noStroke();

		textSize(pixel / 2);
		text(`Flags: ${grid.flags}`, offset, pixel * rows + (offset * 3));

		textAlign(RIGHT, CENTER);
		text(`Time: ${((grid.start == 0) ? timer_parser(0) : timer_parser(Date.now() - grid.start))}`, pixel * cols + (offset * 1), pixel * rows + (offset * 3));
	} else {
		console.log("gameover");
		if (gamepads[0] != null) {
			if (navigator.getGamepads()[0].vibrationActuator)
				navigator.getGamepads()[0].vibrationActuator.playEffect(navigator.getGamepads()[0].vibrationActuator.type, {
					startDelay: 0,
					duration: 1000,
					weakMagnitude: 0.5,
					strongMagnitude: 1
				});
		}
		setInterval(function () {
			location.reload();
		}, 3000);
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

function timer_parser(time) {
	var ms = (((time % 1000) / 1000).toFixed(3)).substring(2);
	time = Math.floor(time / 1000);
	var s = ((time % 60) / 100).toFixed(2).substring(2);
	var m = (Math.floor(time / 60) / 100).toFixed(2).substring(2);


	return (m + ":" + s + ":" + ms);
}
