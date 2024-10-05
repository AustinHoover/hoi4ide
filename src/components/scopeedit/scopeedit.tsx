import * as React from "react";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties, ScopeableObject } from "../../interface/rawFile.interface";
import { Scope } from "../../interface/scope.interface";
import { effectDefinitions } from "../../pdxapi/effectDefinitions";
import { scopeDeclarations, SCOPE_TYPE } from "../../pdxapi/scopeDefinitions";
import { triggerDefinitions } from "../../pdxapi/triggerDefinitions";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import ScopeSelectDialogComponent from "../scopeselectdialog/scopeselectdialog";

import "./scopeedit.css"

interface ScopeBlockProps {
    scope: Scope,
    indent: number,
    openModal: () => void,
}

const blockColors: string[] = [
    "lightsalmon",
    "lightblue",
    "palegreen",
    "lemonchiffon",
]

const ScopeBlock = (props: ScopeBlockProps) => {

    let content: JSX.Element[] = []
    let properties: JSX.Element[] = []
    let isObject: boolean = true
    if(props.scope.object){
        if(props.scope.object.scopes){
            let scopes: Scope[] = props.scope.object.scopes
            scopes.forEach(scope => {
                if(scope.object){
                    content.push(<ScopeBlock scope={scope} indent={props.indent + 1} openModal={props.openModal}/>)
                }
            })
        }
        let keys = Object.keys(props.scope.object)
        if(typeof(props.scope.object) === "object"){
            keys.forEach(key => {
                if(key !== "effects" && key !== "triggers" && key !== "scopes" && key !== "properties" && props.scope.object[key]){
                    if(typeof(props.scope.object[key]) === "object") {
                        content.push(<ScopeBlock scope={{
                            name: key,
                            object: props.scope.object[key],
                            type: props.scope.type,
                        }} indent={props.indent + 1} openModal={props.openModal}/>)
                    } else {
                        properties.push(<div>
                            {key} - {props.scope.object[key] + ""}
                        </div>)
                    }
                }
            })
        } else {
            isObject = false
        }
    }


    let logAllowedScopes = (scopeType: SCOPE_TYPE) => {
        console.log("====Allowed Scopes====")
        scopeDeclarations.forEach(declaration => {
            if(declaration.allowedScopes.includes(scopeType)){
                console.log(declaration.name)
            }
        })
        console.log("====Allowed Triggers====")
        triggerDefinitions.forEach(trigger => {
            if(trigger.allowedScopes.includes(scopeType)){
                console.log(trigger.name)
            }
        })
        console.log("====Allowed Effects====")
        effectDefinitions.forEach(effect => {
            if(effect.allowedScopes.includes(scopeType)){
                console.log(effect.name)
            }
        })
    }

    return <div 
    className="shadow d-flex flex-column align-items-start"
    style={{
        marginLeft: props.indent * 15 + "px",
        margin: "10px",
        padding: "10px",
        backgroundColor: blockColors[props.indent % 4],
        width: "95%",
    }}>
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
            <span>{props.scope.name}</span>
            {
                !isObject && <div style={{marginLeft: "50px", marginRight: "50px",}}>
                    {props.scope.object + ""}
                </div>
            }
            <button type="button" className="btn-close" aria-label="Close" style={{margin: "5px", padding: "5px", backgroundColor: "#F00", opacity: 1,}} onClick={()=>{}}></button>
        </div>
        {properties}
        {content}
        {
            isObject &&
            <Plus
            role={"button"}
            style={{
                backgroundColor: "forestgreen",
                fontSize: "30px",
            }}
            onClick={()=>{
                props.openModal()
                // logAllowedScopes(props.scope.type)
            }}
            />
        }
    </div>
}

export interface ScopeEditProps {
    scopedObject: ScopeableObject
}

const ScopeEdit = (props: ScopeEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    //used to filter recruitment blocks
    const [filterRecruitment, setFilterRecruitment] = React.useState(false)

    let scopeBlocks: JSX.Element[] = []

    let openModal = () => {
        console.log("show modal")
        setShowSelectModal(true)
    }

    const [showSelectModal, setShowSelectModal] = React.useState(false)

    if(props.scopedObject.scopes){
        let scopes = [...props.scopedObject.scopes]
        scopeBlocks = scopes
        .filter(scope => {
            return scope.name !== "recruit_character" ||
            (scope.name === "recruit_character" && !filterRecruitment)
        })
        .map(scope => {
            return <ScopeBlock scope={scope} indent={0} openModal={openModal}/>
        })
    }
    
    return (
        <div className="w-100 h-100 overflow-auto d-flex flex-column align-items-start">
            <ScopeSelectDialogComponent onSave={(option: string)=>{}} show={showSelectModal} setShow={setShowSelectModal}/>
            <div className="flex-row m-3">
                <input className="form-check-input" type="checkbox" id="recruitmentFilterCheckbox"
                onChange={(event) => {setFilterRecruitment(event.target.checked)}}
                />
                <label className="form-check-label" htmlFor="recruitmentFilterCheckbox">
                    Filter Recruitments
                </label>
            </div>
            {scopeBlocks}
        </div>
    );
}

export default ScopeEdit;
