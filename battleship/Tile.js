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
    }
}