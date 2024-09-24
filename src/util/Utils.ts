import { Jomini, Writer } from "jomini";
import { Scope } from "../interface/scope.interface";
import { AppContextInterface } from "../state/mainState.interface";
import { ScopeableObject } from "../interface/rawFile.interface";
import { scopeDeclarations, SCOPE_TYPE } from "../pdxapi/scopeDefinitions";
import { effectDefinitions } from "../pdxapi/effectDefinitions";
import { NamedParameter, PARAMETER_TYPE } from "../pdxapi/parameterTypes";
import { checkKeyTree, getEffect, getObject, getScope, getTrigger, lookupPotentialApiCall } from "../pdxapi/pdxApiUtils";
import { PdxObject } from "../pdxapi/objectDefinisions";
import { triggerDefinitions } from "../pdxapi/triggerDefinitions";


export const getDirectoryOfFile = (filePath: string): string => {
    return filePath.substring(0,filePath.lastIndexOf("\\")+1);
}

export const serializeArbitraryPDXObject = (input: any, jomini: Jomini): string => {
    return new TextDecoder().decode(jomini.write((writer) => {
        serializeArbitraryPDXObjectRecursive(input,[],writer)
    }))
}

const unquotedFields = [
    "graphical_culture",
    "graphical_culture_2d",
    "state_category",
    "slot",
    "idea_token",
    "original_tag",
    "has_government",
    "small",
    "large",
    "ideology",
    "expire",
    "ledger",
    "owner",
]

const stringArrayFields = [
    "traits",
]

const numberArrayFields = [
    "victory_points",
]

const customFields: string[] = [
    "path",
    ...stringArrayFields,
    ...unquotedFields,
]


// const unquotedProperties: string[] = [
//     "owner",
// ]

// const customProperties: string[] = [
//     "victory_points",
//     ...unquotedProperties,
// ]


const serializeSingleObject = (key: string, fieldRaw: any, keyTree: string[], jominiWriter: Writer) => {
    //TODO: propagate scope type correctly
    let pdxObject = getObject(key,keyTree,SCOPE_TYPE.ANY)
    // if(key === "SWI_upgrade_template_and_divisions"){
    //     debugger
    // }
    if(pdxObject){
        switch(pdxObject.type){
            case PARAMETER_TYPE.STRING_NOQUOTES: {
                jominiWriter.write_unquoted(key)
                jominiWriter.write_unquoted(fieldRaw)
            } break;
            case PARAMETER_TYPE.STRING_QUOTES:
                jominiWriter.write_unquoted(key)
                jominiWriter.write_quoted(fieldRaw)
            break;
            case PARAMETER_TYPE.BOOLEAN:
                jominiWriter.write_unquoted(key)
                if(fieldRaw){
                    jominiWriter.write_unquoted("yes")
                } else {
                    jominiWriter.write_unquoted("no")
                }
            break;
            case PARAMETER_TYPE.NUMBER: {
                jominiWriter.write_unquoted(key)
                jominiWriter.write_unquoted(fieldRaw + "")
            } break;
            case PARAMETER_TYPE.OBJECT: {
                //could be {...} or [...]
                if(fieldRaw.constructor === Array){
                    //key:[...]
                    fieldRaw.forEach(obj => {
                        jominiWriter.write_unquoted(key)
                        jominiWriter.write_object_start()
                        serializeArbitraryPDXObjectRecursive(obj,[...keyTree,key],jominiWriter)
                        jominiWriter.write_end()
                    })
                } else {
                    jominiWriter.write_unquoted(key)
                    jominiWriter.write_object_start()
                    serializeArbitraryPDXObjectRecursive(fieldRaw,[...keyTree,key],jominiWriter)
                    jominiWriter.write_end()
                }
            } break;
            case PARAMETER_TYPE.ARRAY_STRING_NOQUOTES: {
                jominiWriter.write_unquoted(key)
                jominiWriter.write_array_start()
                fieldRaw.forEach((element: string) => {
                    jominiWriter.write_unquoted(element)
                })
                jominiWriter.write_end()
            } break;
            case PARAMETER_TYPE.ARRAY_NUMBER: {
                jominiWriter.write_unquoted(key)
                jominiWriter.write_array_start()
                fieldRaw.forEach((element: any) => {
                    jominiWriter.write_unquoted(element + "")
                })
                jominiWriter.write_end()
            } break;
            case PARAMETER_TYPE.ARRAY_STRING_QUOTES: {
                jominiWriter.write_unquoted(key)
                jominiWriter.write_array_start()
                fieldRaw.forEach((element: string) => {
                    jominiWriter.write_quoted(element)
                })
                jominiWriter.write_end()
            } break;
            default:
                console.error("TRIED TO SERIALIZE OBJECT WITHOUT TYPE HANDLING")
            break;
        }
    } else if(typeof(fieldRaw) === "object" && fieldRaw instanceof Array){
        //key: [...]
        let wasTriggerOrEffect = false
        if(key){
            if(lookupPotentialApiCall(key, keyTree, SCOPE_TYPE.ANY)){
                // if(key === "owner"){
                //     debugger
                // }
                let nonNamedParameter: PARAMETER_TYPE | undefined = PARAMETER_TYPE.AAAAA
                let parameters: NamedParameter[] | undefined
                let apiItem
                if(apiItem = getTrigger(key)){
                    nonNamedParameter = apiItem.nonNamedParameter
                    parameters = apiItem.parameters
                    wasTriggerOrEffect = true
                } else if(apiItem = getEffect(key)){
                    nonNamedParameter = apiItem.nonNamedParameter
                    parameters = apiItem.parameters
                    wasTriggerOrEffect = true
                }
                if(wasTriggerOrEffect && nonNamedParameter){
                    switch(nonNamedParameter){
                        case PARAMETER_TYPE.ARRAY_STRING_NOQUOTES: {
                            if(typeof(fieldRaw) === "object" && fieldRaw.constructor === Array){
                                jominiWriter.write_unquoted(key)
                                jominiWriter.write_array_start();
                                fieldRaw.forEach(item => {
                                    jominiWriter.write_unquoted(item)
                                })
                                jominiWriter.write_end()
                            }
                        } break
                        case PARAMETER_TYPE.ARRAY_STRING_QUOTES: {
                            console.error("unimplemented")
                        } break
                        case PARAMETER_TYPE.ARRAY_NUMBER: {
                            console.error("unimplemented")
                        } break
                        case PARAMETER_TYPE.STRING_NOQUOTES: {
                            console.error("unimplemented")
                        } break
                        case PARAMETER_TYPE.STRING_QUOTES: {
                            console.error("unimplemented")
                        } break
                        case PARAMETER_TYPE.NUMBER: {
                            jominiWriter.write_unquoted(key)
                            jominiWriter.write_unquoted(fieldRaw + "")
                        } break
                        default: {
                            console.error("Trying to serialize trigger or effect with unhandled parameter type:")
                            console.error(apiItem)
                        } break
                    }
                }
                // if(wasTriggerOrEffect && parameters){
                //     let fieldObject: Record<string,any> = fieldRaw
                //     parameters.forEach(parameter => {
                //         if(fieldObject[parameter.name]){
                //             switch(parameter.type){
                //                 case PARAMETER_TYPE.STRING_NOQUOTES: {
                //                     jominiWriter.write_unquoted(key)
                //                     jominiWriter.write_unquoted(fieldRaw + "")
                //                 } break
                //                 case PARAMETER_TYPE.STRING_QUOTES: {
                //                     jominiWriter.write_unquoted(key)
                //                     jominiWriter.write_quoted(fieldRaw + "")
                //                 } break
                //                 case PARAMETER_TYPE.NUMBER: {
                //                     jominiWriter.write_unquoted(key)
                //                     jominiWriter.write_unquoted(fieldRaw + "")
                //                 } break
                //                 default: {
                //                     console.error("Trying to serialize trigger or effect with unhandled parameter type:")
                //                     console.error(parameter)
                //                 } break
                //             }
                //         }
                //     })
                // }
            }
        }
        if(!key || !wasTriggerOrEffect){
            let array: any[] = fieldRaw
            if(array.find((el: any) => {return typeof(el) !== "number" && typeof(el) !== "string" && typeof(el) !== "boolean"})){
                //key: [...] where contents are LIKELY objects ?
                array.forEach(el => {
                    jominiWriter.write_unquoted(key)
                    jominiWriter.write_object_start()
                    serializeArbitraryPDXObjectRecursive(el,[...keyTree,key],jominiWriter)
                    jominiWriter.write_end()
                })
            } else if (array.find(el => typeof(el) === "number" )){
                //key: [1,2,3...]
                //is a true int array
                jominiWriter.write_unquoted(key)
                jominiWriter.write_array_start();
                array.forEach(el => {
                    jominiWriter.write_integer(el);
                })
                jominiWriter.write_end();
            } else if (array.find(el => typeof(el) === "string" )){
                //key: ["string","test",...]
                //is a true string array
                jominiWriter.write_unquoted(key)
                jominiWriter.write_array_start();
                array.forEach(el => {
                    serializeCorrectStringFormat(key,el,jominiWriter)
                    // jominiWriter.write_quoted(el);
                })
                jominiWriter.write_end();
            } else if (array.find(el => typeof(el) === "boolean" )){
                //key: [true,false,true]
                //is a true boolean array
                //simpler handling because HIGHLY likely an array of effects
                //eg SWI_upgrade_template_and_divisions
                array.forEach(el => {
                    jominiWriter.write_unquoted(key)
                    jominiWriter.write_bool(el)
                })
            }
        }
    } else if(typeof(fieldRaw) === "string"){
        //key: "test"
        jominiWriter.write_unquoted(key)
        serializeCorrectStringFormat(key,fieldRaw,jominiWriter)
    } else if(typeof(fieldRaw) === "number"){
        //key: 3
        jominiWriter.write_unquoted(key)
        jominiWriter.write_unquoted(fieldRaw + "")
    } else if(typeof(fieldRaw) === "boolean"){
        //key: true
        //every bool in hoi is "yes" or "no", so have to convert to right string
        let fieldBool: boolean = fieldRaw
        jominiWriter.write_unquoted(key)
        jominiWriter.write_bool(fieldBool)
    } else if(fieldRaw instanceof Object){
        //key: {...} or key:[...]
        //if has special fields, is a comparison, therefore emit comparison instead of object
        if(fieldRaw.LESS_THAN !== undefined){
            jominiWriter.write_unquoted(key)
            jominiWriter.write_operator("<")
            jominiWriter.write_unquoted(fieldRaw.LESS_THAN + "")
        } else if(fieldRaw.GREATER_THAN !== undefined){
            jominiWriter.write_unquoted(key)
            jominiWriter.write_operator(">")
            jominiWriter.write_unquoted(fieldRaw.GREATER_THAN + "")
        } else if(fieldRaw.LESS_THAN){

        } else if(fieldRaw.LESS_THAN){

        } else if(fieldRaw.constructor === Array){
            //pretty sure this is unreachable
            // console.log("HIT THIS POINT")
            //key: [...] or key: [{...},{...}] or key:[[...],[...]]
            if(typeof(fieldRaw[0]) === "object"){
                //key:[{...},{...}] or key:[[...],[...]]
                //pattern wise this should not happen
                //if there are multiple instances of an object it should be in PdxObjs or one of the api calls
            } else {
                //key: [...]
                jominiWriter.write_unquoted(key)
                jominiWriter.write_object_start()
                serializeArbitraryPDXObjectRecursive(fieldRaw,[...keyTree,key],jominiWriter)
                jominiWriter.write_end()
            }
        } else {
            //key: {...}
            jominiWriter.write_unquoted(key)
            jominiWriter.write_object_start()
            serializeArbitraryPDXObjectRecursive(fieldRaw,[...keyTree,key],jominiWriter)
            jominiWriter.write_end()
        }
    }
}

const serializeArbitraryPDXObjectRecursive = (input: any, keyTree: string[], jominiWriter: Writer): void => {
    if(input !== undefined){
        let keys: string[] = Object.keys(input)
        // if(
        //     checkKeyTree(["focus_progress","NOT","if",'available',"advisor","USA_earl_browder",'characters'],keyTree) === true ||
        //     checkKeyTree(['ai_will_do','advisor',"instance","BUL_nikola_petkov",'characters'],keyTree) === true
        //     ){
        //     debugger
        // }
        //scopes first because characters recruited needs to be high priority
        //if scopes exist, loop through them
        if(input.scopes && input.scopes.length > 0){
            //sort scopes
            input.scopes = input.scopes.sort(scopeSort)
            //serialize
            input.scopes.forEach((scope: Scope) => {
                serializeSingleObject(scope.name,scope.object,[...keyTree],jominiWriter)
            })
        }
        //loop through non scope fields
        keys.filter(key => key !== "scopes").forEach(key => {
            // if(key === "BUL_dimitrana_ivanova"){
            //     debugger
            // }
            let fieldRaw = input[key]
            if(key && input[key] !== undefined && input[key] !== null){
                serializeSingleObject(key,fieldRaw,[...keyTree],jominiWriter)
            }
        })
    }
}

// const serializeArbitraryPDXObjectRecursive = (input: any, jominiWriter: Writer): void => {
//     if(input !== undefined){
//         let keys: string[] = Object.keys(input)
//         keys.forEach(key => {
//             let fieldRaw = input[key]
//             if(key && input[key] !== undefined && input[key] !== null){
//                 if(customFields.includes(key)){
//                     customFieldHandling(fieldRaw,key,jominiWriter)
//                 } else if(key === "effects" || key === "triggers" || key === "scopes" || key === "properties"){
//                     let properties: any[] = input[key]
//                     properties.forEach(property => {
//                         if(lookupPotentialApiCall(property, [], SCOPE_TYPE.ANY)){

//                         } else if(customFields.includes(property.name)){
//                             customPropertyWriteHandling(property.object,property.name,jominiWriter)
//                         } else if(typeof(property.object) === "number"){
//                             jominiWriter.write_unquoted(property.name)
//                             jominiWriter.write_unquoted(property.object + "")
//                         } else if(typeof(property.object) === "string"){
//                             // jominiWriter.write_unquoted(property.name)
//                             // jominiWriter.write_quoted(property.object)
//                             serializeCorrectStringFormat(property.name,property.object,jominiWriter)
//                         } else if(typeof(property.object) === "boolean"){
//                             jominiWriter.write_unquoted(property.name)
//                             // jominiWriter.write_unquoted(property.object + "")
//                             if(property.object){
//                                 jominiWriter.write_unquoted("yes")
//                             } else {
//                                 jominiWriter.write_unquoted("no")
//                             }
//                         } else {
//                             jominiWriter.write_unquoted(property.name)
//                             jominiWriter.write_object_start()
//                             serializeArbitraryPDXObjectRecursive(property.object,jominiWriter)
//                             jominiWriter.write_end()
//                         }
//                     })
//                 } else if(fieldRaw instanceof Array){
//                     let array: any[] = fieldRaw
//                     if(array.find(el => typeof(el) !== "number")){
//                         //is a list of duplicate key objects
//                         array.forEach(el => {
//                             jominiWriter.write_unquoted(key)
//                             jominiWriter.write_object_start()
//                             serializeArbitraryPDXObjectRecursive(el,jominiWriter)
//                             jominiWriter.write_end()
//                         })
//                     } else {
//                         //is a true int array
//                         jominiWriter.write_unquoted(key)
//                         jominiWriter.write_array_start();
//                         array.forEach(el => {
//                             jominiWriter.write_integer(el);
//                         })
//                         jominiWriter.write_end();
//                     }
//                 } else if(typeof(fieldRaw) === "string"){
//                     let fieldString: string = input[key]
//                     // jominiWriter.write_unquoted(key)
//                     // jominiWriter.write_quoted(fieldString)
//                     serializeCorrectStringFormat(key,fieldString,jominiWriter)
//                 } else if(typeof(fieldRaw) === "number"){
//                     let fieldNumber: number = input[key]
//                     jominiWriter.write_unquoted(key)
//                     jominiWriter.write_unquoted(fieldNumber + "")
//                 } else if(typeof(fieldRaw) === "boolean"){
//                     let fieldBool: boolean = input[key]
//                     jominiWriter.write_unquoted(key)
//                     if(fieldBool){
//                         jominiWriter.write_unquoted("yes")
//                     } else {
//                         jominiWriter.write_unquoted("no")
//                     }
//                 } else if(fieldRaw instanceof Object){
//                     jominiWriter.write_unquoted(key)
//                     jominiWriter.write_object_start()
//                     serializeArbitraryPDXObjectRecursive(input[key],jominiWriter)
//                     jominiWriter.write_end()
//                 }
//             }
//         })
//     }
// }

const serializeCorrectStringFormat = (key: string, input: string, jominiWriter: Writer) => {
    let foundHit: boolean = false
    effectDefinitions.forEach(effect => {
        if(effect.name && effect.name === key && effect.nonNamedParameter){
            if(effect.nonNamedParameter === PARAMETER_TYPE.STRING_NOQUOTES){
                foundHit = true
                jominiWriter.write_unquoted(input)
            } else if(effect.nonNamedParameter === PARAMETER_TYPE.STRING_QUOTES) {
                foundHit = true
                jominiWriter.write_quoted(input)
            }
        }
    })
    triggerDefinitions.forEach(trigger => {
        if(trigger.name && trigger.name === key && trigger.nonNamedParameter){
            if(trigger.nonNamedParameter === PARAMETER_TYPE.STRING_NOQUOTES){
                foundHit = true
                jominiWriter.write_unquoted(input)
            } else if(trigger.nonNamedParameter === PARAMETER_TYPE.STRING_QUOTES) {
                foundHit = true
                jominiWriter.write_quoted(input)
            }
        }
    })
    if(!foundHit){
        jominiWriter.write_quoted(input)
    }
}

export const deleteFolderRecursive = (path: string) => {
    const fs = window.require("fs");
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file: any) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
      }
};

export const cleanFolderRecursive = (path: string) => {
    const fs = window.require("fs");
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file: any) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                cleanFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}

// const containsParseableFields = (input: any) : boolean => {
//     return containsEffect(input) || containsProperties(input) || containsScopes(input) || containsTriggers(input)
// }

// const recursivePushScopes = <T>(input: any): T => {
//     let rVal: T = <T>input
//     if(rVal instanceof Object){
//         let keys: string[] = Object.keys(rVal)
//         if(keys.includes("effects")){
//             //@ts-ignore
//             rVal.effects = stripEffectsFromRawObject(rawJson)
//         }
//         if(keys.includes("triggers")){
//             //@ts-ignore
//             rVal.triggers = stripTriggersFromRawObject(rawJson)
//         }
//         keys.forEach(key => {
//             if(typeof(input[key]) === "object"){
//                 recursivePushScopes<keyField>(input[key])
//             }
//         })
//     }
//     return rVal
// }

// const ALL_SCOPES: string[] = [
//     ...EFFECT_ALL,
//     ...SCOPES_ALL,
//     ...TRIGGER_ALL,
// ]

// const COUNTRY_SCOPE_STRINGS: string[] = [
//     ...EFFECT_COUNTRY,
//     ...SCOPES_TRIGGER_COUNTRY,
//     ...SCOPES_EFFECT_COUNTRY,
//     ...TRIGGER_COUNTRY,
// ]

// const STATE_SCOPE_STRINGS: string[] = [
//     ...EFFECT_STATE,
//     ...SCOPES_TRIGGER_STATE,
//     ...SCOPES_EFFECT_STATE,
//     ...TRIGGER_STATE,
// ]


const getScopeType = (currentScopeType: SCOPE_TYPE, scopeNameToTest: string): SCOPE_TYPE => {
    // switch(currentScopeType){
    //     case SCOPE_TYPE.COUNTRY: {
    //         if(COUNTRY_SCOPE_STRINGS.includes(scopeNameToTest)){
    //             //find what scope is opened by this string
    //         }
    //         return SCOPE_TYPE.COUNTRY
    //     } break;
    //     case SCOPE_TYPE.STATE: {
    //         return SCOPE_TYPE.STATE
    //     } break;
    //     case SCOPE_TYPE.CHARACTER_DEFN: {
    //         return SCOPE_TYPE.CHARACTER_DEFN
    //     } break;
    //     case SCOPE_TYPE.DIVISION: {
    //         return SCOPE_TYPE.DIVISION
    //     } break;
    //     case SCOPE_TYPE.COMBAT: {
    //         return SCOPE_TYPE.COMBAT
    //     } break;
    // }
    scopeDeclarations.forEach(scope => {
        if(scope.name === scopeNameToTest){
            return scope.targetType
        }
        if(scope.regex && scopeNameToTest.match(scope.regex)){
            return scope.targetType
        }
    })
    return currentScopeType
}

const customPropertyReadHandling = (input: any, key: string, scopeType: SCOPE_TYPE): void => {
    let keyVal = input[key]
    let scopesArray: Scope[] = input.scopes
    switch(key){
        case "victory_points": {
            if(keyVal.constructor === Array && keyVal.length > 0){
                if(keyVal[0].constructor === Array){
                    keyVal.forEach(victoryPointPair => {
                        scopesArray.push({
                            name: key,
                            object: victoryPointPair,
                            type: scopeType,
                        })
                    })
                } else {
                    scopesArray.push({
                        name: key,
                        object: keyVal,
                        type: scopeType,
                    })
                }
            }
        } break;
    }
    if(unquotedFields.includes(key)){
        scopesArray.push({
            name: key,
            type: scopeType,
            object: keyVal,
        })
    }
}

const dateRegex = new RegExp(/[0-9]*\.[0-9]*\.[0-9]*/)
const numRegex = new RegExp(/^[0-9]$/)
const tagRegex = new RegExp(/^[A-Z][A-Z][A-Z]$/)
let scopeRegexes: RegExp[] = [
    dateRegex,
    numRegex,
    tagRegex,
]


// const getValidChildScopesForType = (currentScopeType: SCOPE_TYPE): string[] => {
//     switch(currentScopeType){
//         case SCOPE_TYPE.COUNTRY: {
//             return ALL_SCOPES
//         } break;
//         case SCOPE_TYPE.STATE: {
//             return [...ALL_SCOPES,...PROPERTIES_STATE]
//         } break;
//         case SCOPE_TYPE.CHARACTER_DEFN: {
//             return [...ALL_SCOPES,...PROPERTIES_CHARACTER]
//         } break;
//         case SCOPE_TYPE.COUNTRY_LEADER: {
//             return [...ALL_SCOPES,...PROPERTIES_CHARACTER]
//         } break;
//         case SCOPE_TYPE.UNIT_LEADER: {
//             return [...ALL_SCOPES,...PROPERTIES_CHARACTER]
//         } break;
//         case SCOPE_TYPE.OPERATIVE: {
//             return [...ALL_SCOPES,...PROPERTIES_CHARACTER]
//         } break;
//         case SCOPE_TYPE.DIVISION: {
//             return ALL_SCOPES
//         } break;
//         case SCOPE_TYPE.COMBAT: {
//             return ALL_SCOPES
//         } break;
//     }
//     return ALL_SCOPES
// }

const matchesRegex = (potentialScope: string): boolean => {
    let rVal: boolean = false
    scopeRegexes.forEach(regex => {
        if(potentialScope.match(regex)){
            rVal = true
        }
    })
    return rVal
}


const PARAMETER_TYPE_PRIMITIVE = [
    PARAMETER_TYPE.BOOLEAN,
    PARAMETER_TYPE.COMPARISON,
    PARAMETER_TYPE.NUMBER,
    PARAMETER_TYPE.DATE,
    PARAMETER_TYPE.STRING_NOQUOTES,
    PARAMETER_TYPE.STRING_QUOTES,
]

const PARAMETER_TYPE_ARRAY = [
    PARAMETER_TYPE.ARRAY_STRING_QUOTES,
    PARAMETER_TYPE.ARRAY_STRING_NOQUOTES,
    PARAMETER_TYPE.ARRAY_NUMBER,
]

const PARAMETER_TYPE_OBJECT = [
    PARAMETER_TYPE.MAP,
]

export const parseScopeableObjectTwo = (input: any, scopeType: SCOPE_TYPE, keyPath?: string[]): ScopeableObject => {
    let keyPathDefined: string[] = []
    if(keyPath){
        keyPathDefined = [...keyPath]
    }
    // if(
    //     keyPath &&
    //     (
    //         checkKeyTree(["set_technology","1939.1.1"],keyPath) === true
    //     )
    //     ){
    //     debugger
    // }
    let rVal: ScopeableObject = <ScopeableObject>input
    let scopes: Scope[] = []
    rVal.scopes = scopes
    let keys: string[] = Object.keys(input)
    keys.filter(key => key !== "scopes").forEach(key => {
        if(key && input[key]){
            // if(key === "set_technology" && input[key].fleet_in_being && typeof(input[key].fleet_in_being) === "object"){
            //     debugger
            // }
            if(lookupPotentialApiCall(key, keyPathDefined, scopeType)){
                // if(key === "owner"){
                //     debugger
                // }
                let nonNamedParameter
                let parameters
                let apiItem
                let isScope = false
                let isTriggerEffect = false
                let isPdxObject
                if(apiItem = getObject(key, keyPathDefined, scopeType)){
                    isPdxObject = true
                } else if(apiItem = getTrigger(key)){
                    nonNamedParameter = apiItem.nonNamedParameter
                    parameters = apiItem.parameters
                    isTriggerEffect = true
                } else if(apiItem = getEffect(key)){
                    nonNamedParameter = apiItem.nonNamedParameter
                    parameters = apiItem.parameters
                    isTriggerEffect = true
                } else {
                    isScope = true
                }

                if(isScope){
                    //array of scopes
                    //eg
                    /*
                    character_TAG = {
                        name = "test"
                    }
                    character_TAG = {
                        name = "test"
                    }
                     */
                    if(input[key].constructor === Array && input[key].length > 0){
                        input[key].forEach((scope: any)=>{
                            scopes.push({
                                name: key,
                                object: parseScopeableObjectTwo(scope,scopeType,[...keyPathDefined,key]),
                                type: scopeType,
                            })
                        })
                        delete input[key]
                    } else {
                        //apparently "SOV_fyp_production_speed_arms_factory_factor" cam get here
                        //I guess custom functions are also covered under this
                        //if it's an item {...} then parse, otherwise push with direct value
                        if(typeof(input[key]) === "object"){
                            scopes.push({
                                name: key,
                                object: parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key]),
                                type: scopeType,
                            })
                        } else {
                            scopes.push({
                                name: key,
                                object: input[key],
                                type: scopeType,
                            })
                        }
                        delete input[key]
                    }
                } else if(isPdxObject){
                    let type = (<PdxObject>apiItem).type
                    //could be key: "", key:{...}, key:[...]
                    if(typeof(input[key]) === "object"){
                        //key: {...} or key: [...]
                        if(input[key].constructor === Array){
                            //key: [...] or key:[[...],[...]]
                            if(PARAMETER_TYPE_ARRAY.includes(type)){
                                if(input[key].length > 0 && input[key][0].constructor === Array){
                                    //key: [[...],[...]]
                                    input[key].forEach((subArray: any) => {
                                        scopes.push({
                                            name: key,
                                            object: subArray,
                                            type: scopeType,
                                        })
                                    })
                                    delete input[key]
                                } else {
                                    //key: [...]
                                    scopes.push({
                                        name: key,
                                        object: input[key],
                                        type: scopeType,
                                    })
                                    delete input[key]
                                }
                            } else {
                                //is singular type, but there are multiple instances of it
                                //could potentially be eg cost field of advisor in character file
                                if(input[key].length > 0 && typeof(input[key][0]) === "object"){
                                    //key: [{...},{...}]
                                    input[key].forEach((subObject: any) => {
                                        scopes.push({
                                            name: key,
                                            object: parseScopeableObjectTwo(subObject,scopeType,[...keyPathDefined,key]),
                                            type: scopeType,
                                        })
                                    })
                                    delete input[key]
                                } else {
                                    //key: [...]
                                    input[key].forEach((subObject: any) => {
                                        scopes.push({
                                            name: key,
                                            object: subObject,
                                            type: scopeType,
                                        })
                                    })
                                    delete input[key]
                                }
                            }
                        } else {
                            //key: {....}
                            scopes.push({
                                name: key,
                                object: parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key]),
                                type: scopeType,
                            })
                            delete input[key]
                        }
                    } else {
                        //eg
                        //key: "test"
                        //key: 2
                        //key: false
                        scopes.push({
                            name: key,
                            object: input[key],
                            type: scopeType,
                        })
                        delete input[key]
                    }
                } else {
                    if(nonNamedParameter){
                        if(PARAMETER_TYPE_ARRAY.includes(nonNamedParameter)){
                            //if doubly nested array
                            //eg
                            //{
                            //  victory_points: [[2,3],[4,5]]
                            //}
                            if(input[key].constructor === Array && input[key].length > 0 && input[key][0].constructor === Array){
                                input[key].forEach((subArray: any) => {
                                    scopes.push({
                                        name: key,
                                        object: subArray,
                                        type: scopeType,
                                    })
                                })
                                delete input[key]
                            } else if(input[key].constructor === Array && input[key].length > 0){
                                //singly nested array
                                //eg
                                //{
                                //  victory_points: [2, 3],
                                //}
                                scopes.push({
                                    name: key,
                                    object: input[key],
                                    type: scopeType,
                                })
                                delete input[key]
                            } else {
                                //likely single item
                                //eg
                                //{
                                //  provinces: 2,
                                //}
                                scopes.push({
                                    name: key,
                                    object: [input[key]],
                                    type: scopeType,
                                })
                                delete input[key]
                            }
                        } else {
                            if(input[key].constructor === Array && input[key].length > 0){
                                //singly nested array
                                //eg
                                //{
                                //  add_core_of: ["GER","FRA"],
                                //}
                                input[key].forEach((primitive: any) => {
                                    scopes.push({
                                        name: key,
                                        object: primitive,
                                        type: scopeType,
                                    })
                                })
                                delete input[key]
                            } else {
                                //likely single item
                                //eg
                                //{
                                //  add_core_of: "GER",
                                //}
                                //but could also be eg
                                //fleet_in_being: [1,2,3...]
                                if(typeof(input[key]) === "object"){
                                    if(input[key].constructor === Array){
                                        input[key].forEach((primitive: any) => {
                                            scopes.push({
                                                name: key,
                                                object: primitive,
                                                type: scopeType,
                                            })
                                        })
                                    } else {
                                        scopes.push({
                                            name: key,
                                            object: parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key]),
                                            type: scopeType,
                                        })
                                    }
                                } else {
                                    scopes.push({
                                        name: key,
                                        object: input[key],
                                        type: scopeType,
                                    })
                                }
                                delete input[key]
                            }
                        }
                    } else {
                        //key: {...} or key: [...]
                        //where key has named parameters
                        if(input[key].constructor === Array){
                            //key: [...]
                            if(input[key].length > 0 && typeof(input[key][0]) === "object" && input[key][0].constructor === Array){
                                //key: [[...],[...]]
                                scopes.push({
                                    name: key,
                                    object: parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key]),
                                    type: scopeType,
                                })
                                delete input[key]
                            } else if(input[key].length > 0 && typeof(input[key][0]) === "object"){
                                //key: [{...},{...}]
                                //eg
                                /*
                                if: [
                                    {limit:{...}},
                                    {limit:{...}}
                                ]
                                */
                               input[key].forEach((scope: any) => {
                                    scopes.push({
                                        name: key,
                                        object: parseScopeableObjectTwo(scope,scopeType,[...keyPathDefined,key]),
                                        type: scopeType,
                                    })
                                })
                                delete input[key]
                            } else {
                                scopes.push({
                                    name: key,
                                    object: input[key],
                                    type: scopeType,
                                })
                                delete input[key]
                            }
                        } else {
                            //key: {...}
                            scopes.push({
                                name: key,
                                object: parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key]),
                                type: scopeType,
                            })
                            delete input[key]
                        }
                    }
                }
            } else {
                if(typeof(input[key]) === "object"){
                    //{key:{...}} OR {key:[...]}
                    if(input[key].constructor === Array){
                        //{key:[...]}
                        if(input[key].length > 0){
                            if(typeof(input[key][0]) !== "object"){
                                //eg
                                /*
                                key: ['head_of_intelligence']
                                traits: ['head_of_intelligence']
                                */
                                //do nothing
                            } else {
                                //eg
                                /*
                                traits: [{....},{....}]
                                */
                                //eg multiple advisors
                                let newArr: any[] = []
                                input[key].forEach((subObject: any) => {
                                    newArr.push(parseScopeableObjectTwo(subObject,scopeType,[...keyPathDefined,key]))
                                })
                                input[key] = newArr
                            }
                        }
                    } else {
                        //{key:{....}}
                        input[key] = parseScopeableObjectTwo(input[key],scopeType,[...keyPathDefined,key])
                    }
                }
            }
        }
    })
    rVal.scopes = rVal.scopes.sort(scopeSort)
    return rVal
}

const SCOPE_SORT_PRIORITY_MAP: Record<string, number> = {
    "limit": 0,
    "recruit_character": 1,
}

const scopeSort = (scope1: Scope,scope2: Scope) => {
    if(SCOPE_SORT_PRIORITY_MAP[scope1.name] && SCOPE_SORT_PRIORITY_MAP[scope2.name] === undefined){
        return -1
    }
    if(SCOPE_SORT_PRIORITY_MAP[scope2.name] && SCOPE_SORT_PRIORITY_MAP[scope1.name] === undefined){
        return 1
    }
    if(SCOPE_SORT_PRIORITY_MAP[scope1.name] && SCOPE_SORT_PRIORITY_MAP[scope2.name]){
        if(SCOPE_SORT_PRIORITY_MAP[scope1.name] < SCOPE_SORT_PRIORITY_MAP[scope2.name]){
            return -1
        } else if(SCOPE_SORT_PRIORITY_MAP[scope1.name] > SCOPE_SORT_PRIORITY_MAP[scope2.name]){
            return 1
        }
    }
    return 0
}

// export const parseScopeableObject = (input: any, scopeType: SCOPE_TYPE): ScopeableObject => {
//     let rVal: ScopeableObject = <ScopeableObject>input
//     let scopes: Scope[] = []
//     rVal.scopes = scopes
//     let keys: string[] = Object.keys(input)
//     keys.filter(key => key === "scopes").forEach(key => {
//         if(key && input[key] && key !== "scopes"){
//             // if(customFields.includes(key)){
//             //     customPropertyReadHandling(input,key,scopeType)
//             // } else 
//             if(typeof(input[key]) === "object" && input[key].constructor === Array){
//                 let arr: Array<any> = input[key]
//                 arr.forEach(scope => {
//                     let value = scope
//                     if(typeof(value) === "object"){
//                         let nextScope = getScopeType(scopeType,key)
//                         value = parseScopeableObject(value,nextScope)
//                     }
//                     scopes.push({
//                         name: key,
//                         type: scopeType,
//                         object: value,
//                     })
//                 })
//             } else {
//                 let value = input[key]
//                 if(typeof(value) === "object"){
//                     let nextScope = getScopeType(scopeType,key)
//                     value = parseScopeableObject(value,nextScope)
//                 } else {
//                     value = checkAgainstPdxApi(key,value)
//                 }
//                 if(getValidChildScopesForType(scopeType).includes(key)){
//                     scopes.push({
//                         name: key,
//                         type: scopeType,
//                         object: value,
//                     })
//                     delete input[key]
//                 } else {
//                     input[key] = value
//                 }
//             }
//         } else {
//             if(key !== "scopes"){
//                 delete input[key]
//             }
//         }
//     })
//     return {...rVal}
// }

const checkAgainstPdxApi = (key: string, input: any): any => {
    effectDefinitions.forEach(defn => {
        if(defn.name && defn.name === key && defn.nonNamedParameter){
            switch(defn.nonNamedParameter){
                case PARAMETER_TYPE.BOOLEAN: {
                    if(typeof(input) === "string"){
                        return input === "true"
                    }
                } break;
            }
        }
    })
    return input
}

export const isVanillaPath = (path: string, context: AppContextInterface): boolean => {
    return path.includes(context.state.projectDetails.paths.vanillaDir)
}

export const cleanInvisibleCharacters = (input: string): string => {
    return input && input.replaceAll ? input.replaceAll("﻿","") : input
}

const folderStructureRegex = new RegExp(/(.+)(\/)([^\/]+)$/)
export const getFileNameFromPath = (input: string): string => {
    let regexMatch = input.match(folderStructureRegex)
    if(regexMatch){
        return regexMatch[3]
    } else {
        return ""
    }
}
