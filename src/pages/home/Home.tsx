import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import ImageDisplay from "../../components/imagedisplay/imagedisplay";
import ImageInput from "../../components/imageinput/imageinput";
import Navbar from "../../components/navbar/navbar";
import { AppContextInterface } from "../../state/mainState.interface";
import { getFileNameFromPath } from "../../util/Utils";
import { exportProject, openExportDirectorySelectModal } from "./exportproject";

import './Home.css';
import { saveProjectData } from "./saveproject";

const Home = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    if(state.projectDetails?.paths?.projectDir === undefined || state.projectDetails?.paths?.projectDir === ""){
        setTimeout(()=>{navigate("/")},100)
    }


    return (
        <div>
            <Navbar/>
            <div className="container Page">
                <div className="form form-group">
                    Home
                    <div className="row">
                        <div className="col">
                            <div>Save Project</div>
                            {context.state.pageState.loading === true && <div className={`spinner-border`} role="status"/>}
                            {context.state.pageState.loading === false && 
                                <button className="btn btn-warning" onClick={()=>{saveProjectData(context)}}>Save</button>
                            }
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={()=>{openExportDirectorySelectModal(context)}}>Select Export Directory</button>
                            <div>Export Directory: {state.projectDetails.paths.exportDir}</div>
                            {context.state.pageState.loading === true && <div className={`spinner-border`} role="status"/>}
                            {context.state.pageState.loading === false && 
                                <button className="btn btn-warning" onClick={()=>{exportProject(context)}}>Export</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
