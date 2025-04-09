import { context } from "./uiStuff";

export const init = () => {
  draw();
};

randomX = Math.floor(500 * Math.random() + 10); // horizontal axis
randomY = Math.floor(500 * Math.random() + 10); // vertical axis

context.beginPath();
context.fillStyle = "rgb(255,0,0)";
context.arc(randomX, randomY, 10, 0, Math.PI * 2);
context.fill();
context.lineWidth = 3;
context.strokeStyle = "rgb(0,255,0)";

const draw = () => {};
