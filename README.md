A collection of RPG Maker MZ plugins I've developed while working on my own games.

Feel free to use them, alter them, take them apart, rearrange them, etc, to suit your needs.

All my plugins are free! :) [You can support me on Patreon!](https://www.patreon.com/c/BenMakesGames)

## Plugins

> 🧚‍♀️ **Hey, listen!** ⭐s represent the general interestingness, uniqueness, and/or complexity of the plugin.

### BMG_CustomCritical
Allows customization of the critical hit damage multiplier.

**Why use?** If you find the default 3x crit hit damage multiplier is too devastating to player parties, you may want to tweak it down. Or maybe you want an extra-dangerous system and want to turn it up! Do what's right for _your_ game.

### BMG_DanceInputs ⭐⭐
Lets you create custom sequences of inputs to trigger common events and map events.

Inspired by the secret input systems of Fez and Tunic.

**Why use?** Secrets are fun!

### BMG_DontEmerge
Disables the "\[monster\] emerged!" message that appears when starting a battle.

**Why use?** Speeds up battles. Humans are drawn to shapes and colors before text - they've probably already visually identified your monsters and are spamming the "OK" button to get into battle, anyway.

### BMG_EquipGoesStraightToEquip
Removes the Equip/Optimize/Clear bar in the equipment screen. ("Optimize" and "Clear" actions are no longer available to players.)

**Why use?** If a feature of your game is so cumbersome for players that you need to automate it, you should consider addressing the problem at its core. Why are players reaching for an "Optimize" option? Have you given your player so many items they're experiencing decision paralysis? Are your battles so frequent and so easy that players just spam "attack" and pray it's over quickly? Solve those problems instead of hiding them behind Optimize and Clear functionality.

### BMG_LuckIncreasesGold ⭐
Makes each point of LUK increase gold and drops by +1% at the end of combat.

May be useful in combination with BMG_StatusEffectsIgnoreLuck.

**Why use?** RPG Maker's default LUK attribute has the effect of giving characters a chance to dodge status effects. If you like that mechanic, rad - keep it! If not, you might want an alternative use for the LUK stat; this plugin provides one such use.

### BMG_NoBasicAttack
The basic attack and guard moves are removed from combat.

**Why use?** If equipment and/or class will provide characters with unique free attack moves, the basic attack (and guard) actions may be superfluous. Might combine well with `BMG_WeaponlessSkills`.

### BMG_Penniless
Removes the Gold window from the party menu.

**Why use?** If your game doesn't use money, this window is just taking up space, and potentially confusing to players.

### BMG_PushableEvents ⭐
Add <pushable> to an event's notes to make it pushable by the player.

Optionally, can configure an item or global switch to be required in order to push things.

**Why use?** Puzzles!

### BMG_ScreenByScreen ⭐⭐⭐
Allows players to automatically transition from map to map by moving to the edge of a map. (Think classic Zelda, MegaMan, or metroidvania game.)

**Why use?** If you like the idea of areas directly connecting at the edges, and want to build your world that way, the normal approach would be to create events that line the edges of your maps. That gets annoying fast; this plugin will help save you the trouble.

### BMG_ShowMonsterHP ⭐

Shows an HP bar above enemies if at least one of the party member has the `<ShowMonsterHP>` note (either on the party member directly, their class, or one of their equipped items).

**Why use?** Seeing enemy HP changes how players approach battles. Y

### BMG_StatusEffectsIgnoreLuck 

LUK no longer affects the chance of resisting status effects.

**Why use?** If you'd rather LUK do something else.

### BMG_WeaponlessSkills ⭐⭐
Actors gain skills while they are holding no weapon. The skill(s) gained by each actor is controlled by actor and/or class tags.

**Why use?** Can give your characters a unique feel; for examples humans might Punch, while monstrous characters Bite or Claw. Combine with `BMG_NoBasicAttack` to enhance the feel.

### BMG_WeaponlessSkillsSimple
Actors gain a skill when they are holding no weapon. It is the same skill for all actors, based on plugin parameter.

**Why use?** You want to use `BMG_NoBasicAttack`, and like `BMG_WeaponlessSkills`, but are happy with all your PCs having the same attack when unarmed.