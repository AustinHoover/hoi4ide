import { effectDefinitions } from "./effectDefinitions"
import { PARAMETER_TYPE } from "./parameterTypes"
import { dateRegex } from "./regex"
import { triggerDefinitions } from "./triggerDefinitions"


export interface PdxObject {
    name: string,
    type: PARAMETER_TYPE,
    requiredKeyTree?: (string | RegExp)[], //most child -> most parent key
}


let triggerParameterMap: PdxObject[] = []
triggerDefinitions.forEach(trigger => {
    if(trigger.parameters){
        trigger.parameters.forEach(parameter => {
            if(trigger.name){
                triggerParameterMap.push({
                    name: parameter.name,
                    type: parameter.type,
                    requiredKeyTree: [trigger.name]
                })
            }
        })
    }
})

let effectParameterMap: PdxObject[] = []
effectDefinitions.forEach(effect => {
    if(effect.parameters){
        effect.parameters.forEach(parameter => {
            if(effect.name){
                triggerParameterMap.push({
                    name: parameter.name,
                    type: parameter.type,
                    requiredKeyTree: [effect.name]
                })
            }
        })
    }
})


export const objectDefinitions: PdxObject[] = [
    //ai
    {
        name: "modifier",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["ai_will_do"]
    },
    {
        name: "ai_will_do",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["advisor"]
    },
    //state history file
    {
        name: "victory_points",
        type: PARAMETER_TYPE.ARRAY_NUMBER,
    },
    {
        name: "original_tag",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "owner",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["history","state"]
    },
    {
        name: "owner",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: [dateRegex,"history","state"]
    },
    {
        name: "controller",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["history","state"]
    },
    {
        name: "controller",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: [dateRegex,"history","state"]
    },
    {
        name: "state_category",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["state"]
    },
    //character file
    //general
    {
        name: "instance",
        type: PARAMETER_TYPE.OBJECT,
        // requiredKeyTree: ["instance"]
    },
    {
        name: "gender",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        // requiredKeyTree: ["instance"]
    },
    //portraits
    {
        name: "large",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["civilian","portraits"]
    },
    {
        name: "small",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["civilian","portraits"]
    },
    {
        name: "large",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["army","portraits"]
    },
    {
        name: "small",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["army","portraits"]
    },
    //country leader
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["country_leader"]
    },
    {
        name: "expire",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["country_leader"]
    },
    {
        name: "ideology",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["country_leader"]
    },
    //navy leader
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["navy_leader"]
    },
    //field marchal
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["field_marshal"]
    },
    //corps commander
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["corps_commander"]
    },
    //operative
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["create_operative_leader"]
    },
    //advisor
    {
        name: "traits",
        type: PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "idea_token",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "ledger",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "cost",
        type: PARAMETER_TYPE.NUMBER,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "available",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "available",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["instance","advisor"]
    },
    {
        name: "visible",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["advisor"]
    },
    {
        name: "visible",
        type: PARAMETER_TYPE.OBJECT,
        requiredKeyTree: ["instance","advisor"]
    },
    //country history file
    {
        name: "ruling_party",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
    },
    {
        name: "fleet_in_being",
        type: PARAMETER_TYPE.NUMBER,
    },
    //tank
    {
        name: "main_armament_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "turret_type_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "suspension_type_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "armor_type_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "engine_type_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "special_type_slot_1",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "special_type_slot_2",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "special_type_slot_3",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "special_type_slot_4",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "special_type_slot_5",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    //ship
    {
        name: "fixed_ship_battery_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_anti_air_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_fire_control_system_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_radar_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_engine_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_secondaries_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_armor_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "front_1_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "front_2_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "mid_1_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "mid_2_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "mid_3_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "rear_1_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "rear_2_custom_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_torpedo_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_deck_slot_1",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_ship_deck_slot_2",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    //airplane
    {
        name: "fixed_main_weapon_slot",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_auxiliary_weapon_slot_1",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_auxiliary_weapon_slot_2",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    {
        name: "fixed_auxiliary_weapon_slot_3",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: ["modules","create_equipment_variant"]
    },
    //
    //api based
    //
    {
        name: "oob",
        type: PARAMETER_TYPE.STRING_NOQUOTES,
        requiredKeyTree: [dateRegex]
    },
    ...triggerParameterMap,
    ...effectParameterMap,
]