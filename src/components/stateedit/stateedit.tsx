import * as React from "react";
import { AppContext } from "../../App";
import { createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Country, State } from "../../state/mainState.interface";
import StateOwnerEdit from "../stateowneredit/stateowneredit";

import "./stateedit.css"

export interface StateEditProps {
    state: State
}

const errorState: State = {
    id: -1,
    name: "ERR",
    ownerTag: "ERR",
    historyFile: {
        path: "",
        state: {
            id: -1,
            name: "ERR",
            manpower: 0,
            local_supplies: 0,
            state_category: "",
            history: {
                scopes: [],
                buildings: {
                    infrastructure: 0,
                    arms_factory: 0,
                    industrial_complex: 0,
                    air_base: 0,
                }
            },
            provinces: [],
        },
    },
}

const StateEdit = (props: StateEditProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let currentState: State = state.projectDetails.stateEditing.currentlySelectedState ? state.projectDetails.stateEditing.currentlySelectedState : errorState

    return (
        <div className="w-100 h-100">
            <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                <div style={{fontSize: "30px", padding: "30px"}}>{state.projectDetails.localisationMap[currentState.name]} ({currentState.name})</div>
                <button type="button" className="btn-close" aria-label="Close" style={{margin: "15px", padding: "15px", backgroundColor: "#F00"}} onClick={()=>{dispatch(createActionOpenState(null))}}></button>
            </div>
            <StateOwnerEdit ownerTag={currentState.ownerTag}/>
        </div>
    );
}

export default StateEdit;
