class Powerup{
    constructor(pixel,canvas){
        this.width = pixel*10;
        this.height = pixel*10;
        this.x = Math.random()*(canvas.width-this.width);
        this.y = Math.random()*(canvas.height-this.height);
        this.pixel = pixel;
        this.canvas = canvas;
        this.type = Math.ceil(Math.random()*3);
    }

    show = (context) => {
        context.setLineDash([0]);
        context.fillStyle = 'white';
        context.fillText("+", this.x+this.width/2, this.y+this.height/2);
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}