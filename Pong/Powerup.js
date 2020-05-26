class Powerup{
    constructor(pixel,canvas){
        this.width = pixel*10;
        this.height = pixel*10;
        this.x = Math.random()*(canvas.width-this.width);
        this.y = Math.random()*(canvas.height-this.height);
        this.pixel = pixel;
        this.canvas = canvas;
        this.type = Math.ceil(Math.random()*2);
    }
    show = (context) => {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}