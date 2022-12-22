class Tile {

    constructor(i, j, l) {
        this.i = i;
        this.j = j;
        this.l = l;

        this.x = i * l;
        this.y = j * l;

        // phantom
        this.pc = 0;

        this.c = 0;
        this.s = -1;
    }

    show = () => {
        // fill(colors[this.c]);

        // noStroke();
        // strokeWeight((this.c == 0) ? 0 : 1);
        strokeWeight(1);
        // stroke(colors_bor[this.c]);
        fill("white");

        stroke(0);
        rect(this.x, this.y, this.l, this.l);
    }

    showShips = () => {
        if (this.s != -1) {
            strokeWeight(1);
            fill("white");

            stroke(0);
            rect(this.px, this.py, this.l, this.l);
        }
    }

    showPhantomMissles = () => {
        if (this.pc == 1) {
            fill("#f47a60");
            ellipse(this.px + Math.floor(this.l / 2), this.py + Math.floor(this.l / 2), 2 * Math.floor(this.l / 3), 2 * Math.floor(this.l / 3));
        }
    }

    showMissles = () => {
        if (this.c == 1) {
            fill("#316879");
            ellipse(this.x + Math.floor(this.l / 2), this.y + Math.floor(this.l / 2), 2 * Math.floor(this.l / 3), 2 * Math.floor(this.l / 3));
        }
    }

    click = () => {
        if (this.c == 0) {
            this.c = 1;
        }
    }
}