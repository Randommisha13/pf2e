import { ActorPF2e } from "@actor/base";
import { ItemPF2e } from "@item/base";
import { ActiveEffectPF2e } from "@module/active-effect";
import { ChatLogPF2e, CompendiumDirectoryPF2e, EncounterTrackerPF2e } from "@module/apps/ui";
import { ChatMessagePF2e } from "@module/chat-message";
import { MacroPF2e } from "@module/macro";
import { RuleElementPF2e, RuleElements } from "@module/rules/rules";
import type { HomebrewSettingsKey, HomebrewTag } from "@system/settings/homebrew";
import { StatusEffects } from "@scripts/actor/status-effects";
import { PF2ECONFIG, StatusEffectIconTheme } from "@scripts/config";
import { DicePF2e } from "@scripts/dice";
import { rollActionMacro, rollItemMacro } from "@scripts/macros/hotbar";
import { launchTravelSheet } from "@scripts/macros/travel/travel-speed-sheet";
import { calculateXP } from "@scripts/macros/xp";
import { EffectsPanel } from "@module/apps/effects-panel";
import { EffectTracker } from "@system/effect-tracker";
import { CheckPF2e } from "@system/rolls";
import { WorldClock } from "@module/apps/world-clock";
import { EncounterPF2e, CombatantPF2e } from "./module/encounter";
import { ConditionManager } from "./module/system/conditions";
import {
    AbilityModifier,
    CheckModifier,
    ModifierPF2e,
    MODIFIER_TYPE,
    ProficiencyModifier,
    StatisticModifier,
} from "./module/modifiers";
import { UserPF2e } from "@module/user";
import {
    AmbientLightDocumentPF2e,
    MeasuredTemplateDocumentPF2e,
    ScenePF2e,
    TileDocumentPF2e,
    TokenDocumentPF2e,
} from "@module/scene";
import { CompendiumBrowser } from "@module/apps/compendium-browser";
import { LicenseViewer } from "@module/apps/license-viewer";
import { remigrate } from "@scripts/system/remigrate";
import { FolderPF2e } from "@module/folder";
import { CanvasPF2e } from "@module/canvas";
import { FogExplorationPF2e } from "@module/fog-exploration";
import { ActorImporter } from "@system/importer/actor-importer";
import { TextEditorPF2e } from "@system/text-editor";

declare global {
    interface Game {
        pf2e: {
            actions: Record<string, Function>;
            compendiumBrowser: CompendiumBrowser;
            licenseViewer: LicenseViewer;
            worldClock: WorldClock;
            effectPanel: EffectsPanel;
            effectTracker: EffectTracker;
            rollActionMacro: typeof rollActionMacro;
            rollItemMacro: typeof rollItemMacro;
            gm: {
                calculateXP: typeof calculateXP;
                launchTravelSheet: typeof launchTravelSheet;
            };
            system: {
                remigrate: typeof remigrate;
            };
            importer: {
                actor: typeof ActorImporter;
            };
            Dice: typeof DicePF2e;
            StatusEffects: typeof StatusEffects;
            ConditionManager: typeof ConditionManager;
            ModifierType: typeof MODIFIER_TYPE;
            Modifier: typeof ModifierPF2e;
            AbilityModifier: typeof AbilityModifier;
            ProficiencyModifier: typeof ProficiencyModifier;
            StatisticModifier: typeof StatisticModifier;
            CheckModifier: typeof CheckModifier;
            Check: typeof CheckPF2e;
            RuleElements: typeof RuleElements;
            RuleElement: typeof RuleElementPF2e;
            TextEditor: typeof TextEditorPF2e;
        };
    }

    interface ConfigPF2e extends ConfiguredConfig {
        debug: ConfiguredConfig["debug"] & {
            ruleElement: boolean;
        };
        PF2E: typeof PF2ECONFIG;
        time: {
            roundTime: number;
        };
    }

    const CONFIG: ConfigPF2e;
    const canvas: CanvasPF2e;
    namespace globalThis {
        // eslint-disable-next-line no-var
        var game: Game<ActorPF2e, ChatMessagePF2e, EncounterPF2e, FolderPF2e, ItemPF2e, MacroPF2e, ScenePF2e, UserPF2e>;
    }

    interface ClientSettings {
        get(module: "pf2e", setting: "automation.rulesBasedVision"): boolean;
        get(module: "pf2e", setting: "automation.effectExpiration"): boolean;
        get(module: "pf2e", setting: "automation.actorsDeadAtZero"): "neither" | "npcsOnly" | "pcsOnly" | "both";
        get(module: "pf2e", setting: "automation.lootableNPCs"): boolean;

        get(module: "pf2e", setting: "ancestryParagonVariant"): boolean;
        get(module: "pf2e", setting: "deathIcon"): ImagePath;
        get(module: "pf2e", setting: "dualClassVariant"): boolean;
        get(module: "pf2e", setting: "freeArchetypeVariant"): boolean;
        get(module: "pf2e", setting: "staminaVariant"): 0 | 1;

        get(module: "pf2e", setting: "metagame.tokenSetsNameVisibility"): boolean;
        get(module: "pf2e", setting: "metagame.partyVision"): boolean;
        get(module: "pf2e", setting: "metagame.secretDamage"): boolean;
        get(module: "pf2e", setting: "metagame.showResults"): "none" | "gm" | "owner" | "all";
        get(module: "pf2e", setting: "metagame.showDC"): "none" | "gm" | "owner" | "all";

        get(module: "pf2e", setting: "tokens.autoscale"): boolean;

        get(module: "pf2e", setting: "worldClock.dateTheme"): "AR" | "IC" | "AD" | "CE";
        get(module: "pf2e", setting: "worldClock.syncDarkness"): boolean;
        get(module: "pf2e", setting: "worldClock.timeConvention"): 24 | 12;
        get(module: "pf2e", setting: "worldClock.worldCreatedOn"): string;

        get(module: "pf2e", setting: "homebrew.weaponCategories"): HomebrewTag<"weaponCategories">[];
        get(module: "pf2e", setting: HomebrewSettingsKey): HomebrewTag[];

        get(module: "pf2e", setting: "proficiencyVariant"): "ProficiencyWithLevel" | "ProficiencyWithoutLevel";

        get(module: "pf2e", setting: "enabledRulesUI"): boolean;
        get(module: "pf2e", setting: "ignoreCoinBulk"): boolean;
        get(module: "pf2e", setting: "statusEffectType"): StatusEffectIconTheme;
        get(module: "pf2e", setting: "worldSchemaVersion"): number;
        get(module: "pf2e", setting: "drawCritFumble"): boolean;
        get(module: "pf2e", setting: "critFumbleButtons"): boolean;
        get(module: "pf2e", setting: "journalEntryTheme"): "pf2eTheme" | "foundry";
        get(module: "pf2e", setting: "identifyMagicNotMatchingTraditionModifier"): 0 | 2 | 5 | 10;
    }

    interface ClientSettingsMap {
        get(key: "pf2e.worldClock.worldCreatedOn"): ClientSettingsData & { default: string };
        get(key: "core.chatBubblesPan"): ClientSettingsData & { default: boolean };
    }

    const BUILD_MODE: "development" | "production";

    const _templateCache: Record<string, unknown>;
}

type ConfiguredConfig = Config<
    AmbientLightDocumentPF2e,
    ActiveEffectPF2e,
    ActorPF2e,
    ChatLogPF2e,
    ChatMessagePF2e,
    EncounterPF2e,
    CombatantPF2e,
    EncounterTrackerPF2e,
    CompendiumDirectoryPF2e,
    FogExplorationPF2e,
    FolderPF2e,
    ItemPF2e,
    MacroPF2e,
    MeasuredTemplateDocumentPF2e,
    TileDocumentPF2e,
    TokenDocumentPF2e,
    ScenePF2e,
    UserPF2e
>;
