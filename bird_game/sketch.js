const TOTAL = 250;
let slider;

let div;

var ground;

var gravity;
var forward_force;

var obstacles_top = [];
var obstacles_bottom = [];
var birds = [];
var savedBirds = [];

var gen_number = 0;
var highest_score = 0;

var curr_index_closest = -1;

function setup() {
	var canvas = createCanvas(700, 350);

	gravity = createVector(0, 0.20);
	forward_force = createVector(-5, 0);

	ground = new Particle(0, height, width, 100, "#aa0114");

	addObstacles((1 * width) / 4);
	addObstacles((2 * width) / 4);
	addObstacles((3 * width) / 4);
	addObstacles();

	document.body.style.background = '#222222';

	document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

	ellipseMode(RADIUS);

	tf.setBackend('cpu');
	slider = createSlider(1, 10, 1);

	div = createDiv("");
	div.child(canvas);
	div.child(createElement("br", ""));
	div.child(slider);

	div.center("both");

	for (let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird(width / 20, height / 2, width / 44, "#107ab0");
	}
}

function draw() {
	clear();
	noStroke();

	// background
	fill(255);
	rect(0, 0, width, height);

	ground.show();

	for (let n = 0; n < slider.value(); n++) {
		curr_index_closest = (obstacles_bottom[0].position.x + obstacles_bottom[0].w > birds[0].position.x - birds[0].r) ? 0 : 1;
		for (let i = 0; i < obstacles_top.length; i++) {
			obstacles_top[i].update();
			obstacles_bottom[i].update();

			for (let j = birds.length - 1; j >= 0; j--) {
				if (birds[j].collison(obstacles_bottom[curr_index_closest]) || birds[j].collison(obstacles_top[curr_index_closest])) {
					savedBirds.push(birds.splice(j, 1)[0]);
				}
			}

			if (obstacles_bottom[0].position.x < -obstacles_bottom[0].w) obstacles_bottom.shift();
			if (obstacles_top[0].position.x < -obstacles_top[0].w) obstacles_top.shift();

			if (obstacles_top.length == 3) addObstacles();
		}

		for (let i = birds.length - 1; i >= 0; i--) {
			if (birds[i].collison(ground)) {
				savedBirds.push(birds.splice(i, 1)[0]);
			}

			if (birds[i].position.y < birds[i].h / 2 && birds[i].velocity.y != 0) {
				birds[i].position.y = birds[i].h / 2;
				birds[i].velocity.y = 0;
			}
		}

		for (let bird of birds) {
			bird.think(obstacles_bottom[curr_index_closest], obstacles_top[curr_index_closest]);
			bird.applyForce(gravity);
			bird.score++;
			bird.update();
		}

		if (birds.length === 0) {
			nextGeneration();
			gen_number++;
			obstacles_bottom = [];
			obstacles_top = [];

			addObstacles((1 * width) / 4);
			addObstacles((2 * width) / 4);
			addObstacles((3 * width) / 4);
			addObstacles();
		}
	}

	for (let i = 0; i < obstacles_bottom.length; i++) {
		obstacles_top[i].show();
		obstacles_bottom[i].show();
	}

	for (let i = 0; i < birds.length; i++) {
		birds[i].show();
	}

	textSize(32);
	text(`GEN: ${gen_number}`, 5, 30);
	text(`SCORE: ${Math.floor(birds[0].score / 10)}`, 5, 60);

	highest_score = (highest_score < birds[0].score) ? birds[0].score : highest_score;
	text(`H SCR: ${Math.floor(highest_score / 10)}`, 5, height - 10);
}


function addObstacles(w) {
	var rand = random(-height / 10, height / 10)
	if (w == undefined) {
		obstacles_top.push(new Particle(width, 0, width / 20, (2 * height) / 5 - rand, "#aa0114"));
		obstacles_bottom.push(new Particle(width, (4 * height) / 5 - rand, width / 20, height, "#aa0114"));
		obstacles_top[obstacles_top.length - 1].addVelocity(forward_force);
		obstacles_bottom[obstacles_bottom.length - 1].addVelocity(forward_force);
	} else {
		obstacles_top.push(new Particle(w, 0, width / 20, (2 * height) / 5 - rand, "#aa0114"));
		obstacles_bottom.push(new Particle(w, (4 * height) / 5 - rand, width / 20, height, "#aa0114"));
		obstacles_top[obstacles_top.length - 1].addVelocity(forward_force);
		obstacles_bottom[obstacles_bottom.length - 1].addVelocity(forward_force);
	}
}