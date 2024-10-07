import * as React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountryEditTabs from "../../components/countryedittabs/countryedittabs";
import CountrySearch from "../../components/countrysearch/countrysearch";
import Navbar from "../../components/navbar/navbar";
import ScopeEdit from "../../components/scopeedit/scopeedit";
import TemplateEdit from "../../components/templateedit/templateedit";
import UnitEdit from "../../components/unitedit/unitedit";
import { AppContextInterface } from "../../state/mainState.interface";
import { ScopeableObject } from "../../interface/rawFile.interface";
import { createActionEditState } from "../../state/mainState.actions";
import { HistoryCountryFile } from "../../interface/rawFile.interface";

import './Countries.css';

const Countries = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let currentCountry = state.projectDetails.countryEditing.currentlySelectedCountry

    let content;
    if(currentCountry){
        switch(state.projectDetails.countryEditing.editTab){
            case 0: {
                content = <CountryEdit country={currentCountry}/>
            } break;
            case 1: {
                //@ts-ignore
                let scopeFile: HistoryCountryFile = state.projectDetails.projectFiles.historyCountryFiles.find(scopeFile => scopeFile.path.includes(currentCountry.tag))
                const onSave = (scopeObj: ScopeableObject) => {
                    scopeFile.scopes = scopeObj.scopes
                    const newState = {...state}
                    dispatch(createActionEditState(newState))
                }
                if(scopeFile){
                    content = <ScopeEdit scopedObject={scopeFile} onSave={onSave}/>
                } else {
                    content = <div>No scope file found..</div>
                }
            } break;
            case 2: {   
                let scope = currentCountry.unitFiles
                console.log(scope)
                if(scope){
                    content = <UnitEdit unitFiles={scope}/>
                } else {
                    content = <div>No unit files found..</div>
                }
            } break;
            case 3: {
                let scope = currentCountry.unitFiles
                console.log(scope)
                if(scope){
                    content = <TemplateEdit unitFiles={scope}/>
                } else {
                    content = <div>No unit files found..</div>
                }
            } break
        }
    } else {
        content = <CountrySearch/>
    }

    return (
        <div>
            <Navbar/>
            <div className="container p-0 m-0">
                <div className="d-flex flex-row">
                    <CountryEditTabs/>
                    <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{height: "90vh"}}>
                        {content}
                        {
                            !context.state.projectDetails.countryEditing.currentlySelectedCountry && 
                            <Link to="/createcountry">Create a new country</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Countries;
