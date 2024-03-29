/*:
 * @target MZ
 * @plugindesc Gives actors a skill while they have no weapon equipped.
 * @author Ben Hendel-Doying
 *
 * @help That's it! Use the plugin parameters to set the skill.
 *
 * Compatibility:
 * * ADDS Game_BattlerBase isEquippedWithAWeapon
 * * EXTENDS Game_BattlerBase addedSkills
 *
 * @param skillId
 * @text Skill
 * @desc The skill that actors will have while they have no weapon equipped.
 * @type skill
 * @default 1
 */

(function() {
    const originalAddedSkills = Game_BattlerBase.prototype.addedSkills;
    const weaponlessSkillId = Number(PluginManager.parameters('BMG_WeaponlessSkill').skillId);

    if(weaponlessSkillId <= 0)
    {
        console.warn('BMG_WeaponlessSkill: Skill must be greater than 0.');
        return;
    }

    Game_BattlerBase.prototype.addedSkills = function() {
        let skills = originalAddedSkills.call(this);

        if(!this.isEquippedWithAWeapon()) {
            skills.push(weaponlessSkillId);
        }

        return skills;
    };

    Game_BattlerBase.prototype.isEquippedWithAWeapon = function() {
        if(!this.equips)
            return false;

        return this.equips().some(equip => equip && equip.etypeId === 1);
    };
})();
