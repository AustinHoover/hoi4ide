import * as React from "react";
import { FilePerson } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState, createActionSetCountryEditTab } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./countryedittabs.css"

export interface CountryEditTabsProps {
    
}

const CountryEditTabs = (props: CountryEditTabsProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch



    return (
        <div className="h-100 nav d-flex flex-column">
            <div className="nav-item m-1">
                <a 
                    role={"button"}
                    className={`nav-link ${state.projectDetails.countryEditing.editTab === 0 ? 'active' : ''}`} 
                    onClick={()=>{dispatch(createActionSetCountryEditTab(0))}}
                >
                    Objects
                </a>
            </div>
            <div className="nav-item m-1">
                <a 
                    role={"button"}
                    className={`nav-link ${state.projectDetails.countryEditing.editTab === 1 ? 'active' : ''}`} 
                    onClick={()=>{dispatch(createActionSetCountryEditTab(1))}}
                >
                    History
                </a>
            </div>
            <div className="nav-item m-1">
                <a 
                    role={"button"}
                    className={`nav-link ${state.projectDetails.countryEditing.editTab === 2 ? 'active' : ''}`} 
                    onClick={()=>{dispatch(createActionSetCountryEditTab(2))}}
                >
                    Units
                </a>
            </div>
            <div className="nav-item m-1">
                <a 
                    role={"button"}
                    className={`nav-link ${state.projectDetails.countryEditing.editTab === 3 ? 'active' : ''}`} 
                    onClick={()=>{dispatch(createActionSetCountryEditTab(3))}}
                >
                    Templates
                </a>
            </div>
        </div>
    );
}

export default CountryEditTabs;
