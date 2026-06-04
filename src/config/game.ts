export const CANVAS_CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
};

export const WALL_CONFIG = {
  rows: 5,
  cols: 10,
};

export const BRICKS_CONFIG = {
  width: (CANVAS_CONFIG.canvasWidth - 2 * 30 - (WALL_CONFIG.cols - 1) * 10) / WALL_CONFIG.cols,
  height: 20,
  padding: 10,
  offsetTop: 30,
  offsetLeft: 30,
  color: "#0095DD",
};

export const PADDLE_CONFIG = {
  width: 100,
  height: 20,
  speed: 8,
  color: "#0095DD",
};

export const BALL_CONFIG = {
  radius: 10,
  speed: 4,
  color: "#0095DD",
};
