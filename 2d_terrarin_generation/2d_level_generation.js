var scl = 50;
var xf = 0;
var yf = 0;
var pixel = 10;
var sealvl = 0.30;

var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = (Math.floor(window.innerWidth / pixel)) * pixel;
canvas.height = (Math.floor(window.innerHeight / pixel)) * pixel;
canvas.style.position = 'absolute';
canvas.style.padding = '0px';
canvas.style.left = (window.innerWidth - canvas.width) / 2 + 'px';
canvas.style.top = (window.innerHeight - canvas.height) / 2 + 'px';
var context = canvas.getContext('2d');
noise.seed(Math.random());
var colorarray;

main();

document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
        yf -= 10;
        main();
    } else if (event.key == "ArrowDown") {
        yf += 10;
        main();
    } else if (event.key == "ArrowRight") {
        xf += 10;
        main();
    } else if (event.key == "ArrowLeft") {
        xf -= 10;
        main();
    }
});

function main() {
    colorarray = new Array(canvas.width / pixel);
    for (let i = 0; i < colorarray.length; i++) {
        colorarray[i] = new Array(canvas.height / pixel);
    }

    for (var x = 0; x < canvas.width / pixel; x++) {
        for (var y = 0; y < canvas.height / pixel; y++) {
            colorarray[x][y] = map(noise.perlin2((x + xf) / scl, (y + yf) / scl), -1, 1, 0, 1);

            if (colorarray[x][y] < sealvl - 0.06) {
                context.fillStyle = '#0f5e9c';
            } else if (colorarray[x][y] < sealvl - 0.02) {
                context.fillStyle = '#2389da';
            } else if (colorarray[x][y] < sealvl) {
                context.fillStyle = '#1ca3ec';
            } else if (colorarray[x][y] < sealvl + 0.03) {
                context.fillStyle = '#d2b98b';
            } else if (colorarray[x][y] < sealvl + 0.12) {
                context.fillStyle = '#88ab55';
            } else if (colorarray[x][y] < sealvl + 0.2) {
                context.fillStyle = '#569944';
            } else if (colorarray[x][y] < sealvl + 0.29) {
                context.fillStyle = '#438855';
            } else if (colorarray[x][y] < sealvl + 0.42) {
                context.fillStyle = '#337755';
            } else if (colorarray[x][y] < sealvl + 0.53) {
                context.fillStyle = '#888888';
            } else if (colorarray[x][y] < sealvl + 0.63) {
                context.fillStyle = '#bcbcaa';
            } else if (colorarray[x][y] < sealvl + 0.70) {
                context.fillStyle = '#dddde3';
            }
            context.fillRect(x * pixel, y * pixel, pixel, pixel);
        }
    }
    context.fillStyle = 'White';
    context.font = "50px Arial";
    context.fillText("Use Arrow Keys to Move", 0, 40);
}


function map(input, rmin, rmax, min, max) {
    return (input - rmin) * (max - min) / (rmax - rmin) + min;
}

// } else {
//     colorarray[x][y] *= 255;
//     colorarray[x][y] = Math.ceil(colorarray[x][y]);
//     context.fillStyle = '#' + colorarray[x][y].toString(16) + colorarray[x][y].toString(16) + colorarray[x][y].toString(16);