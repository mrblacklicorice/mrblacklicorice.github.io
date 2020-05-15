var c = document.getElementById("screen");
var context = c.getContext('2d');
var pixel = 5;
var movement;
var score_once = true;
var start = true;
var animation_shown = true;
var point = document.getElementById('Point');
var button = document.getElementById('button');
var y;
c.width = window.innerWidth-((window.innerWidth%pixel)+pixel*6);
c.height = window.innerHeight-((window.innerHeight%pixel)+pixel*6);
// window.innerHeight-((window.innerHeight%pixel)+pixel*6);
pixel = c.width/317;
c.style.position = 'absolute';
c.style.left = ((window.innerWidth / 2) - (c.width / 2)) + 'px';
c.style.top = ((window.innerHeight / 2) - (c.height / 2)) + 'px';
context.lineWidth = 5;
context.font = '50px fantasy';

button.style.backgroundColor = 'black';
button.style.borderWidth = '0px';
button.style.color = 'white';
button.style.fontFamily = 'fantasy';
button.style.position = "absolute";
button.style.fontSize = '25px';
button.width = 1585;
button.height = 915;
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
var ball = new Ball(pixel, c);

context.fillStyle = 'black';
context.fillRect(0, 0, c.width, c.height);

button.addEventListener('click', () => {
    button.hidden = true;
    point.play();
    animation_shown = true;
    body.style.cursor = 'none';
    requestAnimationFrame(Animation);
});

function Animation() {
    drawCanvas();
    Pl.show(context);
    Com.show(context);
    Com.move(ball);
    Pl.move(y);
    if (ball.x < 0 || ball.x + ball.width > c.width) {
        if (score_once) {
            point.play();
            score_once = false;
            if (ball.x < 0) {
                if (Com.speed < 24) Com.speed *= 1.2;
                Pl.score++;
            }
            if (ball.x + ball.width > c.width) {
                if (Com.speed < 24) Com.speed /= 1.2;
                Com.score++;
            }

            setTimeout(function () {
                ball = new Ball(pixel, c);
            }, 500);
        }
    } else {
        score_once = true;
        ball.show(context);
        ball.move(Pl, Com, c);
    }
    if(animation_shown) requestAnimationFrame(Animation);
}

document.addEventListener('mousemove',function (e) {
   y = event.y; 
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

document.addEventListener("keydown",function(event){
    if(event.keyCode == 80){
        animation_shown = false;
        button.hidden = false;
        body.style.cursor = 'auto';
        button.innerHTML = "Press this to continue playing!";
    }
});