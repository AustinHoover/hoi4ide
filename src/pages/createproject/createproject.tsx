import * as React from "react";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountrySearch from "../../components/countrysearch/countrysearch";
import Navbar from "../../components/navbar/navbar";
import { AppContextInterface } from "../../state/mainState.interface";
import { getDirectoryOfFile } from "../../util/Utils";
import { openProject } from "../index/openProject";
import { BrowserWindow } from 'electron';

import './createproject.css';
import {  openProjectMetadataFileDialog } from "./createprojectutils";
import { useNavigate } from "react-router-dom";
import { createActionSetMetadataName } from "../../state/mainState.actions";

declare module 'react' {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        // extends React's HTMLAttributes
        directory?: string;
        webkitdirectory?: boolean;
    }
}

const CreateProject = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const navigate = useNavigate()

    const projectNameField = React.useRef<HTMLInputElement>(null);

    let projectDir = state.projectDetails.paths.projectDir
    let projectName = state.projectDetails.metadata.name

    if(context.state.pageState.loading === false &&
        context.state.projectDetails.paths.projectDir !== ""){
        setTimeout(()=>{navigate("/home")},100)
    }

    let onSetProjectName = () => {
        if(projectNameField.current?.value){
            dispatch(createActionSetMetadataName(projectNameField.current.value))
        }
    }

    return (
        <div className="h-100">
            <div className="container p-0 m-0 h-100">
                <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    {projectName === "" && context.state.pageState.loading === false &&
                        <div>
                            <div>Project Name</div>
                            <input type="text" ref={projectNameField}></input>
                            <button onClick={onSetProjectName}>Next</button>
                        </div>
                    }
                    {context.state.pageState.loading === true && <div className={`spinner-border`} role="status"/>}
                    {projectName !== "" && projectDir === "" && context.state.pageState.loading === false && 
                        <button className="btn btn-primary" onClick={()=>{openProjectMetadataFileDialog(context)}}>Select New Project Folder</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateProject;
