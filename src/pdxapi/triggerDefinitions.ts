import { NamedParameter, PARAMETER_TYPE } from "./parameterTypes";
import { SCOPE_TYPE } from "./scopeDefinitions";


export interface Trigger {
    name?: string,
    nameRegex?: RegExp,
    allowedScopes: SCOPE_TYPE[],
    nonNamedParameter?: PARAMETER_TYPE, // is the type of the non-named parameter if it exists
    parameters?: NamedParameter[],
}



export const triggerDefinitions: Trigger[] = [
    //flow controls
    {
        name: "AND",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "OR",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "NOT",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "count_triggers",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "if",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "else_if",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "else",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "hidden_trigger",
        allowedScopes: [SCOPE_TYPE.ANY],
    },
    {
        name: "custom_trigger_tooltip",
        allowedScopes: [SCOPE_TYPE.ANY],
    },


    //any scope
    {
        name: "always",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_global_flag",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_dlc",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "has_start_date",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.DATE,
    },
    {
        name: "date",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.DATE,
    },
    {
        name: "difficulty",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "has_any_custom_difficulty_setting",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_custom_difficulty_setting",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "game_rules_allow_achievements",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "country_exists",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_ironman",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_historical_focus_on",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_tutorial",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_debug",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "threat",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "has_game_rule",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //variables
    {
        name: "has_variable",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "check_variable",
        allowedScopes: [SCOPE_TYPE.ANY],
        parameters: [
            {
                name: "var",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "value",
                type: PARAMETER_TYPE.NUMBER,
                required: true,
            },
            {
                name: "compare",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: false,
            },
        ],
    },

    //debugging
    {
        name: "log",
        allowedScopes: [SCOPE_TYPE.ANY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "print_variables",
        allowedScopes: [SCOPE_TYPE.ANY],
        parameters: [
            {
                name: "print_global",
                type: PARAMETER_TYPE.BOOLEAN,
                required: false,
            },
            {
                name: "var_list",
                type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
                required: true,
            },
            {
                name: "file",
                type: PARAMETER_TYPE.ARRAY_STRING_QUOTES,
                required: true,
            },
            {
                name: "text",
                type: PARAMETER_TYPE.STRING_QUOTES,
                required: true,
            },
            {
                name: "append",
                type: PARAMETER_TYPE.BOOLEAN,
                required: false,
            }
        ],
    },

    //
    //Country
    //
    ///general
    {
        name: "exists",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "tag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "original_tag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_ai",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_collaboration",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "target",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "value",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ],
    },
    {
        name: "has_country_flag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_cosmetic_tag",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_event_target",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_decision",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_dynamic_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
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
            }
        ],
    },
    {
        name: "has_active_mission",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_focus_tree",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_completed_focus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "focus_progress",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        parameters: [
            {
                name: "focus",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "progress",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ]
    },
    {
        name: "has_country_custom_difficulty_setting",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_terrain",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_dynamic_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "num_of_supply_nodes",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "has_completed_custom_achievement",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        parameters: [
            {
                name: "mod",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "achievement",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ]
    },

    //politics
    {
        name: "has_political_power",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "political_power_daily",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "political_power_growth",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "command_power",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "command_power_daily",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_stability",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        //TODO: handle
        nameRegex: new RegExp(/democracy/),
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_government",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_elections",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_staging_coup",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_target_of_coup",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_civil_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "civilwar_target",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_manpower_for_recruit_change_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        parameters: [
            {
                name: "value",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
            {
                name: "group",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ]
    },
    {
        name: "has_rule",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_casualties_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_convoys_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_bombing_war_support",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    //balance of power
    {
        name: "has_power_balance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ]
    },
    {
        name: "has_any_power_balance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "power_balance_value",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "value",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ],
    },
    {
        name: "power_balance_daily_change",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "value",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ],
    },
    {
        name: "power_balance_weekly_change",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "value",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ],
    },
    {
        name: "is_power_balance_in_range",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "range",
                type: PARAMETER_TYPE.COMPARISON,
                required: true,
            },
        ],
    },
    {
        name: "is_power_balance_side_active",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "side",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ],
    },
    {
        name: "has_power_balance_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        parameters: [
            {
                name: "id",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
            {
                name: "modifier",
                type: PARAMETER_TYPE.STRING_NOQUOTES,
                required: true,
            },
        ],
    },

    //buildings
    {
        nameRegex: new RegExp(/(arms_factory)/),
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_military_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_civilian_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_naval_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_available_military_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_available_civilian_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_available_naval_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_controlled_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_owned_factories",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_civilian_factories_available_for_projects",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "ic_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_damaged_buildings",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_built",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },

    //technology
    {
        name: "has_tech",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_researching_technology",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "can_research",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "original_research_slots",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "amount_research_slots",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_in_tech_sharing_group",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "num_tech_sharing_groups",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_tech_bonus",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "land_doctrine_level",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_researched_technologies",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    //ideas
    {
        name: "has_idea",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_idea_with_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_allowed_idea_with_traits",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_available_idea_with_traits",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "amount_taken_ideas",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },

    //diplomacy
    {
        name: "is_major",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_ally_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_in_faction_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_in_faction",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_faction_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_spymaster",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "num_faction_members",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_non_aggression_pact_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_guaranteed_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_guaranteed",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_military_access_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "gives_military_access_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_neighbor_of",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_owner_neighbor_of",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_puppet_of",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_subject_of",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_puppet",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_subject",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_subject",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "num_subjects",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_autonomy_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "compare_autonomy_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "compare_autonomy_progress_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_opinion_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_opinion",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_relation_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_legitimacy",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_exile_host",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_hosting_exile",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_government_in_exile",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_exile_in",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "received_expeditionary_forces",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "can_declare_war_on",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "foreign_manpower",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_embargoed_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_embargoing",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //war
    {
        name: "has_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_war_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_offensive_war_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_defensive_war_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_offensive_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_defensive_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_war_together_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_war_with_major",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_war_with_wargoal_against",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "surrender_progress",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "any_war_score",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_capitulated",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "days_since_capitulated",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_border_war_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_border_war_between",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_border_war",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_added_tension_amount",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_wargoal_against",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_justifying_wargoal_against",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_annex_war_goal",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "any_claim",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_in_peace_conference",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "controls_province",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //state
    {
        name: "controls_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "owns_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "num_of_controlled_states",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_occupied_states",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_full_control_of_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "core_compliance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "core_resistance",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "garrison_manpower_need",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_core_occupation_modifier",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "occupation_law",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //military
    {
        name: "has_army_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_air_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_navy_experience",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_manpower",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_army_manpower",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "manpower_per_military_factory",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "conscription_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "current_conscription_amount",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "target_conscription_amount",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_divisions",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_nukes",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "casualties",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "casualties_k",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "casualties_inflicted_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "amount_manpower_in_deployment_queue",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_attache_from",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_attache",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_lend_leasing",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_template",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_QUOTES,
    },
    {
        name: "has_template_majority_unit",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_template_containing_unit",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "naval_strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "naval_strength_comparison",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "alliance_strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "alliance_naval_strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "enemies_strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "enemies_naval_strength_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_army_size",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_navy_size",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_deplooyedd_air_force_size",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "divisions_in_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "army_manpower_in_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "divisions_in_border_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "num_divisions_in_states",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "num_battalions_in_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "ships_in_state_ports",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "num_planes_stationed_in_regions",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_volunteers_amount_from",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "convoy_threat",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_mined",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_mines",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "mine_threat",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    //equipment
    {
        name: "stockpile_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_equipment",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.MAP,
    },
    {
        name: "has_any_license",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_licensing_any_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_licensing_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_license",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "fuel_ratio",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_fuel",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_design_based_on",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //intelligence
    {
        name: "estimated_intel_max_piercing",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "estimated_intel_max_armor",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "compare_intel_with",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "intel_level_over",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_intelligence_agency",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "network_national_coverage",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "network_strength",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_done_agency_upgrade",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "agency_upgrade_number",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "decryption_progress",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_captured_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_finished_collecting_for_operation",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "is_preparing_operation",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        //TODO: handle
    },
    {
        name: "is_running_operation",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
        //TODO: handle
    },
    {
        name: "num_finished_operations",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_operation_token",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "is_active_decryption_bonuses_enabled",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_cryptology_department_active",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_decrypting",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_fully_decrypted",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "num_fake_intel_divisions",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_free_operative_slots",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_operative_slots",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_of_operatives",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    //ai
    {
        name: "ai_irrationality",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "ai_liberate_desire",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "ai_has_role_division",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "ai_has_role_template",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "ai_wants_divisions",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_template_ai_majority_unit",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //country scoped triggers related to characters
    {
        name: "can_be_country_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_country_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_country_leader_ideology",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_country_leader_with_trait",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_female",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },

    //peace conferences
    {
        name: "pc_is_winner",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_on_winning_side",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_loser",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_untouched_loser",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_on_same_side_as",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "pc_is_liberated",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_liberated_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "pc_is_puppeted",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "ps_is_puppeted_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "pc_is_forced_government",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_forced_government_by",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "pc_is_forced_government_to",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "pc_total_score",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "pc_current_score",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    //
    //States
    //
    //general
    {
        name: "state",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "region",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "building",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "free_building_slots",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "non_damaged_building_level",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "any_province_building_level",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "has_state_flag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_state_flag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
        //TODO: handle
    },
    {
        name: "state_population",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "state_population_k",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_capital",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_controlled_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_fully_controlled_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_owned_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_claimed_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_core_of",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_owned_and_controlled_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_demilitarized_zone",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_border_conflict",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_in_home_area",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_coastal",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_island_state",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_on_continent",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_impassable",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_state_category",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "state_strategic_value",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "state_and_terrain_strategic_value",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "num_owned_neighbour_states",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "distance_to",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "ships_in_area",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "has_resources_amount",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "has_resources_rights",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "has_resources_in_country",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "days_since_last_strategic_bombing",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_railway_connection",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "can_build_railway",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "has_railway_level",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
        //TODO: handle
    },
    {
        name: "pc_does_state_stack_demilitarized",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_does_state_stack_dismantled",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "pc_is_state_claimed_by",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //resistance and compliance
    {
        name: "compliance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "compliance_speed",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_active_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "resistance",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "resistance_speed",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "resistance_target",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "occupation_modifier",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "occupation_law",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "occupied_country_tag",
        allowedScopes: [SCOPE_TYPE.STATE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //
    //Character scoped
    //
    //general
    {
        name: "is_character",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "can_be_country_leader",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_country_leader",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_unit_leader",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_advisor",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_air_chief",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_army_chief",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_army_leader",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_navy_chief",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_navy_leader",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_high_command",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_corps_commander",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_operative",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_political_advisor",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_theorist",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_character_slot",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_air_ledger",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_army_ledger",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_navy_ledger",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_character_flag",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_trait",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_id",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.NUMBER,
    },
    {
        name: "not_already_hired_except_as",
        allowedScopes: [SCOPE_TYPE.CHARACTER_DEFN],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //country leader
    {
        name: "has_ideology",
        allowedScopes: [SCOPE_TYPE.COUNTRY_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_ideology_group",
        allowedScopes: [SCOPE_TYPE.COUNTRY_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },

    //unit leaders
    {
        name: "has_unit_leader_flag",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_leading_army",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_leading_army_group",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_leading_volunteer_group",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_leading_volunteer_group_with_original_country",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_field_marshal",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_assigned",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "can_select_trait",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "has_ability",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "skill",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "skill_advantage",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "planning_skill_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "logistics_skill_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "defense_skill_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "attack_skill_level",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "average_stats",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_border_war",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "num_units",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_exiled_leader",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_exiled_leader_from",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_female",
        allowedScopes: [SCOPE_TYPE.UNIT_LEADER],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //operatives
    {
        name: "has_nationality",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_operative_captured",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "operative_leader_mission",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "operative_leader_operation",
        allowedScopes: [SCOPE_TYPE.OPERATIVE],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },


    //
    //Combat
    //
    {
        name: "hardness",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "armor",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "dig_in",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "min_planning",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "fastest_unit",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "temperature",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "reserves",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_cavalry_ratio",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "has_combat_modifier",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_fighting_in_terrain",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "is_fighting_in_weather",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
    },
    {
        name: "phase",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "recon_advantage",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "night",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "frontage_full",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_flanked_opponent",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_max_planning",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_reserves",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_amphibious_invasion",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_attacker",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_defender",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_winning",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "is_fighting_air_units",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "less_combat_width_than_opponent",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_carrier_airwings_on_mission",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
    {
        name: "has_carrier_airwings_in_own_combat",
        allowedScopes: [SCOPE_TYPE.COMBAT],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },

    //
    //division
    //
    {
        name: "division_has_majority_template",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "division_has_battalion_in_template",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "unit_strength",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },

    {
        name: "unit_organisation",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.COMPARISON,
    },
    {
        name: "is_unit_template_reserves",
        allowedScopes: [SCOPE_TYPE.DIVISION],
        nonNamedParameter: PARAMETER_TYPE.BOOLEAN,
    },
]
