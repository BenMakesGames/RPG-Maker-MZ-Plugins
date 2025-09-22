/*:
 * @target MZ
 * @plugindesc On the equipment screen, removes Optimize and Clear.
 * @author Ben Hendel-Doying
 *
 * @help Makes the equipment screen go straight to the equip screen;
 * the "Optimize" and "Clear" options are unavailable.
 *
 * Compatibility:
 * * REPLACES Scene_Equip create
 * * REPLACES Scene_Equip slotWindowRect
 * * REPLACES Scene_Equip createSlotWindow
 * * REPLACES Scene_Equip onActorChange
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

(() => {
    Scene_Equip.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createStatusWindow();
        this.createSlotWindow();
        this.createItemWindow();
        this.refreshActor();

        this._slotWindow.activate();
        this._slotWindow.select(0);
    };

    Scene_Equip.prototype.slotWindowRect = function() {
        const wx = this.statusWidth();
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Equip.prototype.createSlotWindow = function() {
        const rect = this.slotWindowRect();
        this._slotWindow = new Window_EquipSlot(rect);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
        this._slotWindow.setHandler("cancel", this.popScene.bind(this));
        this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._slotWindow);
    };

    Scene_Equip.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this.hideItemWindow();
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };
})();
