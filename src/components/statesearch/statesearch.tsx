import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, State } from "../../state/mainState.interface";

import "./statesearch.css"
import GenericDropdown from "../dropdowngeneric/dropdowngeneric";

export interface CountrySearchProps {
    
}

const StateSearch = (props: CountrySearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const states = state.projectDetails.stateEditing.states
    const names: string[] = states.map(stateData => 
        state.projectDetails.localisationMap[stateData.name] ? state.projectDetails.localisationMap[stateData.name] : stateData.name
    )

    const onSelect = (value: string) => {
        const foundState: State | undefined = states.find(stateData => (state.projectDetails.localisationMap[stateData.name] ? state.projectDetails.localisationMap[stateData.name] : stateData.name) === value)
        if(foundState){
            dispatch(createActionOpenState(foundState))
        }
        return value
    }
    
    return (
        <div className="dropdown mb-5 w-50">
            <GenericDropdown
                options={names}
                onSelect={onSelect}
            />
        </div>
    );
}

export default StateSearch;
