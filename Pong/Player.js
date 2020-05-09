class Player {
    constructor(pixel, canvas) {
        this.width = pixel * 4;
        this.height = pixel * 24;
        this.score = 0;
        this.x = (canvas.width - this.width * 3);
        this.y = (canvas.height / 2 - this.height / 2);
        this.c = canvas;
        this.speed = 4;
        this.pixel = pixel;
    }
    show = (context) => {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    moveUp = () => {
        if (this.y > 0) this.y -= this.pixel * this.speed;
    }

    moveDown = () => {
        if (this.y < this.c.height - this.height) this.y += this.pixel * this.speed;
    }
}
