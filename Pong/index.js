var c = document.getElementById("screen");
var context = c.getContext('2d');
var pixel = window.innerHeight/210;
var movement;
var score_once = [true];
var start = true;
var animation_shown = true;
var point = document.getElementById('Point');
var button = document.getElementById('button');
c.width = window.innerWidth - ((window.innerWidth % pixel));
c.height = window.innerHeight - ((window.innerHeight % pixel) + pixel * 2);
// window.innerHeight-((window.innerHeight%pixel)+pixel*6);
pixel = c.width / 317;
c.style.position = 'absolute';
c.style.left = ((window.innerWidth / 2) - (c.width / 2)) + 'px';
c.style.top = ((window.innerHeight / 2) - (c.height / 2)) + 'px';
context.lineWidth = 5;
context.font = '50px fantasy';
context.textAlign = "center";
context.textBaseline = "middle";
context.shadowColor = '#999';

button.style.backgroundColor = 'black';
button.style.borderWidth = '0px';
button.style.color = 'white';
button.style.fontFamily = 'fantasy';
button.style.position = "absolute";
button.style.fontSize = '25px';
button.width = '1585px';
button.height = '915px';
button.style.textAlign = 'center';
// button.style.left = ((window.innerWidth / 2) - (button.width / 2)) + 'px';
// button.style.top = ((window.innerHeight / 2) - (button.height / 2)) + 'px';

var back_screen = document.getElementById("back_screen");
back_screen.width = c.width;
back_screen.height = c.height + (pixel * 2);
back_screen.style.position = 'absolute';
back_screen.style.left = ((window.innerWidth / 2) - (back_screen.width / 2)) + 'px';
back_screen.style.top = ((window.innerHeight / 2) - (back_screen.height / 2)) + 'px';
back_screen.style.backgroundColor = 'white';

var Pl = new Player(pixel, c);
var Com = new AI(pixel, c);
var ball = [new Ball(pixel, c)];
var powerup = [new Powerup(pixel, c)];

context.fillStyle = 'black';
context.fillRect(0, 0, c.width, c.height);

button.addEventListener('click', () => {
    button.hidden = true;
    point.play();
    animation_shown = true;
    body.style.cursor = 'none';
    c.style.cursor == 'none';
    requestAnimationFrame(Animation);
});

function Animation() {
    drawCanvas();
    Pl.show(context);
    Com.show(context);
    powerup.forEach((element) => {
        element.show(context);
    });
    for (let i = 0; i < ball.length; i++) {
        if (ball[i].x < 0 || ball[i].x + ball[i].width > c.width) {
            if (score_once[i]) {
                point.play();
                score_once[i] = false;
                if (ball[i].x < 0) {
                    if (Com.speed < 24) Com.speed *= 1.2*Pl.multiplier;
                    Pl.score = Pl.score + (1 * Pl.multiplier);
                    if (Com.multiplier != 1) Com.multiplier = 1;
                    if (Com.height != Com.int_height) Com.height = Com.int_height;
                }
                if (ball[i].x + ball[i].width > c.width) {
                    if (Com.speed < 24) Com.speed /= 1.2*Pl.multiplier;
                    Com.score = Com.score + (1 * Com.multiplier);
                    if (Pl.multiplier != 1) Pl.multiplier = 1;
                    if (Pl.height != Pl.int_height) Pl.height = Pl.int_height;
                }
                if (ball.length <= 1) {
                    setTimeout(function () {
                        powerup.push(new Powerup(pixel, c));
                        ball = [new Ball(pixel, c)];
                        score_once = [true];
                    }, 500);
                } else {
                    ball.splice(i, 1);
                    score_once.splice(i, 1);
                }
            }
        } else {
            Com.move(ball[i]);
            score_once[i] = true;
            ball[i].show(context);
            ball[i].move(Pl, Com, c, powerup, ball, point);
        }
    }

    if (animation_shown) requestAnimationFrame(Animation);
}

document.addEventListener('mousemove', function (e) {
    Pl.move(event.y);
});

function drawCanvas() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, c.width, c.height);
    context.strokeStyle = 'white';
    context.setLineDash([10, 5]);
    context.beginPath();
    context.moveTo((c.width / 2), 0);
    context.lineTo((c.width / 2), c.height);
    context.stroke();
    context.fillStyle = "white";
    context.fillText(String(Com.score), c.width * 1 / 4, 50);
    context.fillText(String(Pl.score), c.width * 3 / 4, 50);
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 80) {
        animation_shown = false;
        button.hidden = false;
        body.style.cursor = 'auto';
        button.innerHTML = "Press this to continue playing!";
    } else if (event.keyCode == 77) {
        console.log('M');
        if (body.style.cursor == 'none') {
            body.style.cursor = 'auto';
        } else {
            body.style.cursor = 'none';
        }
    }
});