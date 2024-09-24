import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./templatecomponent.css"


export interface TemplateComponentProps {
    
}

const TemplateComponent = (props: TemplateComponentProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch
    
    return (
        <div>
        </div>
    );
}

export default TemplateComponent;
