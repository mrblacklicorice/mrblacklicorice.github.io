class Tile {
    constructor(x, y, c, l, o) {
        this.x = x;
        this.x_pos = x * l + (31 * o);
        this.y = y;
        this.y_pos = y * l + o;
        this.c = c;
        this.l = l;
        this.o = o;
    }

    shift = (x, y) => {
        this.x += x;
        this.y += y;

        this.x_pos = this.x * this.l + (31 * this.o);
        this.y_pos = this.y * this.l + this.o;
    }

    show = () => {
        var colors = ["#0001ed", "#f10100"];
        // console.log(this.c);
        fill(colors[this.c]);

        noStroke();
        rect(this.x_pos, this.y_pos, this.l, this.l);
    }

    move = (x_pos, y_pos) => {
        this.x_pos += x_pos;
        this.y_pos += y_pos;
    }
}
