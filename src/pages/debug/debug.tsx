import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountryEditTabs from "../../components/countryedittabs/countryedittabs";
import CountrySearch from "../../components/countrysearch/countrysearch";
import Navbar from "../../components/navbar/navbar";
import ScopeEdit from "../../components/scopeedit/scopeedit";
import { CountryFile, HistoryCountryFile, TagFile, UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionAddCountry, createActionSetCountryName } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import { cleanFolderRecursive, deleteFolderRecursive } from "../../util/Utils";

import './debug.css';

const deleteLocalFiles = (context: AppContextInterface) => {
    console.log("start wipe")
    const path = window.require("path");
    let files: string[] = [
        "/common",
        "/history",
    ]
    files.forEach(file => {
        cleanFolderRecursive(path.join(context.state.projectDetails.paths.projectDir, file))
    })
    console.log("finish wipe")
}

const Debug = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch
    

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
                <button className="btn btn-danger" onClick={()=>{deleteLocalFiles(context)}}>WIPE LOCAL FILES</button>
            </div>
        </div>
    );
}

export default Debug;
