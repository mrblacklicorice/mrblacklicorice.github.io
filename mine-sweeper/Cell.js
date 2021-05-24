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
                fill("#b266b2");
                result = true;
            } else {
                if ((this.row_id + this.col_id) % 2 == 1) {
                    fill('#f47a60');
                } else {
                    fill('#dc664e');
                }


            }
        } else {
            if ((this.row_id + this.col_id) % 2 == 1) {
                fill('#316879');
            } else {
                fill('#447a8b');
            }

        }

        // stroke("black");
        noStroke();
        // strokeWeight(1);
        rect(this.x, this.y, this.pixel, this.pixel);
        if (this.dug && !this.mine && this.number != 0) {
            fill('#ffd3c8');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(pixel / 1.5);
            text(this.number, this.x + (this.pixel / 2), this.y + (this.pixel / 2));
        }
        if (this.flag) {
            fill('#ffe9e3');
            noStroke();
            ellipse(this.x + (this.pixel / 2), this.y + (this.pixel / 2), pixel / 2);
        }
        return result;
    }

    hover = () => {
        noFill();
        stroke("#254550");
        strokeWeight(3);

        rect(this.x, this.y, this.pixel, this.pixel);
    }
}

