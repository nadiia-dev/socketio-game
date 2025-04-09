import { io } from "../servers.js";
import { app } from "../servers.js";

import { Orb } from "./classes/Orb.js";
import { Player } from "./classes/Player.js";
import { PlayerConfig } from "./classes/PlayerConfig.js";
import { PlayerData } from "./classes/PlayerData.js";

const orbs2 = [];
const settings = {
  defaultNumOfOrbs: 500,
  degaultSpeed: 6,
  defaultSize: 6,
  ddefaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
  defaultGenericOrbSize: 5,
};

initGame();

io.on("connect", (socket) => {
  const playerName = "nadiia";
  const playerConfig = new PlayerConfig(settings);
  const playerData = new PlayerData(playerName, settings);
  const player = new Player(socket.id, playerConfig, playerData);
  socket.emit("init", { orbs2 });
});

function initGame() {
  for (let i = 0; i < settings.defaultNumOfOrbs; i++) {
    orbs2.push(new Orb(settings));
  }
}

export default io;
