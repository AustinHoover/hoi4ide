import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./countrysearch.css"


export interface CountrySearchProps {
    
}

const CountrySearch = (props: CountrySearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [showDropdownChildren, setShowDropdownChildren] = React.useState(false)
    let [filterString, setFilterString] = React.useState("")

    let countriesToInclude: Country[] = []
    countriesToInclude = state.projectDetails.countryEditing.countries.filter(country => country.tag && (country.tag.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[country.tag].toLocaleLowerCase().includes(filterString)))
    if(countriesToInclude.length > 5){
        countriesToInclude.length = 5
    }

    let filterFunction = (input: any) => {
        setFilterString(input.target.value)
        countriesToInclude = state.projectDetails.countryEditing.countries.filter(country => country.tag && (country.tag.toLocaleLowerCase().includes(filterString) || state.projectDetails.localisationMap[country.tag].toLocaleLowerCase().includes(filterString)))
        if(countriesToInclude.length > 5){
            countriesToInclude.length = 5
        }
    }

    let contents: JSX.Element[] = []
    countriesToInclude.forEach(country => {
        contents.push(
            <a className="dropdown-item" key={country.tag} onClick={(event) => {
                dispatch(createActionOpenCountry(country))
            }}>{state.projectDetails.localisationMap[country.tag]} ({country.tag})</a>
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

export default CountrySearch;
