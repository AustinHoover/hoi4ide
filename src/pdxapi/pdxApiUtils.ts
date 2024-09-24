import { Effect, effectDefinitions } from "./effectDefinitions"
import { objectDefinitions, PdxObject } from "./objectDefinisions"
import { Scope, scopeDeclarations, SCOPE_TYPE } from "./scopeDefinitions"
import { Trigger, triggerDefinitions } from "./triggerDefinitions"

const effectMap: any = {}
const effectRegexList: RegExp[] = []
effectDefinitions.forEach(effect => {
    if(effect.name){
        effectMap[effect.name] = effect
    } else if(effect.nameRegex){
        effectRegexList.push(effect.nameRegex)
    }
})


const scopeMap: any = {}
const scopeRegexList: RegExp[] = []
scopeDeclarations.forEach(scope => {
    if(scope.name){
        scopeMap[scope.name] = scope
    } else if(scope.regex){
        scopeRegexList.push(scope.regex)
    }
})

const triggerMap: any = {}
const triggerRegexList: RegExp[] = []
triggerDefinitions.forEach(trigger => {
    if(trigger.name){
        triggerMap[trigger.name] = trigger
    } else if(trigger.nameRegex){
        triggerRegexList.push(trigger.nameRegex)
    }
})

const objectMap: any = {}
objectDefinitions.forEach(objectType => {
    if(objectType.name && !objectType.requiredKeyTree){
        objectMap[objectType.name] = objectType
    }
})


export const lookupPotentialApiCall = (raw: string, keyTree: string[], scopeType: SCOPE_TYPE): any => {
    let rVal: boolean = false
    if(triggerMap[raw] || scopeMap[raw] || effectMap[raw] || getObject(raw,keyTree,scopeType)){
        rVal = true
    }
    if(rVal === true){
        return true
    }
    effectRegexList.forEach(regex => {
        if(raw.match(regex)){
            rVal = true
        }
    })
    scopeDeclarations.forEach(scope => {
        if(scope.regex && raw.match(scope.regex) && scope.allowedScopes.includes(scopeType)){
            rVal = true
        }
    })
    triggerDefinitions.forEach(trigger => {
        if(trigger.nameRegex && raw.match(trigger.nameRegex) && trigger.allowedScopes.includes(scopeType)){
            rVal = true
        }
    })
    return rVal
}

export const getTrigger = (raw: string): Trigger => {
    return triggerMap[raw]
}

export const getEffect = (raw: string): Effect => {
    return effectMap[raw]
}

export const checkKeyTree = (keyTreeDesired: (string | RegExp)[], keyTreeActual: string[]) : boolean => {
    let rVal = true
    if(keyTreeActual.length < keyTreeDesired.length){
        rVal = false
    }
    if(!rVal){
        return false
    }
    let reversed = [...keyTreeActual].reverse().slice(0,keyTreeDesired.length)
    reversed.forEach((key,i)=>{
        if(typeof(keyTreeDesired[i]) === "string"){
            if(key !== keyTreeDesired[i]){
                rVal = false
            }
        } else {
            //its a regexp
            if(!key.match(keyTreeDesired[i])){
                rVal = false
            }
        }
    })
    return rVal
}

export const getObject = (raw: string, keyTree: string[], scopeType: SCOPE_TYPE): PdxObject | undefined => {
    let rVal: PdxObject = objectMap[raw]
    // if(raw === "owner" && scopeType === SCOPE_TYPE.STATE){
    //     debugger
    // }
    objectDefinitions.forEach(objectType => {
        if(objectType.name === raw && objectType.requiredKeyTree && objectType && checkKeyTree(objectType.requiredKeyTree,keyTree)){
            rVal = objectType
        }
    })
    return rVal
}

export const getScope = (raw: string): Scope => {
    if(scopeMap[raw]){
        return scopeMap[raw]
    }
    scopeDeclarations.forEach(scope => {
        if(scope.regex && raw.match(scope.regex)){
            return scope
        }
    })
    throw new Error("Scope not found - the call to \"getScope\" should have guarded with lookupPotentialApiCall returning true")
}