var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
canvas.width = window.innerHeight - 20;
canvas.height = window.innerHeight - 20;
canvas.style.position = 'absolute';
canvas.style.padding = '10px';
canvas.style.left = '0px';
canvas.style.top = '0px';

document.getElementsByClassName('menu')[0].style.width = (window.innerWidth - window.innerHeight) + 'px';

settings = new Object();
settings.scale = 50;
settings.xf = 0;
settings.yf = 0;
settings.pixel = canvas.height / 128;
settings.orig_amp = 1;
settings.orig_fre = 1;
settings.octaves = 8;
settings.persistence = 0.5;
settings.lacunarity = 2;
settings.speed = 10;
settings.noise_type = "perlin";
settings.height_type = "absolute";
settings.seed = Math.ceil(Math.random() * 65536);
var max, min;
noise.seed(settings.seed);
document.getElementById('seed_in').value = settings.seed;
document.getElementById('seed_out').innerHTML = settings.seed;
var arr = new Array();
settings.colors = ['#0f5e9c', '#2389da', '#1ca3ec', '#d2b98b', '#88ab55', '#569944', '#337755', '#6e6a61', '#625a56', '#c3c4ba', '#dddde3'];
settings.values = [0.29, 0.33, 0.35, 0.38, 0.47, 0.55, 0.64, 0.77, 0.88, 0.98, 1.00];

var colorarray;

for (let i = 0; i < settings.values.length; i++) {
    document.getElementById(i + 'c').value = settings.colors[i];
    document.getElementById(i + 'n').value = settings.values[i];
}

main();

document.getElementById('generate').addEventListener('click', function () {
    this.setAttribute("disabled", "true");
    settings.scale = parseFloat(document.getElementById('scale_in').value);
    settings.xf = Math.round(parseFloat(document.getElementById('xf').value));
    settings.yf = Math.round(parseFloat(document.getElementById('yf').value));
    settings.pixel = parseFloat(canvas.height / document.getElementById('pixel_in').value);
    settings.orig_amp = parseFloat(document.getElementById('amplitude_in').value);
    settings.orig_fre = parseFloat(document.getElementById('frequency_in').value);
    settings.octaves = parseFloat(document.getElementById('octaves_in').value);
    settings.persistence = parseFloat(document.getElementById('persistence_in').value) / 10;
    settings.lacunarity = parseFloat(document.getElementById('lacunarity_in').value);
    settings.speed = parseFloat(document.getElementById('speed_in').value);
    settings.seed = parseFloat(document.getElementById('seed_in').value);
    settings.noise_type = document.getElementById("noise").value;
    settings.height_type = document.getElementById("height").value;
    for (let i = 0; i < settings.values.length; i++) {
        settings.colors[i] = document.getElementById(i + 'c').value;
        settings.values[i] = document.getElementById(i + 'n').value;
    }
    noise.seed(settings.seed);
    main();
});

document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
        settings.yf -= settings.speed;
        main();
        document.getElementById('xf').value = settings.xf;
        document.getElementById('yf').value = settings.yf;
    } else if (event.key == "ArrowDown") {
        settings.yf += settings.speed;
        main();
        document.getElementById('xf').value = settings.xf;
        document.getElementById('yf').value = settings.yf;
    } else if (event.key == "ArrowRight") {
        settings.xf += settings.speed;
        main();
        document.getElementById('xf').value = settings.xf;
        document.getElementById('yf').value = settings.yf;
    } else if (event.key == "ArrowLeft") {
        settings.xf -= settings.speed;
        main();
        document.getElementById('xf').value = settings.xf;
        document.getElementById('yf').value = settings.yf;
    }
});

function main() {
    colorarray = new Array(Math.round(canvas.width / settings.pixel));
    for (let i = 0; i < colorarray.length; i++) {
        colorarray[i] = new Array(Math.round(canvas.height / settings.pixel));
    }

    arr = new Array();

    for (var x = 0; x < canvas.width / settings.pixel; x++) {
        for (var y = 0; y < canvas.height / settings.pixel; y++) {
            var amplitude = settings.orig_amp;
            var frequency = settings.orig_fre;
            colorarray[x][y] = 0;
            for (let o = 0; o < settings.octaves; o++) {
                if (settings.noise_type == "perlin") {
                    colorarray[x][y] += noise.perlin2((x + settings.xf) / settings.scale * frequency, (y + settings.yf) / settings.scale * frequency) * amplitude;
                } else if (settings.noise_type == "simplex") {
                    colorarray[x][y] += noise.simplex2((x + settings.xf) / settings.scale * frequency, (y + settings.yf) / settings.scale * frequency) * amplitude;
                }
                amplitude *= settings.persistence;
                frequency *= settings.lacunarity;
            }
            arr.push(colorarray[x][y]);
        }
    }
    if (settings.height_type == 'absolute') {
        min = -1;
        max = 1;
    } else if (settings.height_type == 'relative') {
        max = arr.reduce(function (a, b) {
            return Math.max(a, b);
        });

        min = arr.reduce(function (a, b) {
            return Math.min(a, b);
        });
    }

    for (var x = 0; x < canvas.width / settings.pixel; x++) {
        for (var y = 0; y < canvas.height / settings.pixel; y++) {
            colorarray[x][y] = map(colorarray[x][y], min, max, 0, 1);
            context.fillStyle = color(colorarray[x][y]);
            context.fillRect(x * settings.pixel, y * settings.pixel, settings.pixel, settings.pixel);
        }
    }
    document.getElementById('generate').removeAttribute("disabled");
}

function shift() {

}

function map(input, rmin, rmax, min, max) {
    return (input - rmin) * (max - min) / (rmax - rmin) + min;
}

function color(v) {
    var col = settings.colors[0];
    for (let i = 0; i < settings.values.length; i++) {
        if (v > settings.values[i]) {
            col = settings.colors[i];
        } else {
            return col;
        }
    }
    return col;
}

document.getElementById("save").addEventListener("click", function () {
    document.getElementById("generate").click();
    settings.pixel = canvas.height / settings.pixel;
    var blob = new Blob([JSON.stringify(settings)], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${prompt("Enter a file name", "noise_generation_settings")}.json`);
    settings.pixel = canvas.height / settings.pixel;
});

document.getElementById("load").addEventListener("click", function () {
    document.getElementById("file_upload").click();
});

document.getElementById("file_upload").addEventListener("change", function () {
    if (this.value) {
        let reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function () {
            settings = JSON.parse(reader.result);

            for (let i = 0; i < settings.values.length; i++) {
                document.getElementById(i + 'c').value = settings.colors[i];
                document.getElementById(i + 'n').value = settings.values[i];
            }

            document.getElementById('xf').value = String(settings.xf);
            document.getElementById('yf').value = String(settings.yf);
            document.getElementById('pixel_in').value = settings.pixel;
            document.getElementById('pixel_out').innerHTML = String(settings.pixel);
            document.getElementById('amplitude_in').value = settings.orig_amp;
            document.getElementById('amplitude_out').innerHTML = String(settings.orig_amp);
            document.getElementById('frequency_in').value = settings.orig_fre;
            document.getElementById('frequency_out').innerHTML = String(settings.orig_fre);
            document.getElementById('persistence_in').value = settings.persistence * 10;
            document.getElementById('persistence_out').innerHTML = String(settings.persistence);
            document.getElementById('noise').value = settings.noise_type;
            document.getElementById('height').value = settings.height_type;
            settings.pixel = canvas.height / settings.pixel;

            update(["scale", "octaves", "lacunarity", "speed", "seed"]);

            noise.seed(settings.seed);
            main();
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
    }
});

function update(input) {
    for (let i = 0; i < input.length; i++) {
        document.getElementById(`${input[i]}_in`).value = settings[input[i]];
        document.getElementById(`${input[i]}_out`).innerHTML = String(settings[input[i]]);
    }
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