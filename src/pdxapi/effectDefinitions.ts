import { NamedParameter, PARAMETER_TYPE } from "./parameterTypes";
import { SCOPE_TYPE } from "./scopeDefinitions";

export interface Effect {
    name?: string,
    nameRegex?: RegExp,
    allowedScopes: SCOPE_TYPE[],
    nonNamedParameter?: PARAMETER_TYPE, // is the type of the non-named parameter if it exists
    parameters?: NamedParameter[],
}



export const effectDefinitions: Effect[] = [
    //
    //any scope
    //
    //general
    {
        name: "add_dynamic_modifier",
        allowedScopes: [SCOPE_TYPE.ANY],
        parameters: [
            {
                name: "modifier",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "scope",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "days",
                type: PARAMETER_TYPE.NUMBER,
                required: false,
            },
        ]
    },
    {
        name: "remove_dynamic_modifier",
        allowedScopes: [SCOPE_TYPE.ANY],
        parameters: [
            {
                name: "modifier",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ]
    },
    {
        name: "force_update_dynamic_modifier",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_global_flag",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "play_song",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "clr_global_flag",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_global_flag",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "round_variable",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "clear_variable",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_variable",
        allowedScopes: [SCOPE_TYPE.ANY],
        //todo
        // parameters: [
        //     {
        //         name: "var",
        //         type: PARAMETER_TYPE.STRING_NOQUOTES,
        //         required: true,
        //     },
        //     {
        //         name: "value",
        //         type: PARAMETER_TYPE.STRING_NOQUOTES,
        //         required: true,
        //     },
        // ]
    },
    {
        name: "custom_effect_tooltip",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "log",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "save_event_target_as",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "save_global_event_target_as",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "clear_global_event_target",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        //TODO: handle
    },
    {
        name: "clear_global_event_target",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "sound_effect",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "randomize_weather",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_province_name",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "reset_province_name",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "create_dynamic_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "damage_units",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "create_entity",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "destroy_entity",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_entity_movement",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_entity_position",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_entity_rotation",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_entity_scale",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_entity_animation",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "build_railway",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },

    //border wars
    {
        name: "start_border_war",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_border_war_data",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "cancel_border_war",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "finalize_border_war",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },

    //
    //country scope
    //
    //general
    {
        name: "set_country_flag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        //TODO: handle
    },
    {
        name: "clr_country_flag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_country_flag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "country_event",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "news_event",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_cosmetic_tag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "drop_cosmetic_tag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_rule",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_party_rule",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_relation_rule",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "scoped_sound_effect",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "scoped_play_song",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "goto_province",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "goto_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "change_tag_from",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "reserve_dynamic_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "force_update_map_mode",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "add_ai_strategy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },

    //country-scoped state-related effects
    {
        name: "add_state_core",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "remove_state_core",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_capital",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_state_claim",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "remove_state_claim",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_state_owner",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_state_controller",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "transfer_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_province_controller",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //mana
    {
        name: "add_political_power",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_political_power",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_stability",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_stability",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_command_power",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_manpower",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "army_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "navy_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "air_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //politics
    {
        name: "hold_election",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_popularity",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "ideology",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "popularity",
                type: PARAMETER_TYPE.NUMBER,
                required: true,
            }
        ],
    },
    {
        name: "set_politics",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_popularities",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_political_party",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_party_name",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "ideology",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "long_name",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: true,
            },
            {
                name: "name",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: true,
            },
        ]
    },

    //balance of power
    {
        name: "set_power_balance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_power_balance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_power_balance_value",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_power_balance_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_power_balance_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_all_power_balance_modifiers",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_power_balance_gfx",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //diplomacy
    {
        name: "set_major",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "create_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_to_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "leave_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "remove_from_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "dismantle_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_faction_name",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_faction_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_faction_spymaster",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "release",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "release_on_controlled",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "release_puppet",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "release_puppet_on_controlled",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "release_autonomy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "give_guarantee",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        //TODO: handle
    },
    {
        name: "give_military_access",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "recall_attache",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "diplomatic_relation",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "country",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "relation",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "active",
                type: PARAMETER_TYPE.BOOLEAN,
                required: true,
            },
        ]
    },
    {
        name: "add_opinion_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "target",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "modifier",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            }
        ]
    },
    {
        name: "remove_opinion_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "target",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "modifier",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            }
        ]
    },
    {
        name: "reverse_add_opinion_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_relation_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_relation_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_collaboration",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_collaboration",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "recall_volunteers_from",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_occupation_law",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_occupation_law_where_available",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "send_embargo",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "break_embargo",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //autonomy
    {
        name: "puppet",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "end_puppet",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_autonomy_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_autonomy_score",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_autonomy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //governments_in_exile
    {
        name: "add_legitimacy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_legitimacy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "become_exiled_in",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "end_exile",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //war
    {
        name: "add_threat",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_named_threat",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "annex_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_to_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "declare_war_on",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "target",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "type",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "generator",
                type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
                required: false,
            },
        ],
    },
    {
        name: "white_peace",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "start_peace_conference",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_truce",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_wargoal",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "target",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "type",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "generator",
                type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
                required: true,
            },
        ]
    },
    {
        name: "remove_wargoal",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "start_civil_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_civil_war_target",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "transfer_units_fraction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_nuclear_bombs",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "launch_nuke",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //resource
    {
        name: "add_resource",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_import",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "give_resource_rights",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_resource_rights",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_fuel",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_fuel",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_fuel_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //buildings
    {
        name: "add_offsite_building",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "modify_building_resources",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    
    //national focuses
    {
        name: "load_focus_tree",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "unlock_national_focus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "complete_national_focus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "uncomplete_national_focus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "mark_focus_tree_layout_dirty",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //decisions
    {
        name: "activate_decision",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "activate_targeted_decision",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_targeted_decision",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "unlock_decision_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "unlock_decision_category_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_days_remove",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_decision",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_decision_on_cooldown",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //missions
    {
        name: "activate_mission",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "activate_mission_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_mission",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_days_mission_timeout",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //technologies and doctrines
    {
        name: "add_research_slot",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_research_slots",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_tech_bonus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "bonus",
                type: PARAMETER_TYPE.NUMBER,
                required: true,
            },
            {
                name: "uses",
                type: PARAMETER_TYPE.NUMBER,
                required: true,
            },
            {
                name: "ahead_reduction",
                type: PARAMETER_TYPE.NUMBER,
                required: false,
            },
            {
                name: "category",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "technology",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "name",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ]
    },
    {
        name: "set_technology",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_to_tech_sharing_group",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_from_tech_sharing_group",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_tech_sharing_bonus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "inherit_technology",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_doctrine_cost_reduction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //ideas
    {
        name: "add_ideas",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
    },
    {
        name: "add_timed_idea",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "modify_timed_idea",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "swap_ideas",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_ideas",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
    },
    {
        name: "remove_ideas_with_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "show_ideas_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //units
    {
        name: "load_oob",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "division_template",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_units_to_division_template",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_division_template_lock",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "country_lock_all_division_template",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_division_force_allow_recruiting",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_division_template_cap",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "clear_division_template_cap",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "delete_unit_template_and_units",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "delete_unit",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "delete_units",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_railway_gun",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "teleport_railway_guns_to_deploy_province",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //equipment
    {
        name: "set_equipment_fraction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_equipment_to_stockpile",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "type",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "amount",
                type: PARAMETER_TYPE.NUMBER,
                required: true,
            },
            {
                name: "producer",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "variant_name",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: false,
            },
        ]
    },
    {
        name: "send_equipment",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "send_equipment_fraction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_production_license",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_equipment_variant",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "name",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: true,
            },
            {
                name: "type",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "parent_version",
                type: PARAMETER_TYPE.NUMBER,
                required: false,
            },
            {
                name: "obsolete",
                type: PARAMETER_TYPE.BOOLEAN,
                required: false,
            },
            {
                name: "name_group",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "role_icon_index",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "model",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
            {
                name: "icon",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: false,
            },
        ],
    },
    {
        name: "add_equipment_production",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //military
    {
        name: "destroy_ships",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "transfer_navy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "transfer_ship",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_ship",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_mines",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_ace",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //intelligence
    {
        name: "create_intelligence_agency",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "upgrade_intelligence_agency",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_decryption",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_intel",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_operation_token",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_operation_token",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "capture_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_operative_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "free_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "free_random_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "kill_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "turn_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "steal_random_tech_bonus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //characters
    {
        name: "set_nationality",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "retire_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_character_name",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "character_list_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //unit leaders
    {
        name: "create_corps_commander",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_field_marshal",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "create_navy_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_corps_commander_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_field_marshal_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_naval_commander_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "show_unit_leaders_tooltip",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //country leaders
    {
        name: "create_country_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_country_leader_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "promote_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_country_leader_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "kill_ideology_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "retire_ideology_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "kill_country_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "retire_country_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_country_leader_ideology",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_country_leader_description",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_country_leader_name",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_country_leader_portrait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_country_leader_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_country_leader_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "swap_ruler_traits",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //advisors
    {
        name: "activate_advisor",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "deactivate_advisor",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_advisor_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_advisor_role",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //history
    {
        name: "recruit_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "generate_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_oob",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_naval_oob",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_air_oob",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_keyed_oob",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //
    //state-scoped
    //
    //general
    {
        name: "state_event",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_state_flag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "clr_state_flag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_state_flag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_state_name",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "reset_state_name",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "add_claim_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_claim_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_core_of",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_core_of",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_demilitarized_zone",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_state_category",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_state_modifier",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_manpower",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_resource",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_border_war",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "create_unit",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "teleport_armies",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_province_modifier",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_province_modifier",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_victory_points",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_victory_points",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_state_province_controller",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "transfer_state_do",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_state_owner_to",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_state_controller_to",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //buildings
    {
        name: "add_extra_state_Shared_building_slots",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_building_construction",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_building_level",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "damage_building",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_building",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //resistasnce and compliance
    {
        name: "add_compliance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_resistance_target",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "cancel_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "force_disable_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "force_enable_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_resistance_target",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_compliance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "start_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "set_garrison_strength",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "set_occupation_law",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //
    //character scope
    //
    //general
    {
        name: "set_character_flag",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_character_name",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_character_flag",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "clr_character_flag",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "retire",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "set_nationality",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "set_portraits",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_trait",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_trait",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_corps_commander_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_field_marshal_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_naval_commander_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_country_leader_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "promote_character",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_country_leader_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_advisor_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_advisor_role",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    
    //
    //unit leader scoped
    //
    {
        name: "unit_leader_event",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "set_unit_leader_flag",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "clr_unit_leader_flag",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "modify_unit_leader_flag",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "promote_leader",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "demote_leader",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "add_unit_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "remove_unit_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_random_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
    },
    {
        name: "add_timed_unit_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "replace_unit_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle (no docs)
    },
    {
        name: "remove_exile_tag",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "gain_xp",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "remove_unit_leader",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "remove_unit_leader_role",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //
    //country leader
    //
    //general
    {
        name: "add_country_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "remove_country_leader_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "swap_country_leader_traits",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    
    //combat
    {
        name: "supply_units",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_max_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_skill_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_logistics_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_planning",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_defense",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_attack",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_coordination",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_maneuver",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "add_temporary_buff_to_units",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //
    //operative scoped
    //
    {
        name: "add_nationality",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "capture_operative",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "force_operative_leader_into_hiding",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "free_operative",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "harm_operative_leader",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "kill_operative",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "turn_operative",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "operative_leader_event",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },

    //
    //division scoped
    //
    {
        name: "destroy_unit",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "add_history_entry",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "change_division_template",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "add_random_valid_trait_from_unit",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "add_unit_medal_to_latest_entry",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },
    {
        name: "add_divisional_commander_xp",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "reseed_division_commander",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //
    //other scopes
    //
    {
        name: "execute_operation_coordinated_strike",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
        //TODO: handle
    },



]