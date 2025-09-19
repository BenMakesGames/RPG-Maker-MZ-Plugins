/*:
 * @target MZ
 * @plugindesc Add <pushable> to an event's Note field to make it pushable by the player.
 * @author Ben Hendel-Doying
 *
 * @help Put <pushable> in an event's Note field to make it pushable by the player.
 *
 * If you'd like pushability to be conditional on a switch and/or item owned by
 * the party, use the plugin parameters to set a switch and/or item.
 *
 * Compatibility:
 * * EXTENDS Game_Player moveStraight
 * * ADDS Game_Event isPushable
 * * ADDS Game_Player canPush
 * * ADDS Game_Player push
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 *
 * @param switch
 * @type switch
 * @text Required Switch
 * @desc If this switch is OFF, pushability is disabled.
 * @default 0
 *
 * @param item
 * @type item
 * @text Required Item
 * @desc If the party does not have this item, pushability is disabled.
 * @default 0
 */

(function() {
    // get parameters
    const params = PluginManager.parameters('BMG_PushableEvents');
    const switchId = Number(params['switch']);
    const itemId = Number(params['item']);

    Game_Event.prototype.isPushable = function()
    {
        if(switchId && !$gameSwitches.value(switchId))
            return false;

        if(itemId && !$gameParty.hasItem($dataItems[itemId], true))
            return false;

        return this.event().note.toLowerCase().includes('<pushable>');
    };

    // extend Game_Player
    const originalGamePlayerMoveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(d) {
        if(this.canPush(d))
            this.push(d);
        else
            originalGamePlayerMoveStraight.call(this, d);
    };

    Game_Player.prototype.canPush = function(d) {
        const x = $gameMap.roundXWithDirection(this.x, d);
        const y = $gameMap.roundYWithDirection(this.y, d);
        const events = $gameMap.eventsXy(x, y);

        if(events.length !== 1)
            return false;

        const event = events[0];

        return event.isPushable();
    };

    Game_Player.prototype.push = function(d) {
        const x = $gameMap.roundXWithDirection(this.x, d);
        const y = $gameMap.roundYWithDirection(this.y, d);
        const events = $gameMap.eventsXy(x, y);
        const event = events[0];

        event.moveStraight(d);
        if(event.isMovementSucceeded())
            originalGamePlayerMoveStraight.call(this, d);
    };
})();