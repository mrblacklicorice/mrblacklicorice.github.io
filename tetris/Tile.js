class Tile {
    constructor(x, y, l, c, o, i) {
        // [none, I, J, L, S, Z, O, T]
        // [  0 , 1, 2, 3, 4, 5, 6, 7]
        this.i = i;
        this.o = o;
        this.x = x;
        this.x_pos = x * l + o;
        this.y = y;
        this.y_pos = y * l + o;
        this.l = l;
        this.c = c;
        this.r = 0;

    }

    shift = (x, y) => {
        this.x += x;
        this.y += y;

        this.x_pos = this.x * this.l + this.o;
        this.y_pos = this.y * this.l + this.o;
    }

    show = () => {
        var colors = ["#777777", "#00ffff", "#0000aa", "#ff7700", "#00ff00", "#ff0000", "#ffff00", "#cc00cc"];
        fill(colors[this.c]);

        // noStroke();
        strokeWeight(1);
        stroke("#000000");
        rect(this.x_pos, this.y_pos, this.l, this.l);

    }

    rotate = () => {

        this.r = (this.r + 1) % 4;

        switch (this.c) {
            case 1:
                switch (this.i) {
                    case 1:
                        switch (this.r) {
                            case 0:
                                this.shift(1, -2);
                                break;
                            case 1:
                                this.shift(+2, +1);
                                break;
                            case 2:
                                this.shift(-1, -1);
                                break;
                            case 3:
                                this.shift(-2, +2);
                                break;
                            default:
                                break;
                        }
                        break;

                    case 2:
                        switch (this.r) {
                            case 0:
                                this.shift(0, -1);
                                break;
                            case 1:
                                this.shift(+1, 0);
                                break;
                            case 2:
                                this.shift(0, +1);
                                break;
                            case 3:
                                this.shift(-1, 0);
                                break;
                            default:
                                break;
                        }
                        break;


                    case 3:
                        switch (this.r) {
                            case 0:
                                this.shift(-1, 0);
                                break;
                            case 1:
                                this.shift(0, -1);
                                break;
                            case 2:
                                this.shift(1, 0);
                                break;
                            case 3:
                                this.shift(0, 1);
                                break;
                            default:
                                break;
                        }
                        break;

                    case 4:
                        switch (this.r) {
                            case 0:
                                this.shift(-2, +1);
                                break;
                            case 1:
                                this.shift(-1, -2);
                                break;
                            case 2:
                                this.shift(+2, -1);
                                break;
                            case 3:
                                this.shift(+1, +2);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }


}