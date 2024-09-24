import * as React from "react";
import { AppContext } from "../../App";
import MapView from "../../components/mapview/mapview";
import Navbar from "../../components/navbar/navbar";
import StateEdit from "../../components/stateedit/stateedit";
import StateSearch from "../../components/statesearch/statesearch";
import { AppContextInterface } from "../../state/mainState.interface";

const Maps = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    //https://gamedev.stackexchange.com/questions/110152/procedurally-generate-rivers-for-2-d-heightmap-terrain
    //river eventually

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
                <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    <MapView/>
                </div>
            </div>
        </div>
    );
}

export default Maps;
