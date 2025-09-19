/*:
 * @target MZ
 * @plugindesc Ignores the LUK attribute.
 * @author Ben Hendel-Doying
 *
 * @help By default, LUK makes it possible for characters to avoid status effects.
 * If you don't like that, use this plugin :P
 *
 * Compatibility:
 * * REPLACES Game_Action lukEffectRate
 *
 * Combine with BMG_LuckIncreasesGold to give LUK another use!
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

Game_Action.prototype.lukEffectRate = function(target) {
    return 1;
};