class AI {
    constructor(pixel, canvas) {
        this.width = pixel * 4;
        this.height = pixel * 24;
        this.int_height = this.height
        this.score = 0;
        this.multiplier = 1;
        this.x = (this.width * 3);
        this.y = (canvas.height / 2 - this.height / 2);
        this.c = canvas;
        this.speed = 2/5 * pixel;
        this.pixel = pixel;
    }
    show = (context) => {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    move = (Ball) => {
        if (Math.sign(Ball.xv) == -1) {
            if (this.y > 0 && Ball.y < this.y + this.height / 2 && Ball.x < this.c.width / 2) this.y -= this.pixel * this.speed;
            if (this.y < this.c.height - this.height && Ball.y > this.y + this.height / 2 && Ball.x < this.c.width / 2) this.y += this.pixel * this.speed;
        }
    }
}