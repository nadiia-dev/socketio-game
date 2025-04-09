import { io } from "../servers.js";
import { app } from "../servers.js";
import { Orb } from "./classes/Orb.js";

const orbs2 = [];

initGame();

io.on("connect", (socket) => {
  socket.emit("init", { orbs2 });
});

function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs2.push(new Orb());
  }
}

export default io;
