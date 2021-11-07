class Tile {
    constructor(x, y, l, c, o, i) {
        // [none, I, J, L, S, Z, O, T]
        // [  0 , 1, 2, 3, 4, 5, 6, 7]
        this.i = i;
        this.o = o;
        this.x = x;
        this.x_pos = x * l + (31 * o);
        this.y = y;
        this.y_pos = y * l + o;
        this.l = l;
        this.c = c;
        this.r = 40000;

        this.r_d =
            [
                [
                    [[+1, -2], [+2, +1], [-1, +2], [-2, -1]],
                    [[+0, -1], [+1, +0], [+0, +1], [-1, +0]],
                    [[-1, +0], [+0, -1], [+1, +0], [+0, +1]],
                    [[-2, +1], [-1, -2], [+2, -1], [+1, +2]]
                ],
                [
                    [[+1, -1], [+1, +1], [-1, +1], [-1, -1]],
                    [[+0, +0], [+0, +0], [+0, +0], [+0, +0]],
                    [[-1, +1], [-1, -1], [+1, -1], [+1, +1]],
                    [[+2, +0], [+0, +2], [-2, +0], [+0, -2]]
                ],
                [
                    [[+1, -1], [+1, +1], [-1, +1], [-1, -1]],
                    [[+0, +0], [+0, +0], [+0, +0], [+0, +0]],
                    [[-1, +1], [-1, -1], [+1, -1], [+1, +1]],
                    [[+0, +2], [-2, +0], [+0, -2], [+2, +0]]
                ],
                [
                    [[+1, -1], [+1, +1], [-1, +1], [-1, -1]],
                    [[+0, +0], [+0, +0], [+0, +0], [+0, +0]],
                    [[+1, +1], [-1, +1], [-1, -1], [+1, -1]],
                    [[+0, +2], [-2, +0], [+0, -2], [+2, +0]]
                ],
                [
                    [[-1, +1], [-1, -1], [+1, -1], [+1, +1]],
                    [[+0, +0], [+0, +0], [+0, +0], [+0, +0]],
                    [[+1, +1], [-1, +1], [-1, -1], [+1, -1]],
                    [[+2, +0], [+0, +2], [-2, +0], [+0, -2]]
                ],
                [

                ],
                [
                    [[+1, -1], [+1, +1], [-1, +1], [-1, -1]],
                    [[+0, +0], [+0, +0], [+0, +0], [+0, +0]],
                    [[-1, +1], [-1, -1], [+1, -1], [+1, +1]],
                    [[+1, +1], [-1, +1], [-1, -1], [+1, -1]],
                ]
            ]
    }

    shift = (x, y) => {
        this.x += x;
        this.y += y;

        this.x_pos = this.x * this.l + (31 * this.o);
        this.y_pos = this.y * this.l + this.o;
    }

    show = () => {
        var colors = ["#666666", "#00f0f1", "#0001ed", "#f09f06", "#00f100", "#f10100", "#f2ee07", "#a100f3"];
        var colors_bor = ["#444444", "#00d9db", "#0000de", "#dd9202", "#00dd00", "#df0103", "#d7d500", "#8e00df"];
        fill(colors[this.c]);

        // noStroke();
        // strokeWeight((this.c == 0) ? 0 : 1);
        strokeWeight(1);
        stroke(colors_bor[this.c]);
        rect(this.x_pos, this.y_pos, this.l, this.l);
    }

    rotate = () => {
        if (this.c == 6) {
            this.r = this.r + 1;
            return;
        }
        var temp_cord = this.r_d[this.c - 1][this.i][this.r % 4];

        this.shift(temp_cord[0], temp_cord[1]);
        this.r = this.r + 1;
    }

    inv_rotate = () => {
        if (this.c == 6) {
            this.r = Math.abs((this.r - 1) % 4);
            return;
        }
        this.r = (this.r - 1);

        var temp_cord = this.r_d[this.c - 1][this.i][this.r % 4];

        // console.log(temp_cord);

        this.shift(-temp_cord[0], -temp_cord[1]);
        // this.r = Math.abs((this.r - 1) % 4);
    }
}
