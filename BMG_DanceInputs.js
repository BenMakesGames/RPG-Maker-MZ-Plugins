/*:
 * @target MZ
 * @plugindesc Configure "dances" - series of player movements - that trigger events
 * when performed.
 * @author Ben Hendel-Doying
 *
 * @help Puzzle games like Fez or Tunic feature input sequences that trigger special
 * events. This plugin lets you configure such sequences in two different ways:
 *
 * 1. Using this plugin's parameters, you can configure a dance to trigger a
 *    common event.
 * 2. In an event's Note field, enter the text "<dance:___>" replacing "___"
 *    with a dance sequence (see info below). When the player performs that
 *    dance, the event's "D" self-switch will be turned on.
 *
 * Dances in the plugin parameters and event Note fields must be entered as a
 * sequence of "u", "d", "l", and "r" characters, representing up, down, left,
 * and right movement. For example:
 *
 *   uuddlrlr
 *
 * Represents the moves up, up, down, down, left, right, left, right.
 *
 * If the player is unable to perform a move (for example, because they hit a
 * wall), that move is NOT counted towards the dance.
 *
 * Movement via keyboard, gamepad, and mouse/touch are all supported.
 *
 * The tag name and dance sequences are case-insensitive. For example, the
 * following Notes are identical, and both work:
 *
 *   <dance:uuddlrlr>
 *   <DaNce:uUDDlrlR>
 *
 * Compatibility:
 * * EXTENDS Game_Player moveStraight
 * * EXTENDS DataManager onLoad
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 *
 * @param maxDanceLength
 * @type number
 * @text Maximum Dance Length
 * @desc The maximum length of a dance, in moves. The default is 100.
 * @default 100
 *
 * @param dances
 * @type struct<Dance>[]
 * @text Dances
 * @desc The dances to configure.
 * @default []
 */

/*~struct~Dance:
 * @param dance
 * @type text
 * @text Dance
 * @desc The input sequence that triggers the common event.
 * @default
 *
 * @param commonEvent
 * @type common_event
 * @text Common Event
 * @desc The common event to trigger when the dance is performed.
 */

(function() {
    const pluginName = 'BMG_DanceInputs';
    const pluginParameters = PluginManager.parameters(pluginName);
    const maxDanceLength = Number(pluginParameters['maxDanceLength']);
    const dances = JSON.parse(pluginParameters['dances'])
        .map(d => JSON.parse(d))
        .map(d => {
            return {
                dance: d.dance.toLowerCase(),
                commonEvent: Number(d.commonEvent)
            };
        });

    // capture player movements in a string
    let moveHistory = '';

    // check for dances after every player movement
    const originalGamePlayerMoveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(direction) {
        originalGamePlayerMoveStraight.call(this, direction);

        switch(direction)
        {
            case 2: moveHistory += 'd'; break;
            case 4: moveHistory += 'l'; break;
            case 6: moveHistory += 'r'; break;
            case 8: moveHistory += 'u'; break;
        }

        if(moveHistory.length > maxDanceLength)
            moveHistory = moveHistory.substring(moveHistory.length - maxDanceLength);

        checkForDances();
    };

    function checkForDances()
    {
        for(let dance of dances)
        {
            if(moveHistory.endsWith(dance.dance))
                $gameTemp.reserveCommonEvent(dance.commonEvent);
        }

        for(let event of mapEventsWithDances)
        {
            if(moveHistory.endsWith(event.dance))
                $gameSelfSwitches.setValue([ $gameMap.mapId(), event.eventId, 'D' ], true);
        }
    }

    /**
     * @type {Array<{ dance: string, eventId: number }>}
     */
    let mapEventsWithDances = [];

    const originalDataManagerOnLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        originalDataManagerOnLoad.call(this, object);

        if (!this.isMapObject(object))
            return;

        mapEventsWithDances = [];

        for (const event of $dataMap.events.filter(event => !!event))
            processEvent(event);
    };

    function processEvent(event)
    {
        if (!event.note || !event.note.toLowerCase().includes('<dance:'))
            return;

        mapEventsWithDances.push({
            dance: event.note.match(/<dance:(.*)>/i)[1].trim().toLowerCase(),
            eventId: event.id
        });
    }
})();
