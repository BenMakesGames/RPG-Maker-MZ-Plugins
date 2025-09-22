/*:
 * @target MZ
 * @plugindesc During battle, shows an HP bar above each enemy sprite.
 * @author Ben Hendel-Doying
 *
 * @help Use the plugin parameters to customize the appearance and positioning
 * of the HP bars shown above enemy sprites during battle.
 *
 * HP bars will only be shown if at least one party member has the ability
 * to see monster HP. Add the following note tag to grant this ability:
 *
 * <ShowMonsterHP>
 *
 * This tag can be added to:
 * * Actor notes (in the Database > Actors tab)
 * * Class notes (in the Database > Classes tab)
 * * Weapon notes (in the Database > Weapons tab)
 * * Armor notes (in the Database > Armor tab)
 *
 * Notes:
 * * The tag is NOT case-sensitive; <showmonsterhp> works too.
 * * Spaces may be added around the symbols; < ShowMonsterHP > works too.
 * * If ANY party member has this ability (through actor, class, or equipment),
 *   ALL enemy HP bars will be visible.
 *
 * Compatibility:
 * * ADDS Sprite_Enemy createHpBar
 * * ADDS Sprite_Enemy updateHpBar
 * * ADDS Sprite_Enemy updateHpBarVisibility
 * * ADDS Game_Party hasShowMonsterHPAbility
 * * EXTENDS Sprite_Enemy initialize
 * * EXTENDS Sprite_Enemy update
 * * EXTENDS Sprite_Enemy updateCollapse
 * * EXTENDS Sprite_Enemy setBattler
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 *
 * @param hpBarWidth
 * @text HP Bar Width
 * @desc The width of the HP bar in pixels.
 * @type number
 * @min 10
 * @max 200
 * @default 60
 *
 * @param hpBarHeight
 * @text HP Bar Height
 * @desc The height of the HP bar in pixels.
 * @type number
 * @min 2
 * @max 20
 * @default 6
 *
 * @param hpBarYOffset
 * @text HP Bar Y Offset
 * @desc How many pixels above the enemy sprite to show the HP bar. Use negative values to position above.
 * @type number
 * @min -100
 * @max 50
 * @default -20
 *
 * @param hpBarColor
 * @text HP Bar Color
 * @desc The color of the HP bar (hex color code).
 * @type string
 * @default #ff0000
 *
 * @param hpBarBgColor
 * @text HP Bar Background Color
 * @desc The background color of the HP bar (hex color code).
 * @type string
 * @default #000000
 *
 * @param hpBarBorderColor
 * @text HP Bar Border Color
 * @desc The border color of the HP bar (hex color code).
 * @type string
 * @default #ffffff
 */

(function() {
    'use strict';

    // Get plugin parameters
    const parameters = PluginManager.parameters('BMG_ShowMonsterHP');
    const hpBarWidth = Number(parameters.hpBarWidth);
    const hpBarHeight = Number(parameters.hpBarHeight);
    const hpBarYOffset = Number(parameters.hpBarYOffset);
    const hpBarColor = parameters.hpBarColor;
    const hpBarBgColor = parameters.hpBarBgColor;
    const hpBarBorderColor = parameters.hpBarBorderColor;



    const originalSpriteEnemyUpdateBitmap = Sprite_Enemy.prototype.updateBitmap;

    Sprite_Enemy.prototype.updateBitmap = function(battler) {
        originalSpriteEnemyUpdateBitmap.call(this, battler);
        this.createHpBar();
    };

    /**
     * Create HP bar sprites
     */
    Sprite_Enemy.prototype.createHpBar = function() {
        if(this.bitmap.height === 0 || this.hpBarContainer) return;

        // Container for HP bar
        this.hpBarContainer = new Sprite();
        this.hpBarContainer.x = 0;
        this.hpBarContainer.y = -this.bitmap.height + hpBarYOffset;
        this.addChild(this.hpBarContainer);

        // Background bar
        this.hpBarBackground = new Sprite();
        this.hpBarBackground.bitmap = new Bitmap(hpBarWidth + 2, hpBarHeight + 2);
        this.hpBarBackground.bitmap.fillRect(0, 0, hpBarWidth + 2, hpBarHeight + 2, hpBarBorderColor);
        this.hpBarBackground.bitmap.fillRect(1, 1, hpBarWidth, hpBarHeight, hpBarBgColor);
        this.hpBarBackground.anchor.x = 0.5;
        this.hpBarContainer.addChild(this.hpBarBackground);

        // HP bar
        this.hpBarSprite = new Sprite();
        this.hpBarSprite.bitmap = new Bitmap(hpBarWidth, hpBarHeight);
        this.hpBarSprite.anchor.x = 0.5;
        this.hpBarSprite.x = 0;
        this.hpBarSprite.y = 1;
        this.hpBarContainer.addChild(this.hpBarSprite);

        this.updateHpBar();
    };

    /**
     * Update HP bar based on current HP
     */
    Sprite_Enemy.prototype.updateHpBar = function() {
        if (!this._enemy || !this.hpBarSprite) return;

        const hpRate = this._enemy.hpRate();
        const barWidth = Math.floor(hpBarWidth * hpRate);

        this.hpBarSprite.bitmap.clear();

        if (barWidth > 0)
            this.hpBarSprite.bitmap.fillRect(0, 0, barWidth, hpBarHeight, hpBarColor);
    };

    const originalSpriteEnemyUpdate = Sprite_Enemy.prototype.update;

    /**
     * Override update to continuously update HP bar
     */
    Sprite_Enemy.prototype.update = function() {
        originalSpriteEnemyUpdate.call(this);
        this.updateHpBarVisibility();
        this.updateHpBar();
    };

    /**
     * Show/hide HP bar based on battle state
     */
    Sprite_Enemy.prototype.updateHpBarVisibility = function() {
        if (!this.hpBarContainer) return;

        const isInBattle = $gameParty.inBattle();
        const hasEnemy = this._enemy;
        const isAlive = this._enemy && this._enemy.isAlive();
        const isVisible = this._enemy && !this._enemy.isHidden();
        const hasShowMonsterHPAbility = $gameParty.hasShowMonsterHPAbility();

        this.hpBarContainer.visible = isInBattle && hasEnemy && isAlive && isVisible && hasShowMonsterHPAbility;
    };

    /**
     * Check if any party member has the ShowMonsterHP ability
     * @returns {boolean}
     */
    Game_Party.prototype.hasShowMonsterHPAbility = function() {
        const regex = /< *showmonsterhp *>/gi;

        return this.allMembers().some(actor => {
            if (actor.note && actor.note.match(regex))
                return true;

            if (actor.currentClass() && actor.currentClass().note && actor.currentClass().note.match(regex))
                return true;

            return actor.equips().some(item => {
                return item && item.note && item.note.match(regex);
            });
        });
    };

    const originalSpriteEnemyUpdateCollapse = Sprite_Enemy.prototype.updateCollapse;

    /**
     * Hide HP bar when enemy is defeated
     */
    Sprite_Enemy.prototype.updateCollapse = function() {
        originalSpriteEnemyUpdateCollapse.call(this);

        if (this.hpBarContainer)
            this.hpBarContainer.visible = false;
    };

    const originalSpriteEnemySetBattler = Sprite_Enemy.prototype.setBattler;

    /**
     * Ensure HP bar is positioned correctly when sprite changes
     * @param {Sprite_Battler} battler
     */
    Sprite_Enemy.prototype.setBattler = function(battler) {
        originalSpriteEnemySetBattler.call(this, battler);

        if (this.hpBarContainer && battler)
            this.updateHpBar();
    };
})();