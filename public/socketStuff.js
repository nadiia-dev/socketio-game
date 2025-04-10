const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initOrbs = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit("tock", {
      yVector: player.yVector,
      xVector: player.xVector,
    });
  }, 33);

  orbs = initOrbs;
  draw();
};

socket.on("tick", (playersArray) => {
  players = playersArray;
  // console.log("players", players);
});
