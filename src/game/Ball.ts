class Ball {
  x = 400;
  y = 300;

  vx = 4;
  vy = -4;

  radius = 10;

  update(canvasWidth: number, canvasHeight: number) {
    // Calculate ball position and bouncing against the borders
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }
}

export default Ball;
