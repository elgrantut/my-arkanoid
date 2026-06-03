import "./style.css";

const canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

ctx?.fillRect(100, 100, 50, 50);

document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
