class Tile {
    constructor(i, j, b, s, l) {
        this.i = i;
        this.j = j;
        this.b = b;
        this.s = s;
        this.l = l;
        this.x = i * l;
        this.y = j * l;
    }
}