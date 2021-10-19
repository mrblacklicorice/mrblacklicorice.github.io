class Tile {
    constructor(x, y, l, c, o) {
        // [none, I, J, L, S, Z, O, T]
        // [  0 , 1, 2, 3, 4, 5, 6, 7]

        this.offset = o;
        this.x = x;
        this.x_pos = x * l + o;
        this.y = y;
        this.y_pos = y * l + o;
        this.l = l;
        this.c = c;

    }

    shift = (x, y) => {
        this.x += x;
        this.y += y;
    }

    show = () => {
        var colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];
        fill(colors[this.c]);

        // noStroke();
        strokeWeight(1);
        rect(this.x_pos, this.y_pos, this.l, this.l);

    }
}