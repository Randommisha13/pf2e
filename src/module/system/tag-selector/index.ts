export { BasicConstructorOptions, TagSelectorBasic } from "./basic";
export { SenseSelector } from "./senses";
export { SpeedSelector } from "./speeds";
export { TagSelectorOptions } from "./base";

const TAG_SELECTOR_TYPES = ["basic", "senses", "speed-types"] as const;
type TagSelectorType = typeof TAG_SELECTOR_TYPES[number];

// CONFIG properties that can be used in a tag selector
const SELECTABLE_TAG_FIELDS = [
    "abilities",
    "actionCategories",
    "actionTraits",
    "actionTypes",
    "actionsNumber",
    "actorSizes",
    "alignments",
    "ancestryItemTraits",
    "ancestryTraits",
    "areaSizes",
    "areaTypes",
    "armorGroups",
    "armorPotencyRunes",
    "armorPropertyRunes",
    "armorResiliencyRunes",
    "armorTraits",
    "armorTypes",
    "attackEffects",
    "attributes",
    "baseWeaponTypes",
    "bulkTypes",
    "classTraits",
    "conditionTypes",
    "consumableTraits",
    "consumableTypes",
    "creatureTraits",
    "currencies",
    "damageCategories",
    "damageDie",
    "damageTypes",
    "dcAdjustments",
    "equipmentTraits",
    "featTraits",
    "featTypes",
    "hazardTraits",
    "healingTypes",
    "itemBonuses",
    "languages",
    "levels",
    "magicTraditions",
    "magicTraditions",
    "martialSkills",
    "monsterTraits",
    "npcAttackTraits",
    "otherArmorTags",
    "otherConsumableTags",
    "otherWeaponTags",
    "preciousMaterialGrades",
    "preciousMaterials",
    "preparationType",
    "prerequisitePlaceholders",
    "proficiencyLevels",
    "rarityTraits",
    "saves",
    "senses",
    "skillList",
    "skills",
    "speedTypes",
    "spellComponents",
    "spellLevels",
    "spellTraits",
    "spellTypes",
    "traitsDescriptions",
    "vehicleTraits",
    "weaponCategories",
    "weaponDamage",
    "weaponDescriptions",
    "weaponGroups",
    "weaponHands",
    "weaponMAP",
    "weaponPotencyRunes",
    "weaponPropertyRunes",
    "weaponReload",
    "weaponStrikingRunes",
    "weaponTraits",
] as const;

type SelectableTagField = typeof SELECTABLE_TAG_FIELDS[number];

export { SELECTABLE_TAG_FIELDS, SelectableTagField, TAG_SELECTOR_TYPES, TagSelectorType };
