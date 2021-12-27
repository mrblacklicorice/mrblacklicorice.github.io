class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.x = col * w;
        this.y = row * w;
        this.top = true;
        this.right = true;
        this.left = true;
        this.bottom = true;
        this.visited = false;
        this.done = false;
        this.target = false;
        this.deadend = false;
        this.posspath = false;
    }
    show = () => {
        if (this.visited) context.fillStyle = '#BF0A30';
        if (this.done) context.fillStyle = '#90ee90';
        if (this.target) context.fillStyle = 'gold';
        if (this.posspath && !this.deadend) context.fillStyle = 'white';
        if (current.row == this.row && current.col == this.col) context.fillStyle = '#296D98';
        context.fillRect(this.x, this.y, w, w);

        if (this.top) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.x + w, this.y);
            context.stroke();
        }

        if (this.right) {
            context.beginPath();
            context.moveTo(this.x + w, this.y);
            context.lineTo(this.x + w, this.y + w);
            context.stroke();
        }

        if (this.left) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.x, this.y + w);
            context.stroke();
        }

        if (this.bottom) {
            context.beginPath();
            context.moveTo(this.x, this.y + w);
            context.lineTo(this.x + w, this.y + w);
            context.stroke();
        }

        context.fillStyle = '#808080';
    }

    move = () => {
        paths = [];
        if (this.row - 1 >= 0 && !grid[this.row - 1][this.col].visited) {
            paths.push(grid[this.row - 1][this.col]);
        }

        if (this.row + 1 <= rows - 1 && !grid[this.row + 1][this.col].visited) {
            paths.push(grid[this.row + 1][this.col]);
        }

        if (this.col - 1 >= 0 && !grid[this.row][this.col - 1].visited) {
            paths.push(grid[this.row][this.col - 1]);
        }

        if (this.col + 1 <= cols - 1 && !grid[this.row][this.col + 1].visited) {
            paths.push(grid[this.row][this.col + 1]);
        }

        if (paths.length == 0) {
            this.done = true;
            if (routes.length != 0) current = routes.pop();
        } else {
            current = paths[Math.floor(Math.random() * paths.length)];
            current.visited = true;
            ywalls = current.row - this.row;
            xwalls = current.col - this.col;

            switch (ywalls) {
                case 1:
                    this.bottom = false;
                    current.top = false;
                    break;

                case -1:
                    current.bottom = false;
                    this.top = false;
                    break;
            }

            switch (xwalls) {
                case 1:
                    this.right = false;
                    current.left = false;
                    break;

                case -1:
                    current.right = false;
                    this.left = false;
                    break;
            }
            routes.push(this);
        }
    }

    find = () => {
        paths = [];

        if (this.row > 0) {
            if (!this.top && !grid[this.row - 1][this.col].bottom && !grid[this.row - 1][this.col].posspath) {
                paths.push(grid[this.row - 1][this.col]);
            }
        }

        if (this.row < rows - 1) {
            if (!this.down && !grid[this.row + 1][this.col].top && !grid[this.row + 1][this.col].posspath) {
                paths.push(grid[this.row + 1][this.col]);
            }
        }

        if (this.col > 0) {
            if (!this.left && !grid[this.row][this.col - 1].right && !grid[this.row][this.col - 1].posspath) {
                paths.push(grid[this.row][this.col - 1]);
            }
        }

        if (this.col < cols - 1) {
            if (!this.right && !grid[this.row][this.col + 1].left && !grid[this.row][this.col + 1].posspath) {
                paths.push(grid[this.row][this.col + 1]);
            }
        }

        if (paths.length == 0) {
            this.deadend = true;
            if (routes.length != 0) current = routes.pop();
        } else {
            current = paths[Math.floor(Math.random() * paths.length)];
            current.posspath = true;
            routes.push(this);
        }
    }
}

alert('Welcome to my maze generation - user completion - computer solution algorithm!');
var rows = Math.ceil(parseInt(prompt('How many rows should the maze have?', 20)));
var cols = Math.ceil(parseInt(prompt('How many columns should the maze have?', 20)));
var w = Math.ceil(parseInt(prompt('How big should each cell be(px)? Min:10px', 25)));
if (w < 10) w = 10;
var c = document.getElementById('Canvas');
c.width = cols * w;
c.height = rows * w;
c.style.position = 'absolute';
if ((window.innerHeight - c.height) / 2 >= 0) {
    c.style.top = (window.innerHeight - c.height) / 2 + 'px';
} else {
    c.style.top = 0 + 'px';
}
if ((window.innerWidth - c.width) / 2 >= 0) {
    c.style.left = (window.innerWidth - c.width) / 2 + 'px';
} else {
    c.style.left = 0 + 'px';
}
var caption = document.getElementById('captions');
caption.hidden = false;
caption.style.position = 'absolute';
caption.style.left = c.style.left;
caption.style.top = parseInt(c.style.top) + c.height + 'px';
var context = c.getContext('2d');
context.fillStyle = '#808080';
context.fillRect(0, 0, c.width, c.height);

var charplay = false;
var previous;
var lastnum = 0;
var counter = 0;
var mazedone = false;
var grid = ((new Array(cols)).fill(0)).map(ele => (new Array(rows)).fill(0));
var ywalls;
var xwalls;
var id;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        grid[row][col] = new Cell(row, col);
    }
}

var routes = new Array();
var paths = new Array();
var randomx = Math.floor(Math.random() * rows);
var randomy = Math.floor(Math.random() * cols);
var current = grid[randomx][randomy];
var targetcell;
current.visited = true;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        grid[row][col].show();
    }
}

generator();

function generator() {
    current.move();
    mazedone = true;
    counter = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!grid[row][col].done && mazedone) mazedone = false;
            if (cols * rows < 1000) grid[row][col].show();
            if (grid[row][col].done) counter++;
        }
    }

    if (counter % (rows * cols / 100) == 0 && lastnum != counter / (rows * cols / 100)) {
        lastnum = counter / (rows * cols / 100);
        document.getElementById('progress').value = counter / (rows * cols / 100);
    }

    if (mazedone) {
        targetcell = grid[Math.floor(Math.random() * rows)][Math.floor(Math.random() * cols)];
        targetcell.target = true;
        targetcell.show();
        document.getElementById('progress').hidden = true;
        options();
    } else {
        if (cols * rows < 1000) {
            requestAnimationFrame(generator);
        } else {
            setTimeout(function () {
                generator();
            }, 1);
        }
    }
}

document.addEventListener('keydown', function (event) {
    if (charplay) {
        if (event.key == "ArrowUp") {
            if (!current.top && !grid[current.row - 1][current.col].bottom) {
                previous = current;
                current = grid[current.row - 1][current.col];
                current.show();
                previous.show();
                counter++;
            }
        } else if (event.key == "ArrowDown") {
            if (!current.down && !grid[current.row + 1][current.col].top) {
                previous = current;
                current = grid[current.row + 1][current.col];
                current.show();
                previous.show();
                counter++;
            }
        } else if (event.key == "ArrowLeft") {
            if (!current.left && !grid[current.row][current.col - 1].right) {
                previous = current;
                current = grid[current.row][current.col - 1];
                current.show();
                previous.show();
                counter++;
            }
        } else if (event.key == "ArrowRight") {
            if (!current.right && !grid[current.row][current.col + 1].left) {
                previous = current;
                current = grid[current.row][current.col + 1];
                current.show();
                previous.show();
                counter++;
            }
        }

        document.getElementById('label').innerHTML = 'Moves: ' + counter;

        if (current.target) {
            options();
        }
    }

    if (targetcell && event.key == 'o') {
        if (id != null) cancelAnimationFrame(id);
        options();
    }
});

function options() {
    whatplay = prompt('Enter 1 for user to solve or enter 2 for the computer to solve.\nPress [o] anytime to open these options');
    routes = [];
    counter = 0;
    document.getElementById('label').innerHTML = 'Moves: ' + counter;
    if (whatplay == '1') {
        charplay = true;
        current = grid[randomx][randomy];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid[row][col].posspath = false;
                grid[row][col].deadend = false;
                grid[row][col].show();
            }
        }
        alert('Use Arrows to move player(blue) and reach the target(gold) to end');
    } else if (whatplay == '2') {
        current = grid[randomx][randomy];
        charplay = false;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid[row][col].posspath = false;
                grid[row][col].deadend = false;
                grid[row][col].show();
            }
        }
        computersolves();
    }
}

function computersolves() {
    current.posspath = true;
    current.find();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid[row][col].show();
        }
    }
    document.getElementById('label').innerHTML = 'Moves: ' + routes.length;
    if (current == targetcell) {
        options();
    } else {
        if (cols * rows < 1000) {
            id = requestAnimationFrame(computersolves);
        } else {
            setTimeout(function () {
                computersolves();
            }, 1);
        }
    }
}