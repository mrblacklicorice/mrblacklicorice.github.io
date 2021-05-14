class Cell {
    constructor(row_id, col_id, pixel, offset) {
        this.row_id = row_id;
        this.col_id = col_id;
        this.pixel = pixel;
        this.offset = offset;

        this.x = col_id * pixel + offset;
        this.y = row_id * pixel + offset;

        this.mine = false;
        this.dug = false;
        this.flagged = false;
        this.number = -1;
        this.flag = false;
    }

    show = () => {
        var result = false;
        if (this.dug) {
            if (this.mine) {
                fill("#c96b6b");
                result = true;
            } else {
                fill('#414d40');
            }
        } else {
            fill('#add1a9');
        }

        stroke("black");
        strokeWeight(1);
        rect(this.x, this.y, this.pixel, this.pixel);
        if (this.dug && !this.mine && this.number != 0) {
            fill('#ed225d');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(pixel / 2);
            text(this.number, this.x + (this.pixel / 2), this.y + (this.pixel / 2));
        }
        if (this.flag) {
            fill('#ed225d');
            noStroke();
            ellipse(this.x + (this.pixel / 2), this.y + (this.pixel / 2), pixel / 2);
        }
        return result;
    }

    hover = () => {
        noFill();
        stroke("grey");
        strokeWeight(3);

        rect(this.x, this.y, this.pixel, this.pixel);
    }
}

