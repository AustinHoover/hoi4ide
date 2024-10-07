import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./countrysearch.css"
import GenericDropdown from "../dropdowngeneric/dropdowngeneric";


export interface CountrySearchProps {
    
}

const CountrySearch = (props: CountrySearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const countries = state.projectDetails.countryEditing.countries
    const names: string[] = countries.map(country => state.projectDetails.localisationMap[country.tag])

    const onSelect = (value: string) => {
        const country: Country | undefined = countries.find(country => state.projectDetails.localisationMap[country.tag] === value)
        console.log(country)
        if(country){
            dispatch(createActionOpenCountry(country))
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

export default CountrySearch;
