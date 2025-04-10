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

const players = [];
let tickTockInterval;

initGame();

io.on("connect", (socket) => {
  let player = {};
  socket.on("init", (playerObj, ackCallback) => {
    if (players.length === 0) {
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", players);
      }, 33);
    }

    socket.join("game");

    const playerName = playerObj.playerName;
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player);
    ackCallback(orbs2);
  });

  socket.on("tock", (data) => {
    let speed = player.playerConfig.speed;
    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    if (
      (player.playerData.locX < 5 && xV < 0) ||
      (player.playerData.locX > 500 && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > 500 && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
  });

  socket.on("disconnect", () => {
    if (players.length === 0) {
      clearInterval(tickTockInterval);
    }
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultNumOfOrbs; i++) {
    orbs2.push(new Orb(settings));
  }
}

export default io;
