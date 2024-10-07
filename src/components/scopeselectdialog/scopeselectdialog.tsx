import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { effectDefinitions } from "../../pdxapi/effectDefinitions";
import { triggerDefinitions } from "../../pdxapi/triggerDefinitions";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import GenericDropdown, { DropdownOption } from "../dropdowngeneric/dropdowngeneric";
import { Scope } from "../../interface/scope.interface";

import "./scopeselectdialog.css"
import { SCOPE_TYPE } from "../../pdxapi/scopeDefinitions";

/**
 * Props
 */
export interface ScopeSelectDialogComponentProps {

    /**
     * Invoked saving the modal
     */
    onSave: ()=>void,

    /**
     * Controls visibility of the modal
     */
    show: boolean,

    /**
     * Sets the visibility status of the modal
     * @param show true to make visible, false to hide
     */
    setShow: (show: boolean)=>void,

    /**
     * The scope we're adding to
     */
    scope: Scope | undefined,
}

/**
 * A modal to add an object to a scope
 */
const ScopeSelectDialogComponent = (props: ScopeSelectDialogComponentProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    //get the scope we're editing
    const scope = props.scope

    //the effects and triggers available
    let effectNameList: DropdownOption[] = effectDefinitions.filter(effect => 
        effect.name &&
        (
            !scope?.type ||
            effect.allowedScopes.includes(scope.type) ||
            effect.allowedScopes.includes(SCOPE_TYPE.ANY)
        )
    ).map(effect => {
        return {
            label: effect.name ? effect.name : '',
            value: effect.name ? effect.name : '',
        }
    })
    let triggerNameList: DropdownOption[] = triggerDefinitions.filter(trigger =>
        trigger.name &&
        (
            !scope?.type ||
            trigger.allowedScopes.includes(scope.type) ||
            trigger.allowedScopes.includes(SCOPE_TYPE.ANY)
        )
    ).map(trigger => {
        return {
            label: trigger.name ? trigger.name : '',
            value: trigger.name ? trigger.name : '',
        }
    })

    //state of the modal itself
    const [effect,setEffect] = React.useState<string>()
    const [trigger,setTrigger] = React.useState<string>()
    const selectEffectCallback = (effect: string) => {
        setEffect(effect)
        return effect
    }
    const selectTriggerCallback = (trigger: string) => {
        setTrigger(trigger)
        return trigger
    }

    //invoked on saving
    const saveButtonCallback = () => {
        //update all state
        props.onSave()
        props.setShow(false)
    }

    
    return (
        <div>
            { props.show &&
                <div className="modal show" tabIndex={-1} role="dialog" 
                style={{ display: 'block', position: 'fixed', zIndex: 999, top: "300px" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add to Scope</h5>
                            </div>
                            <div className="modal-body">
                                <label>Effects</label>
                                <GenericDropdown options={effectNameList} onChange={selectEffectCallback} isClearable={true}/>
                                <label className="mt-4">Triggers</label>
                                <GenericDropdown options={triggerNameList} onChange={selectTriggerCallback} isClearable={true}/>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={saveButtonCallback}
                                    disabled={(!effect || effect === '') && (!trigger || trigger === '')}
                                >Save</button>
                                <button type="button" className="btn btn-secondary" onClick={()=>{props.setShow(false)}}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ScopeSelectDialogComponent;
