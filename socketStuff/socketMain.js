import { io } from "../servers.js";
import { app } from "../servers.js";

import { Orb } from "./classes/Orb.js";
import { Player } from "./classes/Player.js";
import { PlayerConfig } from "./classes/PlayerConfig.js";
import { PlayerData } from "./classes/PlayerData.js";

const orbs2 = [];
const settings = {
  defaultNumOfOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
  defaultGenericOrbSize: 5,
};

const players = [];
const playersForUsers = [];
let tickTockInterval;

initGame();

io.on("connect", (socket) => {
  let playerLoc = {};
  socket.on("init", (playerObj, ackCallback) => {
    if (players.length === 0) {
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUsers);
      }, 33);
    }

    socket.join("game");

    const playerName = playerObj.playerName;
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    playerLoc = new Player(socket.id, playerConfig, playerData);
    playersForUsers.push({ playerData });
    ackCallback({ orbs2, indexInPlayers: playersForUsers.length - 1 });
  });

  socket.on("tock", (data) => {
    if (!playerLoc.playerConfig) {
      return;
    }
    let speed = playerLoc.playerConfig.speed;
    const xV = (playerLoc.playerConfig.xVector = data.xVector);
    const yV = (playerLoc.playerConfig.yVector = data.yVector);

    if (
      (playerLoc.playerData.locX < 5 && xV < 0) ||
      (playerLoc.playerData.locX > 500 && xV > 0)
    ) {
      playerLoc.playerData.locY -= speed * yV;
    } else if (
      (playerLoc.playerData.locY < 5 && yV > 0) ||
      (playerLoc.playerData.locY > 500 && yV < 0)
    ) {
      playerLoc.playerData.locX += speed * xV;
    } else {
      playerLoc.playerData.locX += speed * xV;
      playerLoc.playerData.locY -= speed * yV;
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
