export class Player {
  constructor(socketId, playerConfig, playerData) {
    this.id = socketId;
    this.playerData = playerData;
    this.playerConfig = playerConfig;
  }
}
