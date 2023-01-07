class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.h = false;
    }

    show() {
        if (this.h)
            text("H", (this.x * pixel) + (pixel / 2), this.y * pixel + (pixel / 2));
        else
            rect(this.x * pixel, this.y * pixel, pixel, pixel);
    }

    update() {
        this.x += dX;
        this.y += dY;
    }
}