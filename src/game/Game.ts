import Ball from "./Ball";
import Brick from "./Brick";
import Paddle from "./Paddle";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private ball: Ball;
  private paddle: Paddle;
  private bricks: Brick[];

  constructor(containerSelector: string) {
    const container = document.querySelector<HTMLDivElement>(containerSelector);

    if (!container) {
      throw new Error(`Container with selector "${containerSelector}" not found`);
    }

    this.canvas = document.createElement("canvas");
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    container.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.ball = new Ball();
    this.paddle = new Paddle();
    this.bricks = [new Brick(0, 0, 0, 0)];

    console.log(this.ball);
  }

  public start() {
    this.loop();
  }

  private update() {
    this.ball.update(this.canvas.width, this.canvas.height);
  }

  private render() {
    //Draw the ball
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw(this.context);
  }

  private loop() {
    this.update();
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}

export default Game;
