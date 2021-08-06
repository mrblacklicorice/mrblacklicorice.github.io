class Particle {
    constructor(x, y, w, h, c) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.position = createVector(x, y);
        this.w = w;
        this.h = h;
        this.c = c;
        this.mass = 1;
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    addVelocity(velocity) {
        let v = velocity.copy();
        this.velocity.add(v);
    }

    // Method to update position
    update() {
        // this.velocity.mult(0.99);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    // Method to display
    show() {
        fill(this.c);
        rect(this.position.x, this.position.y, this.w, this.h);
    }
}


class Bird extends Particle {
    constructor(x, y, r, c, brain) {
        super(x, y, r, r, c)
        this.r = r;
        this.lift = createVector(0, -5);
        this.score = 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(pipe_bottom, pipe_top) {
        let inputs = [];
        inputs[0] = this.position.y / height;
        inputs[1] = pipe_top.position.y / height;
        inputs[2] = pipe_bottom.position.y / height;
        inputs[3] = pipe_top.position.x / width;
        inputs[4] = this.velocity.y / 10;
        let output = this.brain.predict(inputs);
        //if (output[0] > output[1] && this.velocity >= 0) {
        if (output[0] > output[1]) {
            this.up();
        }
    }

    up() {
        if (this.position.y >= 0) {
            this.velocity.y = 0;
            this.addVelocity(this.lift);
        }
    }

    show() {
        fill(this.c);
        ellipse(this.position.x, this.position.y, this.w, this.h);
    }

    collison(pillar) {
        var distX = Math.abs(this.position.x - pillar.position.x - pillar.w / 2);
        var distY = Math.abs(this.position.y - pillar.position.y - pillar.h / 2);

        if (distX > (pillar.w / 2 + this.r)) { return false; }
        if (distY > (pillar.h / 2 + this.r)) { return false; }

        if (distX <= (pillar.w / 2)) { return true; }
        if (distY <= (pillar.h / 2)) { return true; }

        var dx = distX - pillar.w / 2;
        var dy = distY - pillar.h / 2;
        return (dx * dx + dy * dy <= (this.r * this.r));
    }
}