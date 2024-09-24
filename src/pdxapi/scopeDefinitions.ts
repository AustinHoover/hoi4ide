export enum SCOPE_TYPE {
    ANY,
    COUNTRY,
    STATE,
    CHARACTER_DEFN,
    UNIT_LEADER,
    COUNTRY_LEADER,
    OPERATIVE,
    COMBAT,
    DIVISION,
}

export enum TARGET_SCOPE {
    ANY,
    COUNTRY,
    STATE,
    CHARACTER_DEFN,
    UNIT_LEADER,
    COUNTRY_LEADER,
    OPERATIVE,
    COMBAT,
    DIVISION,
    CONDITIONAL, //depends on usage
}

export interface Scope {
    name?: string,
    regex?: RegExp,
    allowedScopes: SCOPE_TYPE[],
    targetType: TARGET_SCOPE,
}

export const scopeDeclarations: Scope[] = [

    //
    //general
    //
    {
        name: "limit",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.ANY,
    },

    //
    //Triggers
    //
    {
        name: "all_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_other_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_other_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_country_with_original_tag",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_country_with_original_tag",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_neighbor_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_neighbor_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_home_area_neighbor_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_guaranteed_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_guaranteed_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_allied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_allied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_occupied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_occupied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_enemy_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_enemy_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_subject_countries",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_subject_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "any_country_with_core",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "all_state",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "any_state",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "all_neighbor_state",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "any_neighbor_state",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "all_owned_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "any_owned_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "all_core_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "any_core_State",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "all_controlled_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "any_controlled_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "all_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "any_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "all_army_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "any_army_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "all_navy_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "any_navy_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "all_operative_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.OPERATIVE,
    },
    {
        name: "any_operative_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.OPERATIVE,
    },
    {
        name: "all_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.CHARACTER_DEFN,
    },
    {
        name: "any_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.CHARACTER_DEFN,
    },
    {
        name: "any_country_division",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.DIVISION,
    },
    {
        name: "any_state_division",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.DIVISION,
    },

    //
    //effect scopes
    //
    {
        name: "every_possible_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_country",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_other_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_other_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_country_with_original_tag",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_country_with_original_tag",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_neighbor_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_neighbor_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_occupied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_occupied_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_enemy_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_enemy_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_subject_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "random_subject_country",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "every_state",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_state",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "every_neighbor_state",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_neighbor_state",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "every_owned_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_owned_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "every_core_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_core_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "every_controlled_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_controlled_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "random_owned_controlled_state",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "every_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "random_unit_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "every_army_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "random_army_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "global_every_army_leader",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "every_navy_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "random_navy_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.UNIT_LEADER,
    },
    {
        name: "every_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.OPERATIVE,
    },
    {
        name: "random_operative",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.OPERATIVE,
    },
    {
        name: "every_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.CHARACTER_DEFN,
    },
    {
        name: "random_character",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.CHARACTER_DEFN,
    },
    {
        name: "every_country_division",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.DIVISION,
    },
    {
        name: "random_country_division",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.DIVISION,
    },
    {
        name: "every_state_division",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.DIVISION,
    },
    {
        name: "random_state_division",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.DIVISION,
    },

    //dual scopes
    {
        name: "ROOT",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
    {
        name: "THIS",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
    {
        name: "PREV",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
    {
        name: "FROM",
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
    {
        regex: new RegExp(/^[A-Z][A-Z][A-Z]$/),
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "overlord",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "faction_leader",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        regex: new RegExp(/^[0-9]$/),
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.STATE,
    },
    {
        name: "controller",
        allowedScopes: [SCOPE_TYPE.STATE],
        targetType: TARGET_SCOPE.COUNTRY,
    },
    {
        name: "capital_scope",
        allowedScopes: [SCOPE_TYPE.COUNTRY],
        targetType: TARGET_SCOPE.STATE,
    },
    //while you may theoretically be allowed to declare a character in any scope at all times, IDE gonna limit it to never
    // {
    //     regex: new RegExp(/[A-Z][A-Z][A-Z]_.*/),
    //     allowedScopes: [SCOPE_TYPE.ANY],
    //     targetType: TARGET_SCOPE.CHARACTER_DEFN,
    // },
    {
        regex: new RegExp(/event_target:/),
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
    {
        regex: new RegExp(/var:/),
        allowedScopes: [SCOPE_TYPE.ANY],
        targetType: TARGET_SCOPE.CONDITIONAL,
    },
]