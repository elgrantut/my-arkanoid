import { CANVAS_CONFIG, BRICKS_CONFIG, WALL_CONFIG } from "@config/game";

import Ball from "./Ball";
import Brick from "./Brick";
import Paddle from "./Paddle";

class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private ball: Ball;
  private paddle: Paddle;
  private bricks: Brick[];

  private leftPressed = false;
  private rightPressed = false;
  private stopRequested = false;

  constructor(containerSelector: string) {
    const container = document.querySelector<HTMLDivElement>(containerSelector);

    if (!container) {
      throw new Error(`Container with selector "${containerSelector}" not found`);
    }

    this.canvas = document.createElement("canvas");
    this.canvas.width = CANVAS_CONFIG.canvasWidth;
    this.canvas.height = CANVAS_CONFIG.canvasHeight;

    container.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.ball = new Ball();
    this.paddle = new Paddle();
    this.bricks = this.createBricks();
  }

  // Listens for keyboard events to move the paddle
  private setupInput() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") this.leftPressed = true;
      if (event.key === "ArrowRight") this.rightPressed = true;
    });

    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft") this.leftPressed = false;
      if (event.key === "ArrowRight") this.rightPressed = false;
    });
  }

  public start() {
    this.setupInput();
    this.loop();
  }

  public stop() {
    this.stopRequested = true;
  }

  private update() {
    if (this.leftPressed) this.paddle.moveLeft();
    if (this.rightPressed) this.paddle.moveRight();

    this.ball.update(this.canvas.width, this.canvas.height);
    this.paddle.update(this.canvas.width);
    this.handleCollisions();
  }

  private render() {
    //Draw the ball
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw(this.context);
    this.paddle.draw(this.context);
    this.bricks.forEach((brick) => brick.draw(this.context));
  }

  private loop() {
    this.update();
    this.render();

    if (!this.stopRequested) {
      requestAnimationFrame(() => this.loop());
    }
  }

  private createBricks() {
    const bricks: Brick[] = [];

    for (let row = 0; row < WALL_CONFIG.rows; row++) {
      for (let col = 0; col < WALL_CONFIG.cols; col++) {
        const x = col * (BRICKS_CONFIG.width + BRICKS_CONFIG.padding) + BRICKS_CONFIG.offsetLeft;
        const y = row * (BRICKS_CONFIG.height + BRICKS_CONFIG.padding) + BRICKS_CONFIG.offsetTop;
        bricks.push(new Brick(x, y));
      }
    }

    return bricks;
  }

  private isBallCollidingWithPaddle(): boolean {
    return (
      this.ball.vy > 0 &&
      this.ball.y + this.ball.radius > this.paddle.y &&
      this.ball.x > this.paddle.x &&
      this.ball.x < this.paddle.x + this.paddle.width
    );
  }

  private isBallCollidingWithBrick(brick: Brick): boolean {
    const ballLeft = this.ball.x - this.ball.radius;
    const ballRight = this.ball.x + this.ball.radius;
    const ballTop = this.ball.y - this.ball.radius;
    const ballBottom = this.ball.y + this.ball.radius;

    const brickLeft = brick.x;
    const brickRight = brick.x + brick.width;
    const brickTop = brick.y;
    const brickBottom = brick.y + brick.height;

    return (
      ballRight > brickLeft &&
      ballLeft < brickRight &&
      ballBottom > brickTop &&
      ballTop < brickBottom
    );
  }

  private handleCollisions() {
    // Check collision with paddle
    if (this.isBallCollidingWithPaddle()) {
      this.ball.vy = -this.ball.vy;
    }

    // Check collision with bricks
    for (const brick of this.bricks) {
      if (brick.destroyed) continue;

      if (this.isBallCollidingWithBrick(brick)) {
        this.ball.vy = -this.ball.vy;
        brick.destroyed = true;
        break; // Only handle one collision per frame
      }
    }
  }
}

export default Game;
