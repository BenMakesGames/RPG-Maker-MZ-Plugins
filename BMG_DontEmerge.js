/*:
 * @target MZ
 * @plugindesc Removes the "emerge" battle start message.
 * @author Ben Hendel-Doying
 *
 * @help Removes the "[monster] emerges!" messages that appear at the
 * start of battle. Preemptive and surprise messages are still shown.
 *
 * Compatibility:
 * * REPLACES BattleManager displayStartMessages
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

(() => {
    BattleManager.displayStartMessages = function() {
        if (this._preemptive) {
            $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
        } else if (this._surprise) {
            $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        }
    };
})();