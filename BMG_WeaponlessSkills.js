/*:
 * @target MZ
 * @plugindesc Allows actors to receive skills when they have no weapon equipped.
 * @author Ben Hendel-Doying
 *
 * @help Add the following tag to an actor, or its class, to grant it
 * skills when no weapon is equipped:
 *
 * <WeaponlessSkill:x>
 *
 * Where "x" is the ID of the skill to be granted.
 *
 * Notes:
 * * You can add multiple such tags to grant multiple skills.
 * * The tag is NOT case-sensitive; <weaponlessskill:x> works too.
 * * Spaces may be added around the various symbols; <  WEAPONLESSskill :   x > works too.
 *
 * Check out BMG_WeaponlessSkillsSimple for a version of this plugin that
 * uses the same weaponless skill for all actors.
 *
 * Compatibility:
 * * ADDS Game_BattlerBase isEquippedWithAWeapon
 * * EXTENDS Game_BattlerBase addedSkills
 *
 * All my plugins are free! :) You can support me on Patreon if you like:
 * https://www.patreon.com/c/BenMakesGames
 */

(() => {
    const originalSkills = Game_BattlerBase.prototype.addedSkills;
    const regex = /< *weaponlessskill *: *(\d+) *>/gi;

    Game_BattlerBase.prototype.addedSkills = function() {
        let skills = originalSkills.call(this);

        if(this.isEquippedWithAWeapon())
            return skills;

        let match;

        if(this.actor)
        {
            while((match = regex.exec(this.actor().note)) !== null) {
                const skillId = parseInt(match[1]);
                if(!isNaN(skillId) && !skills.includes(skillId)) {
                    skills.push(skillId);
                }
            }
        }

        if(this.currentClass) {
            while((match = regex.exec(this.currentClass().note)) !== null) {
                const skillId = parseInt(match[1]);
                if(!isNaN(skillId) && !skills.includes(skillId)) {
                    skills.push(skillId);
                }
            }
        }

        return skills;
    };

    Game_BattlerBase.prototype.isEquippedWithAWeapon = function() {
        if(!this.equips)
            return false;

        return this.equips().some(equip => equip && equip.etypeId === 1);
    };
})();
