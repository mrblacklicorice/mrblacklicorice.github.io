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
        this.speed = 2 * pixel * 1 / Math.abs(this.xv);
        this.pixel = pixel;
        this.c = canvas;
    }

    show = (context) => {
        context.shadowOffsetX = -1*this.xv;
        context.shadowOffsetY = -1*this.yv;
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    };

    move = (Player, Computer, Canvas, Powerups, ball_array,powerhit) => {
        //sides of canvas
        if (this.y <= 0 || this.y + this.height >= Canvas.height) {

            if (Math.round(Math.random()) == 0) {
                this.first_audio.play();
            } else {
                this.second_audio.play();
            }
            if (this.y < 0) this.y = 0;
            if (this.y + this.height > Canvas.height) this.y = Canvas.height - (this.height);

            this.speed *= 0.98;
            this.yv *= -1;

            this.yv += (Math.random() * 0.02) - 0.01;
            this.xv += (Math.random() * 0.02) - 0.01;
        }
        // this.x <= 0 || this.x + this.width >= Canvas.width  Use this for a bouncing ball//

        //Computer 
        if (this.x <= Computer.width + Computer.x && this.x + this.width >= Computer.x && this.y + this.height >= Computer.y && this.y <= Computer.y + Computer.height) {
            if (Math.round(Math.random()) == 0) {
                this.first_audio.play();
            } else {
                this.second_audio.play();
            }
            this.xv *= -1;
            if (this.y < Computer.y + (Computer.height / 4) || this.y > Computer.y + (3 * Computer.height / 4)) this.yv = -(((Computer.y + (Computer.height / 2)) - (this.y + (this.height / 2))) / (Computer.height / 2));

            //side of paddle
            if (this.x <= this.pixel + Computer.x && this.x + this.width >= Computer.x) {
                this.x = Computer.x + Computer.width + 1;
                this.speed *= 1.1;
            }

            //top of paddle
            else if ((Computer.y + this.pixel) >= this.y + this.height) {
                this.y = Computer.y - this.height;
                if (Math.sign(this.yv) != -1) this.yv *= -1;
                this.speed *= 1.2;
            }

            //bottom of paddle
            else if ((Computer.y + Computer.height - this.pixel) < this.y) {
                this.y = Computer.y + Computer.height;
                if (Math.sign(this.yv) != +1) this.yv *= -1;
                this.speed *= 1.2;
            }

            this.yv += (Math.random() * 0.02) - 0.01;
            this.xv += (Math.random() * 0.02) - 0.01;
        }

        //Player
        if (this.x + this.width >= Player.x && this.x <= Player.width + Player.x && this.y + this.height >= Player.y && this.y <= Player.y + Player.height) {
            if (Math.round(Math.random()) == 0) {
                this.first_audio.play();
            } else {
                this.second_audio.play();
            }
            this.xv *= -1;
            if (this.y < Player.y + (Player.height / 4) || this.y > Player.y + (3 * Player.height / 4)) this.yv = -(((Player.y + (Player.height / 2)) - (this.y + (this.height / 2))) / (Player.height / 2));

            //side of the paddle
            if (this.x + this.width >= Player.x && this.x <= Player.x + this.pixel) {
                this.x = Player.x - this.width;
                this.speed *= 1.1;
            }

            //top of paddle
            else if ((Player.y + this.pixel) >= this.y + this.height) {
                this.y = Player.y - this.height;
                if (Math.sign(this.yv) != -1) this.yv *= -1;
                this.speed *= 1.2;
            }

            //bottom of paddle
            else if ((Player.y + Player.width - this.pixel) < this.y) {
                this.y = Player.y + Player.height;
                if (Math.sign(this.yv) != +1) this.yv *= -1;
                this.speed *= 1.2;
            }

            this.yv += (Math.random() * 0.02) - 0.01;
            this.xv += (Math.random() * 0.02) - 0.01;
        }

        //Powerups
        for (let i = 0; i < Powerups.length; i++) {
            if (this.x + this.width > Powerups[i].x && this.x < Powerups[i].x + Powerups[i].width && this.y + this.height > Powerups[i].y && this.y < Powerups[i].y + Powerups[i].height) {
                powerhit.play();
                if (Powerups[i].type == 1) {
                    ball_array.push(new Ball(this.pixel, this.c));
                } else if (Powerups[i].type == 2) {
                    if (Math.sign(this.xv) == +1) Computer.height = Computer.height * 1.5;
                    if (Math.sign(this.xv) == -1) Player.height = Player.height * 1.5;
                } else if(Powerups[i].type == 3){
                    if (Math.sign(this.xv) == +1) Computer.multiplier *= 2;
                    if (Math.sign(this.xv) == -1) Player.multiplier *= 2;
                }

                //delete the powerup after use
                Powerups.splice(i, 1);
            }
        }

        //Movement
        this.y += this.yv * this.speed;
        this.x += this.xv * this.speed;
    };
}