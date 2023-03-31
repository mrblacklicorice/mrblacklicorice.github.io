let cam;
let ascii = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/${"\\|"}()1{}[]?-_+~<>i!lI;:,"^${"`"}'.`;
var c;

function setup() {
    cam = createCapture(VIDEO);
    cam.size(640, 480);
    console.log(cam.width, cam.height);

    //set the size of the canvas to the size of the webcam feed
    c = createCanvas(cam.width, cam.height);
    c.center();

    document.body.style.background = '#222222';

    document.getElementById("defaultCanvas0").addEventListener("contextmenu", (e) => e.preventDefault());

    cam.hide();
    textSize(12);
    textAlign(CENTER, CENTER);
}

function draw() {
    clear();
    background(255);

    cam.loadPixels();

    for (let i = 0; i < c.height; i += 5) {
        for (let j = 0; j < c.width; j += 5) {
            var index = (i * c.width + j) * 4;

            //get the red, green and blue values from the pixels array
            var r = cam.pixels[index + 0];
            var g = cam.pixels[index + 1];
            var b = cam.pixels[index + 2];

            if (r == undefined || g == undefined || b == undefined) {
                continue;
            }

            fill(r, g, b);

            text(ascii[floor(map((r + g + b) / 3, 0, 255, 0, ascii.length - 1))], j, i);
        }
    }
}