class Snowflake {
    constructor(element, speed, xPos, yPos) {
        this.element = element;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = 1;
        this.counter = 0;
        this.side = Math.random() < 0.5 ? 1 : -1;

        this.element.style.opacity = '0';
    }

    update() {
        this.counter += this.speed / 5000;
        this.xPos += (this.side * this.speed * Math.cos(this.counter)) / 40;
        this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
        this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);
        this.element.style.opacity = `${Math.random()}`;
        this.element.style.transform = `translate3d(${Math.round(this.xPos)}px, ${Math.round(this.yPos)}px, 0) scale(${
            this.scale
        }, ${this.scale})`;
    }
}

export default Snowflake;
