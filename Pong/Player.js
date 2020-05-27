class Player {
    constructor(pixel, canvas) {
        this.width = pixel * 4;
        this.height = pixel * 24;
        this.int_height = this.height;
        this.score = 0;
        this.multiplier = 1;
        this.x = (canvas.width - this.width * 3);
        this.y = (canvas.height / 2 - this.height / 2);
        this.c = canvas;
        this.pixel = pixel;
    }
    show = (context) => {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    move = (y) => {
        if (y > 0 && y < this.c.height - this.height) {
            this.y = y;
        }
    }
}