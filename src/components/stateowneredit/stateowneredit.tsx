import * as React from "react";
import { AppContext } from "../../App";
import { createActionSetStateOwner } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./stateowneredit.css"


export interface CountrySearchProps {
    ownerTag: string
}

const StateOwnerEdit = (props: CountrySearchProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [showDropdownChildren, setShowDropdownChildren] = React.useState(false)
    let [filterString, setFilterString] = React.useState("")

    let countriesToInclude: Country[] = []
    countriesToInclude = state.projectDetails.countryEditing.countries.filter(country => country.tag.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[country.tag].toLocaleLowerCase().includes(filterString))
    if(countriesToInclude.length > 5){
        countriesToInclude.length = 5
    }

    let filterFunction = (input: any) => {
        setFilterString(input.target.value)
        countriesToInclude = state.projectDetails.countryEditing.countries.filter(country => country.tag.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[country.tag].toLocaleLowerCase().includes(filterString))
        if(countriesToInclude.length > 5){
            countriesToInclude.length = 5
        }
    }

    let contents: JSX.Element[] = []
    countriesToInclude.forEach(country => {
        contents.push(
            <a className="dropdown-item w-100 pointer" role="button" key={country.tag} onClick={(event) => {
                if(state.projectDetails.stateEditing.currentlySelectedState){
                    dispatch(createActionSetStateOwner(state.projectDetails.stateEditing.currentlySelectedState,country.tag))
                    setShowDropdownChildren(false)
                }
            }}>{state.projectDetails.localisationMap[country.tag]} ({country.tag})</a>
        )
    })
    
    return (
        <div className="dropdown mb-5 w-25" onBlur={()=>{setShowDropdownChildren(false)}}>
            <span className={`badge bg-primary w-100`} style={{cursor: "pointer", height: "30px",}} onClick={()=>{setShowDropdownChildren(true)}}>{state.projectDetails.localisationMap[props.ownerTag]} ({props.ownerTag})</span>
            <div className={`dropdown-menu w-100 pt-0 ${showDropdownChildren ? 'show' : ''}`} style={{minHeight: "30px"}} aria-labelledby="dropdownMenuLink">
                <input className={`form-control ${true ? "show" : ""}`} type="text" placeholder="Search.." id="myInput" onKeyUp={filterFunction}/>
                {contents}
            </div>
        </div>
    );
}

export default StateOwnerEdit;
