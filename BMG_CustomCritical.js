/*:
 * @target MZ
 * @plugindesc Customizes the multiplier of critical hits.
 * @author Ben Hendel-Doying
 *
 * @help Use the plugin parameters to customize the crit hit multiplier.
 *
 * The game default is 3; if you don't want a different value, you can uninstall
 * this plugin :P
 *
 * Compatibility:
 * * REPLACES Game_Action applyCritical
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 *
 * @param multiplier
 * @text Multiplier
 * @desc The multiplier for critical hits.
 * @type number
 * @default 3
 */

(function() {
    const multiplier = Number(PluginManager.parameters('BMG_CustomCritical').multiplier);

    Game_Action.prototype.applyCritical = function(damage) {
        return Math.ceil(damage * multiplier);
    };
})();
