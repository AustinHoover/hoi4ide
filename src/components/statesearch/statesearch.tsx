import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, State } from "../../state/mainState.interface";

import "./statesearch.css"

export interface CountrySearchProps {
    
}

const StateSearch = (props: CountrySearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [showDropdownChildren, setShowDropdownChildren] = React.useState(false)
    let [filterString, setFilterString] = React.useState("")

    let statesToInclude: State[] = []
    statesToInclude = state.projectDetails.stateEditing.states.filter(stateData => stateData.name.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[stateData.name].toLocaleLowerCase().includes(filterString))
    if(statesToInclude.length > 5){
        statesToInclude.length = 5
    }

    let filterFunction = (input: any) => {
        setFilterString(input.target.value)
        statesToInclude = state.projectDetails.stateEditing.states.filter(stateData => stateData.name.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[stateData.name].toLocaleLowerCase().includes(filterString))
        if(statesToInclude.length > 5){
            statesToInclude.length = 5
        }
    }

    let contents: JSX.Element[] = []
    statesToInclude.forEach(stateData => {
        contents.push(
            <a className="dropdown-item" key={stateData.name} onClick={(event) => {
                dispatch(createActionOpenState(stateData))
            }}>{state.projectDetails.localisationMap[stateData.name]} ({stateData.name})</a>
        )
    })
    
    return (
        <div className="dropdown mb-5 w-50">
            {/* <a className="btn btn-secondary dropdown-toggle" onClick={()=>{setShowDropdownChildren(!showDropdownChildren)}}>
                Dropdown link
            </a> */}
            <input className="m-2 form-control" type="text" placeholder="Search.." id="myInput" onKeyUp={filterFunction} onClick={()=>{setShowDropdownChildren(true)}}/>
            <div className={`dropdown-menu w-100 m-2 ${showDropdownChildren ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                {contents}
            </div>
        </div>
    );
}

export default StateSearch;
