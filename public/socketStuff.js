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
  if (globalPlayers[player.indexInPlayers].playerData) {
    player.locX = globalPlayers[player.indexInPlayers].playerData.locX;
    player.locY = globalPlayers[player.indexInPlayers].playerData.locY;
  }
});

socket.on("orbSwitch", (orbData) => {
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on("playerAbsorbed", (absorbData) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
  document.querySelector("#game-message").style.opacity = 1;
  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});

socket.on("updateLeaderBoard", (leaderBoardArray) => {
  leaderBoardArray.sort((a, b) => {
    return b.score - a.score;
  });

  document.querySelector(".leader-board").innerHTML = "";
  leaderBoardArray.forEach((p) => {
    if (!p.name) {
      return;
    }
    document.querySelector(".leader-board").innerHTML += `
                <li class="leaderboard-player">${p.name} - ${p.score}</li>
            `;
  });
  const el = leaderBoardArray.find((u) => u.name === player.name);
  document.querySelector(".player-score").innerHTML = el.score;
});
