/*:
 * @target MZ
 * @plugindesc Removes "Attack" and "Guard" options from combat.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 *
 * Compatibility:
 * * REPLACES Window_ActorCommand addAttackCommand
 * * REPLACES Window_ActorCommand addGuardCommand
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

Window_ActorCommand.prototype.addAttackCommand = function() {
    // do nothing
};

Window_ActorCommand.prototype.addGuardCommand = function() {
    // do nothing
};
