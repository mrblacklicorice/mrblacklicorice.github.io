class Tile {

    constructor(i, j, c, l, s) {
        this.i = i;
        this.j = j;
        this.c = c;
        this.l = l;
        this.s = s;
        this.x = i * l;
        this.y = j * l;
        this.ships = [0, 5, 4, 3, 3, 2];
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

        if (this.c == 1) {
            fill("#316879");
            ellipse(this.x + Math.floor(this.l / 2), this.y + Math.floor(this.l / 2), 2 * Math.floor(this.l / 3), 2 * Math.floor(this.l / 3));
        }
    }

    click = () => {
        if (this.c == 0) {
            this.c = 1;
            return true;
        }
        return false;
    }
}