import * as React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { AppContextInterface } from "../../state/mainState.interface";

const Navbar = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    return (
        <nav className="navbar navbar-expand bg-light">
            <div className="navbar-nav">
                <div className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/project">Project</Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/countries">Countries</Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/states">States</Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/characters">Characters</Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/massedit">Bulk</Link>
                </div>
                {
                    //still in dev
                    // state.appDetails.debug && 
                    // <div className="nav-item">
                    //     <Link className="nav-link" to="/map">Map</Link>
                    // </div>
                }
                {
                    //debug menu
                    state.appDetails.debug &&
                    <div className="nav-item">
                        <Link className="nav-link" to="/debug">Debug</Link>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
