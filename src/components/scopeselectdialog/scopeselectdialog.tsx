import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { effectDefinitions } from "../../pdxapi/effectDefinitions";
import { triggerDefinitions } from "../../pdxapi/triggerDefinitions";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import GenericDropdown, { loseFocusContainer } from "../dropdowngeneric/dropdowngeneric";

import "./scopeselectdialog.css"


export interface ScopeSelectDialogComponentProps {
    onSave: (option: string)=>void,
    show: boolean,
    setShow: (show: boolean)=>void,
}

const ScopeSelectDialogComponent = (props: ScopeSelectDialogComponentProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let onLoseFocusEffectContainer: loseFocusContainer = { }
    let onLoseFocusTriggerContainer: loseFocusContainer = { }

    let saveButtonCallback = () => {
        props.onSave("test")
        props.setShow(false)
    }

    let selectEffectCallback = (effect: string) => {
        return effect
    }

    let effectNameList: string[] = effectDefinitions.filter(effect => effect.name).map(effect => effect.name) as string[]
    let triggerNameList: string[] = triggerDefinitions.filter(effect => effect.name).map(effect => effect.name) as string[]
    
    return (
        <div>
            { props.show &&
                <div className="modal show" tabIndex={-1} role="dialog" 
                style={{ display: 'block', position: 'fixed', zIndex: 999, top: "300px" }}
                onClick={($event) => {
                    if(onLoseFocusEffectContainer.onLoseFocus){
                        onLoseFocusEffectContainer.onLoseFocus($event)
                    }
                    if(onLoseFocusTriggerContainer.onLoseFocus){
                        onLoseFocusTriggerContainer.onLoseFocus($event)
                    }
                }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Scope Type</h5>
                            </div>
                            <div className="modal-body">
                                <p>Effects</p>
                                <GenericDropdown options={effectNameList} onSelect={selectEffectCallback} loseFocusContainer={onLoseFocusEffectContainer} displayLimit={5}/>
                                <p>Triggers</p>
                                <GenericDropdown options={triggerNameList} onSelect={selectEffectCallback} loseFocusContainer={onLoseFocusTriggerContainer} displayLimit={5}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={saveButtonCallback}>Save</button>
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
