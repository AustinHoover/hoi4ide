import * as React from "react";
import {  useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { AppContextInterface } from "../../state/mainState.interface";

import './Index.css';
import { openProject, openProjectDialog } from "./openProject";
import { createActionSetError, createActionSetLoading } from "../../state/mainState.actions";

const Index = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    
    //use separate state + effect to trigger loading project so that the loading is happening in react
    //thread and can be updated by dispatches while loading (eg to set loading = true or false)
    let [openProjectTarget, setOpenProjectTarget] = React.useState<string | null>(null)
    const [loadingError, setLoadingError] = React.useState<string | null>(null)
    React.useEffect(()=>{
        if(openProjectTarget){
            openProject(context,openProjectTarget)
        }
    },[openProjectTarget])

    React.useEffect(()=>{
        if(context.state.pageState.error?.message){
            setLoadingError(context.state.pageState.error?.message)
            setTimeout(()=>{
                setOpenProjectTarget(null)
                context.dispatch(createActionSetLoading(false))
                navigate('/')
            }, 1000)
        } else {
            setLoadingError(null)
        }
    },[context.state.pageState.error])

    //redirect to home if we have loaded project
    if(context.state.pageState.loading === false &&
        context.state.projectDetails.paths.projectDir !== ""){
        setTimeout(()=>{navigate("/home")},100)
    }

    const onCloseAlert = () => {
        context.dispatch(createActionSetError(null))
    }

    return (
        <div className="container Page">
            <div className="col">
                {context.state.pageState.error !== null &&
                    <div className="alert alert-danger alert-dismissible fade show d-flex justify-content-between" role="alert">
                        {loadingError}
                        <button type="button" className="btn close" onClick={()=>{onCloseAlert()}}>
                            <span>&times;</span>
                        </button>
                    </div>
                }
                {context.state.pageState.loading === true && <div className={`spinner-border`} role="status"/>}
                {context.state.projectDetails.paths.projectDir === "" && context.state.pageState.loading === false && 
                    <div className="row">
                        <div className="col d-flex flex-column column-width">
                            <span className="form-label">Create Project</span>
                            <button className="btn btn-primary" onClick={()=>{navigate("/createproject")}}>Create</button>
                        </div>
                        <div className="col d-flex flex-column column-width">
                            <span className="form-label">Select Project File</span>
                            <button className="btn btn-primary" onClick={()=>{openProjectDialog(context, setOpenProjectTarget)}}>Open</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Index;
