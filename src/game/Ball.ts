const BALL_RADIUS = 10;
const BALL_SPEED = 4;
const BALL_COLOR = "#0095DD";

class Ball {
  // Initial position in the center of the canvas
  x = 400;
  y = 300;

  // Velocity in pixels per frame
  vx = BALL_SPEED;
  vy = -BALL_SPEED;

  radius = BALL_RADIUS;

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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
