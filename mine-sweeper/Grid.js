class Grid {
    constructor(rows, cols, pixel, offset, mines, seed) {
        this.rows = rows;
        this.cols = cols;
        this.pixel = pixel;
        this.offset = offset;
        this.mines = mines;
        this.flags = mines;
        this.start = 0;
        this.first_click_done = false;
        this.seed = seed;

        this.matrix = ((new Array(rows)).fill(0)).map(ele => (new Array(cols)).fill(0));
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.matrix[r][c] = new Cell(r, c, this.pixel, this.offset);
            }
        }

        var random_row;
        var random_col;

        randomSeed(this.seed);

        while (this.mines > 0) {
            random_row = Math.floor(random(this.rows));
            random_col = Math.floor(random(this.cols));
            if (!this.matrix[random_row][random_col].mine) {
                this.matrix[random_row][random_col].mine = true;
                this.mines--;
            }
        }

        this.mines = mines;
        var counter;
        var mine_path = "";

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!this.matrix[r][c].mine) {
                    counter = 0;
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (r + i > -1 && r + i < rows && c + j > -1 && c + j < cols && this.matrix[r + i][c + j].mine) {
                                counter++;
                            }
                        }
                    }
                    this.matrix[r][c].number = counter;
                }
            }
        }
    }

    show = () => {
        var count = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (this.matrix[r][c].show()) {
                    this.game_over();
                    return true;
                }
                if (this.matrix[r][c].dug) {
                    count++;
                }
            }
        }
        if ((this.cols * this.rows) - this.mines == count) {
            this.game_over();
            return true;
        }
        return false;
    }

    check_hover = (x, y) => {
        var row = Math.floor((y - this.offset) / this.pixel);
        var col = Math.floor((x - this.offset) / this.pixel);
        if (row > -1 && col > -1 && row < this.matrix.length && col < this.matrix[0].length) {
            this.matrix[row][col].hover();
        }
    }

    left_click = (x, y) => {
        var row = Math.floor((y - this.offset) / this.pixel);
        var col = Math.floor((x - this.offset) / this.pixel);


        if (this.start == 0) {
            this.start = Date.now();
        }

        if (!this.first_click_done) {
            this.first_click(row, col);
        }

        if (row > -1 && col > -1 && row < this.matrix.length && col < this.matrix[0].length) {
            if (!this.matrix[row][col].dug && !this.matrix[row][col].flag) {
                this.matrix[row][col].dug = true;
                if (this.matrix[row][col].number == 0) {
                    this.check_zeros(row, col);
                }
            }
        }
    }

    right_click = (x, y) => {
        if (this.start == 0) {
            this.start = Date.now();
        }

        var row = Math.floor((y - this.offset) / this.pixel);
        var col = Math.floor((x - this.offset) / this.pixel);
        if (row > -1 && col > -1 && row < this.matrix.length && col < this.matrix[0].length) {
            if (!this.matrix[row][col].dug) {
                if (this.matrix[row][col].flag) {
                    this.matrix[row][col].flag = false;
                    this.flags++;
                } else if (this.flags > 0) {
                    this.matrix[row][col].flag = true;
                    this.flags--;
                }
            }
        }
    }

    game_over = () => {
        clear();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.matrix[r][c].dug = true;
                this.matrix[r][c].show();
            }
        }
    }

    check_zeros = (r, c) => {
        if (r - 1 > -1 && !this.matrix[r - 1][c].dug) {
            this.matrix[r - 1][c].dug = true;
            if (this.matrix[r - 1][c].flag) {
                this.matrix[r - 1][c].flag = false;
                this.flags++;
            }
            if (this.matrix[r - 1][c].number == 0) {
                this.check_zeros(r - 1, c);
            }
        }

        if (r + 1 < rows && !this.matrix[r + 1][c].dug) {
            this.matrix[r + 1][c].dug = true;
            if (this.matrix[r + 1][c].flag) {
                this.matrix[r + 1][c].flag = false;
                this.flags++;
            }
            if (this.matrix[r + 1][c].number == 0) {
                this.check_zeros(r + 1, c);
            }
        }

        if (c - 1 > -1 && !this.matrix[r][c - 1].dug) {
            this.matrix[r][c - 1].dug = true;
            if (this.matrix[r][c - 1].flag) {
                this.matrix[r][c - 1].flag = false;
                this.flags++;
            }
            if (this.matrix[r][c - 1].number == 0) {
                this.check_zeros(r, c - 1);
            }
        }

        if (c + 1 < cols && !this.matrix[r][c + 1].dug) {
            this.matrix[r][c + 1].dug = true;
            if (this.matrix[r][c + 1].flag) {
                this.matrix[r][c + 1].flag = false;
                this.flags++;
            }
            if (this.matrix[r][c + 1].number == 0) {
                this.check_zeros(r, c + 1);
            }
        }
    }

    first_click = (r, c) => {
        var rnd_r = Math.floor(random(this.rows));
        var rnd_c = Math.floor(random(this.cols));

        if (this.matrix[r][c].mine) {
            while (this.matrix[rnd_r][rnd_c].mine) {
                rnd_r = Math.floor(random(this.rows));
                rnd_c = Math.floor(random(this.cols));
            }

            this.matrix[rnd_r][rnd_c].mine = true;
            this.matrix[rnd_r][rnd_c].number = -1;
            this.matrix[r][c].mine = false;
            this.matrix[r][c].number = 0;


            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (rnd_r + i > -1 && rnd_r + i < this.rows && rnd_c + j > -1 && rnd_c < this.cols) {
                        if (!this.matrix[rnd_r + i][rnd_c + j].mine) {
                            this.matrix[rnd_r + i][rnd_c + j].number++;
                        }
                    }

                    if (r + i > -1 && r + i < this.rows && c + j > -1 && c < this.cols) {
                        if (!this.matrix[r + i][c + j].mine) {
                            this.matrix[r + i][c + j].number--;
                        } else {
                            this.matrix[r][c].number++;
                        }
                    }
                }
            }
        }
    }
}

// todo... 
// replacing the mine doesn't work
// lower all the numbers and also get a number for the current mine

// make sure to do this...