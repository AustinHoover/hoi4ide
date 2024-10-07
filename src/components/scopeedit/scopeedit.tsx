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
import ScopeBlock from "./scopeblock";

/**
 * Props for the edit view
 */
export interface ScopeEditProps {

    /**
     * The object to edit
     */
    scopedObject: ScopeableObject

    /**
     * Function to invoke to save the scopes
     */
    onSave: (value: ScopeableObject) => void
}

/**
 * A component for editing a scope
 */
const ScopeEdit = (props: ScopeEditProps) => {

    //context
    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    //used to filter recruitment blocks
    const [filterRecruitment, setFilterRecruitment] = React.useState(false)

    //tracks actual value of scopes on page
    const [scopes, setScopes] = React.useState<Scope[]>(props.scopedObject.scopes)
    let scopeBlocks: JSX.Element[] = []

    //tracks edited state
    const [edited,setEdited] = React.useState<boolean>(false)

    //saves the scope editing
    const onSave = () => {
        props.onSave({
            ...props.scopedObject,
            scopes: scopes,
        })
        setEdited(false)
    }

    //opens the modal to add a new scope
    let openModal = () => {
        console.log("show modal")
        setShowSelectModal(true)
    }

    //controls visibility of the scope addition modal
    const [showSelectModal, setShowSelectModal] = React.useState(false)

    if(scopes){
        scopeBlocks = scopes
        .filter(scope => {
            return scope.name !== "recruit_character" ||
            (scope.name === "recruit_character" && !filterRecruitment)
        })
        .map(scope => {
            const onDelete = () => {
                setScopes(scopes.filter(toFilter => toFilter !== scope))
                setEdited(true)
            }
            const onEdit = () => {
                setScopes([...scopes])
                setEdited(true)
            }
            return <ScopeBlock scope={scope} indent={0} openModal={openModal} onDelete={onDelete} onEdit={onEdit}/>
        })
    }
    
    return (
        <div className="w-100 h-100 overflow-auto d-flex flex-column align-items-start">
            <ScopeSelectDialogComponent onSave={(option: string)=>{}} show={showSelectModal} setShow={setShowSelectModal}/>
            <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" id="recruitmentFilterCheckbox"
                    onChange={(event) => {setFilterRecruitment(event.target.checked)}}
                />
                <label className="form-check-label" htmlFor="recruitmentFilterCheckbox">
                    Filter Recruitments
                </label>
            </div>
            <button
                className="btn btn-success m-3"
                disabled={!edited}
                onClick={onSave}
            >Save</button>
            {scopeBlocks}
        </div>
    );
}

export default ScopeEdit;
