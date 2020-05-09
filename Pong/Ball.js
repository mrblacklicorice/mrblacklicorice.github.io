class Ball {
    constructor(pixel, canvas) {
        this.first_audio = document.getElementById('Audio1');
        this.second_audio = document.getElementById('Audio2');
        this.height = pixel * 5;
        this.width = pixel * 5;
        this.y = (canvas.height / 2) - (this.height / 2);
        this.x = (canvas.width / 2) - (this.width / 2);
        this.xv = Math.sin(((Math.random() * Math.PI / 6) + Math.PI / 6 + ((Math.floor(Math.random() * 4)) * Math.PI / 2)));
        this.yv = Math.sin(((Math.random() * Math.PI / 6) + Math.PI / 6 + ((Math.floor(Math.random() * 4)) * Math.PI / 2)))
        this.speed = 1 * pixel * 1 / Math.abs(this.xv);
        this.pixel = pixel;
        this.c = canvas;
    }
    show = (context) => {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    // (this.x+this.width>Player.x && this.x<Player.x+Player.width&&this.y+this.height>Player.y&&this.y<Player.y+Player.height)||(this.x<Computer.x && this.x+this.width>Computer.x&&this.y+this.height>Computer.y&&this.y<Computer.y+Computer.height)
    move = (Player, Computer, Canvas) => {
        if (this.y <= 0 || this.y + this.height >= Canvas.height || (this.x + this.width > Player.x && this.x < Player.x + Player.width && this.y + this.height > Player.y && this.y < Player.y + Player.height) || (this.x < Computer.x && this.x + this.width > Computer.x && this.y + this.height > Computer.y && this.y < Computer.y + Computer.height)) {

            if (Math.round(Math.random()) == 0) {
                this.first_audio.play();
            } else {
                this.second_audio.play();
            }

            if ((Player.y + (Player.height / 2)) >= this.y + this.height && this.x + this.width > Player.x && this.x < Player.x + Player.width) {
                this.y = Player.y - this.height;
                this.speed *= 1.5;
            } else if ((Player.y + (Player.height / 2)) < this.y && this.x + this.width > Player.x && this.x < Player.x + Player.width) {
                this.y = Player.y + Player.height;
                this.speed *= 1.5;
            } else if ((Computer.y + (Computer.height / 2)) >= this.y + this.height && this.x < Computer.x && this.x + this.width > Computer.x) {
                this.y = Computer.y - this.height;
                this.speed *= 1.5;
            } else if ((Computer.y + (Computer.height / 2)) < this.y && this.x < Computer.x && this.x + this.width > Computer.x) {
                this.y = Computer.y + Computer.height;
                this.speed *= 1.5;
            }
            if (this.y < 0) this.y = 0;
            if (this.y + this.height > Canvas.height) this.y = Canvas.height - (this.height);

            if (this.y <= 0 || this.y + this.height >= Canvas.height) this.speed *= 0.95;
            this.yv *= -1;

            this.yv += (Math.random() * 0.02) - 0.01;
            this.xv += (Math.random() * 0.02) - 0.01;
        }
        // this.x <= 0 || this.x + this.width >= Canvas.width  Use this for a bouncing ball//
        else if ((this.x <= Computer.width + Computer.x && this.y + this.height >= Computer.y && this.y <= Computer.y + Computer.height && this.x + this.width >= Computer.x) || (this.x + this.width >= Player.x && this.y + this.height >= Player.y && this.y <= Player.y + Player.height && this.x <= Player.width + Player.x)) {

            if (Math.round(Math.random()) == 0) {
                this.first_audio.play();
            } else {
                this.second_audio.play();
            }

            if ((this.x <= Computer.width + Computer.x && this.y + this.height >= Computer.y && this.y <= Computer.y + Computer.height && this.x + this.width >= Computer.x)) this.x = Computer.x + Computer.width + 1;
            if ((this.x + this.width >= Player.x && this.y + this.height >= Player.y && this.y <= Player.y + Player.height && this.x <= Player.width + Player.x)) this.x = Player.x - this.width;

            this.xv *= -1;
            this.speed *= 1.3;

            this.yv += (Math.random() * 0.02) - 0.01;
            this.xv += (Math.random() * 0.02) - 0.01;
        }
        this.y += this.yv * this.speed;
        this.x += this.xv * this.speed;
    };
}