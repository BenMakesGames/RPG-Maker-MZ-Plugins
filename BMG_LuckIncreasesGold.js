/*:
 * @target MZ
 * @plugindesc Increases loot according to party-member LUK
 * @author Ben Hendel-Doying
 *
 * @help Makes LUK increase gold and item drops from battles. Each point of LUK
 * increases gold and item drops by +1%. Works with the "Gold Double" and
 * "Drop Item Double" abilities - think of those as adding +100% to drop rates.
 *
 * Examples:
 * * If your party has a total of 25 LUK, then you will get +25% gold and items.
 * * If your party has Gold Double and a total of 25 LUK, then you will get
 *   +125% gold and +25% items.
 *
 * Combine with BMG_StatusEffectsIgnoreLuck if you don't ALSO want LUK to affect
 * status effects.
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

(() => {
    Game_Troop.prototype.goldRate = function() {
        return ($gameParty.hasGoldDouble() ? 2 : 1) +
            $gameParty.members().reduce((r, actor) => r + actor.luk / 100, 0);
    };

    Game_Enemy.prototype.dropItemRate = function() {
        return ($gameParty.hasDropItemDouble() ? 2 : 1) +
            $gameParty.members().reduce((r, actor) => r + actor.luk / 100, 0);
    };
})();
