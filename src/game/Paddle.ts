import { PADDLE_CONFIG } from "../config/game";

class Paddle {
  // Initial position in the bottom center of the canvas
  x = 350;
  y = 560;

  width = PADDLE_CONFIG.width;
  height = PADDLE_CONFIG.height;

  speed = PADDLE_CONFIG.speed;

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
    ctx.fillStyle = PADDLE_CONFIG.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Paddle;
