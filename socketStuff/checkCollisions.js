export const checkForOrbCollisions = (pData, pConfig, orbs, settings) => {
  //ORB COLLISIONS
  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i];
    // AABB Test(square)  - Axis-aligned bounding boxes
    if (
      pData.locX + pData.radius + orb.radius > orb.locX &&
      pData.locX < orb.locX + pData.radius + orb.radius &&
      pData.locY + pData.radius + orb.radius > orb.locY &&
      pData.locY < orb.locY + pData.radius + orb.radius
    ) {
      // Pythagoras test(circle)
      const distance = Math.sqrt(
        (pData.locX - orb.locX) * (pData.locX - orb.locX) +
          (pData.locY - orb.locY) * (pData.locY - orb.locY)
      );
      if (distance < pData.radius + orb.radius) {
        //COLLISION
        pData.score += 1; //increment score
        pData.orbsAbsorbed += 1; //increment orbs absorbed count

        if (pConfig.zoom > 1) {
          pConfig.zoom -= 0.001; //update zoom so player doesn't get to big for screen
        }
        pData.radius += 0.05; //increase player size
        if (pConfig.speed < -0.005) {
          pConfig.speed += 0.005; //increase player speed
        } else if (pConfig.speed > 0.005) {
          pConfig.speed -= 0.005;
        }
        // can't hit more than one orb on a tock so break and return
        return i;
        break;
      }
    }
  }
  return null;
};

export const checkForPlayerCollisions = (
  pData,
  pConfig,
  players,
  playersForUsers,
  playerId
) => {
  //PLAYER COLLISION
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    if (p.id && p.id != playerId) {
      //Added p.socketId test in case player has been removed from players
      let pLocx = p.playerData.locX;
      let pLocy = p.playerData.locY;
      let pR = p.playerData.radius;
      // AABB Test - Axis-aligned bounding boxes
      if (
        pData.locX + pData.radius + pR > pLocx &&
        pData.locX < pLocx + pData.radius + pR &&
        pData.locY + pData.radius + pR > pLocy &&
        pData.locY < pLocy + pData.radius + pR
      ) {
        console.log("AABB collision detected");
        // Pythagoras test
        const distance = Math.sqrt(
          (pData.locX - pLocx) * (pData.locX - pLocx) +
            (pData.locY - pLocy) * (pData.locY - pLocy)
        );
        console.log(distance);
        if (distance < pData.radius + pR) {
          //COLLISION
          if (pData.radius > pR) {
            // ENEMY DEATH
            pData.score += p.playerData.score + 10;
            pData.playersAbsorbed += 1;
            p.alive = false;
            pData.radius += p.playerData.radius * 0.25;
            const collisionData = {
              absorbed: p.playerData.name,
              absorbedBy: pData.name,
            };

            if (pConfig.zoom > 1) {
              pConfig.zoom -= pR * 0.25 * 0.001;
            }
            players.splice(i, 1, {}); //remove player from server players array
            playersForUsers.splice(i, 1, {}); //remove player from players array used by clients

            console.log();
            return collisionData; //essentially a return statement
            break;
          }
        }
      }
    }
  }
  return null;
};
