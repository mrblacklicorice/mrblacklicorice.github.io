var scale = 50;
var xf = 0;
var yf = 0;
var pixel;
var orig_amp = 1;
var orig_fre = 1;
var octaves = 8;
var persistence = 0.5;
var lacunarity = 2;
var speed = 10;
var noise_type = "perlin";
var height_type = "absolute";
var seed = Math.ceil(Math.random() * 65536);
var max,min;
noise.seed(seed);
document.getElementById('seed_in').value = seed;
document.getElementById('seed_out').innerHTML = seed;
var arr = [];
var colors = ['#0f5e9c', '#2389da', '#1ca3ec', '#d2b98b', '#88ab55', '#569944', '#337755', '#6e6a61', '#625a56', '#c3c4ba', '#dddde3'];
var values = [0.29, 0.33, 0.35, 0.38, 0.47, 0.55, 0.64, 0.77, 0.88, 0.98, 1.00];

for (let i = 0; i < values.length; i++) {
    document.getElementById(i + 'c').value = colors[i];
    document.getElementById(i + 'n').value = values[i];
}

var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
canvas.width = window.innerHeight - 20;
canvas.height = window.innerHeight - 20;
pixel = canvas.height / 128;
canvas.style.position = 'absolute';
canvas.style.padding = '10px';
canvas.style.left = '0px';
canvas.style.top = '0px';

document.getElementsByClassName('menu')[0].style.width = (window.innerWidth - window.innerHeight) + 'px';

main();

document.getElementById('generate').addEventListener('click', function () {
    this.setAttribute("disabled", "true");
    scale = parseFloat(document.getElementById('scale_in').value);
    xf = Math.round(parseFloat(document.getElementById('xf').value));
    yf = Math.round(parseFloat(document.getElementById('yf').value));
    pixel = parseFloat(canvas.height / document.getElementById('pixel_in').value);
    orig_amp = parseFloat(document.getElementById('amplitude_in').value);
    orig_fre = parseFloat(document.getElementById('frequency_in').value);
    octaves = parseFloat(document.getElementById('octaves_in').value);
    persistence = parseFloat(document.getElementById('persistence_in').value) / 10;
    lacunarity = parseFloat(document.getElementById('lacunarity_in').value);
    speed = parseFloat(document.getElementById('speed_in').value);
    seed = parseFloat(document.getElementById('seed_in').value);
    noise_type = document.getElementById("noise").value;
    height_type = document.getElementById("height").value;
    for (let i = 0; i < values.length; i++) {
        colors[i] = document.getElementById(i + 'c').value;
        values[i] = document.getElementById(i + 'n').value;
    }
    noise.seed(seed);
    main();
});

document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
        yf -= speed;
        main();
        document.getElementById('xf').value = xf;
        document.getElementById('yf').value = yf;
    } else if (event.key == "ArrowDown") {
        yf += speed;
        main();
        document.getElementById('xf').value = xf;
        document.getElementById('yf').value = yf;
    } else if (event.key == "ArrowRight") {
        xf += speed;
        main();
        document.getElementById('xf').value = xf;
        document.getElementById('yf').value = yf;
    } else if (event.key == "ArrowLeft") {
        xf -= speed;
        main();
        document.getElementById('xf').value = xf;
        document.getElementById('yf').value = yf;
    }
});

function main() {
    var colorarray = new Array(Math.round(canvas.width / pixel));
    for (let i = 0; i < colorarray.length; i++) {
        colorarray[i] = new Array(Math.round(canvas.height / pixel));
    }

    arr = [];

    for (var x = 0; x < canvas.width / pixel; x++) {
        for (var y = 0; y < canvas.height / pixel; y++) {
            var amplitude = orig_amp;
            var frequency = orig_fre;
            colorarray[x][y] = 0;
            for (let o = 0; o < octaves; o++) {
                if (noise_type == "perlin") {
                    colorarray[x][y] += noise.perlin2((x + xf) / scale * frequency, (y + yf) / scale * frequency) * amplitude;
                } else if (noise_type == "simplex") {
                    colorarray[x][y] += noise.simplex2((x + xf) / scale * frequency, (y + yf) / scale * frequency) * amplitude;
                }
                amplitude *= persistence;
                frequency *= lacunarity;
            }
            arr.push(colorarray[x][y]);
        }
    }
    max = arr.reduce(function (a, b) {
        return Math.max(a, b);
    });

    min = arr.reduce(function (a, b) {
        return Math.min(a, b);
    });

    if (height_type == 'absolute') {
        min = -1;
        max = 1;
    }

    for (var x = 0; x < canvas.width / pixel; x++) {
        for (var y = 0; y < canvas.height / pixel; y++) {
            colorarray[x][y] = map(colorarray[x][y], min, max, 0, 1);
            context.fillStyle = color(colorarray[x][y]);
            context.fillRect(x * pixel, y * pixel, pixel, pixel);
        }
    }
    document.getElementById('generate').removeAttribute("disabled");
}

function map(input, rmin, rmax, min, max) {
    return (input - rmin) * (max - min) / (rmax - rmin) + min;
}

function color(v) {
    var col = colors[0];
    for (let i = 0; i < values.length; i++) {
        if (v > values[i]) {
            col = colors[i];
        } else {
            return col;
        }
    }
    return col;
}

//     colorarray[x][y] *= 255;
//     colorarray[x][y] = Math.ceil(colorarray[x][y]);
//     context.fillStyle = '#' + colorarray[x][y].toString(16) + colorarray[x][y].toString(16) + colorarray[x][y].toString(16);

document.getElementById('scale_in').onchange = function () {
    document.getElementById('scale_out').innerHTML = this.value;
}

document.getElementById('pixel_in').onchange = function () {
    document.getElementById('pixel_out').innerHTML = this.value;
}

document.getElementById('amplitude_in').onchange = function () {
    document.getElementById('amplitude_out').innerHTML = this.value;
}

document.getElementById('frequency_in').onchange = function () {
    document.getElementById('frequency_out').innerHTML = this.value;
}

document.getElementById('persistence_in').onchange = function () {
    document.getElementById('persistence_out').innerHTML = this.value / 10;
}

document.getElementById('lacunarity_in').onchange = function () {
    document.getElementById('lacunarity_out').innerHTML = this.value;
}

document.getElementById('speed_in').onchange = function () {
    document.getElementById('speed_out').innerHTML = this.value;
}

document.getElementById('seed_in').onchange = function () {
    document.getElementById('seed_out').innerHTML = this.value;
}

document.getElementById('octaves_in').onchange = function () {
    document.getElementById('octaves_out').innerHTML = this.value;
}