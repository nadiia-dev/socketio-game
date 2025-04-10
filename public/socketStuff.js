const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initData = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit("tock", {
      yVector: player.yVector ? player.yVector : 0.1,
      xVector: player.xVector ? player.xVector : 0.1,
    });
  }, 33);

  orbs = initData.orbs2;
  player.indexInPlayers = initData.indexInPlayers;
  draw();
};

socket.on("tick", (playersArray) => {
  globalPlayers = playersArray;
  player.locX = globalPlayers[player.indexInPlayers].playerData.locX;
  player.locY = globalPlayers[player.indexInPlayers].playerData.locY;
});

socket.on("orbSwitch", (orbData) => {
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on("playerAbsorbed", (absorbData) => {
  console.log("absorbed", absorbData.absorbed);
  console.log("absorb", absorbData.absorbedBy);
});
