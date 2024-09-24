import * as React from "react";
import { AppContext } from "../../App";
import Navbar from "../../components/navbar/navbar";
import StateEdit from "../../components/stateedit/stateedit";
import StateSearch from "../../components/statesearch/statesearch";
import { AppContextInterface } from "../../state/mainState.interface";

import './States.css';

const States = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let currentState = state.projectDetails.stateEditing.currentlySelectedState

    let content;
    if(currentState){
        content = <StateEdit state={currentState}/>
    } else {
        content = <StateSearch/>
    }

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
                <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default States;
