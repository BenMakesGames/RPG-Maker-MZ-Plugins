/*:
 * @target MZ
 * @plugindesc Lets the player automatically travel between "adjacent" maps (think classic Legend of Zelda, or modern Dofus, if you've played that).
 * @author Ben Hendel-Doying
 *
 * @help This plugin works on maps with the following name structure:
 *
 *   <area name>:<x>,<y>
 *
 * For example:
 *
 *   Outside:0,0
 *   Outside:0,-1
 *
 * When the player reaches the edge of such a map, they will be taken to the
 * next map with the same area name, and x,y coordinates according to which
 * edge of the map they reached. (If no such map exists, the player will
 * remain where they are.)
 *
 * The player will be automatically positioned on the next map, one tile in
 * from the edge they "came from".
 *
 * This plugin assumes that all maps within an area are the same size. It's
 * important that you ensure that players don't end up getting landing in a
 * tile from which they cannot escape.
 *
 * Compatibility:
 * * EXTENDS Game_Player.prototype.updateNonmoving
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

(function() {
    const areaRegex = /^(.*):(-?\d+),(-?\d+)$/;

    /*
     * @param map Game_Map
     */
    const getNextMap = function(map, x, y) {
        const mapWidth = map.width();
        const mapHeight = map.height();

        let nextMapDeltaX = 0;
        let nextMapDeltaY = 0;

        if(x === 0)
        {
            x = mapWidth - 2;
            nextMapDeltaX = -1;
        }
        else if(x === mapWidth - 1)
        {
            x = 1;
            nextMapDeltaX = 1;
        }
        else if(y === 0)
        {
            y = mapHeight - 2;
            nextMapDeltaY = -1;
        }
        else if(y === mapHeight - 1)
        {
            y = 1;
            nextMapDeltaY = 1;
        }
        else
            return null;

        const mapInfo = $dataMapInfos[map.mapId()].name.match(areaRegex);

        if(!mapInfo)
            return null;

        const nextMapX = Number(mapInfo[2]) + nextMapDeltaX;
        const nextMapY = Number(mapInfo[3]) + nextMapDeltaY;

        const newMap = $dataMapInfos.find(m => {
            if(!m)
                return false;

            const info = m.name.match(areaRegex);

            return info && info[1] == mapInfo[1] && info[2] == nextMapX && info[3] == nextMapY;
        });

        if(!newMap)
            return null;

        return {
            mapId: newMap.id,
            playerX: x,
            playerY: y
        };
    };

    // check if the player is at the edge of the map, and if so, move them to the next map
    const originalGamePlayerUpdate = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive)
    {
        originalGamePlayerUpdate.call(this, sceneActive);

        if(!sceneActive)
            return;

        if(this.isMoving())
            return;

        // if the player is not at the edge of the map, do nothing
        if(this.x !== 0 && this.x !== $gameMap.width() - 1 && this.y !== 0 && this.y !== $gameMap.height() - 1)
            return;

        const nextMap = getNextMap($gameMap, this.x, this.y);

        if(!nextMap)
            return;

        $gamePlayer.reserveTransfer(nextMap.mapId, nextMap.playerX, nextMap.playerY, this.direction(), 0);
    };

})();