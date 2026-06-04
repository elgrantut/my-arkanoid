const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 8;
const PADDLE_COLOR = "#0095DD";

class Paddle {
  // Initial position in the bottom center of the canvas
  x = 350;
  y = 560;

  width = PADDLE_WIDTH;
  height = PADDLE_HEIGHT;

  speed = PADDLE_SPEED;

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  update(canvasWidth: number) {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = PADDLE_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Paddle;
