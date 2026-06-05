import { BRICKS_CONFIG } from "@config/game";

class Brick {
  constructor(
    public x: number,
    public y: number,
  ) {}

  destroyed = false;

  width = BRICKS_CONFIG.width;
  height = BRICKS_CONFIG.height;

  draw(ctx: CanvasRenderingContext2D) {
    if (this.destroyed) return;

    ctx.fillStyle = BRICKS_CONFIG.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Brick;
