/*:
 * @target MZ
 * @plugindesc Removes the gold window from the status menu.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 *
 * Compatibility:
 * * REPLACES Scene_Menu createGoldWindow
 * * REPLACES Scene_Menu goldWindowRect
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

Scene_Menu.prototype.createGoldWindow = function() {
    // do nothing
};

Scene_Menu.prototype.goldWindowRect = function() {
    return new Rectangle(0, 0, 0, 0);
};
