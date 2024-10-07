import * as React from "react";
import { AppContext } from "../../App";
import Navbar from "../../components/navbar/navbar";
import { AppContextInterface, AppState } from "../../state/mainState.interface";
import { createActionEditState, createActionOpenCharacter } from "../../state/mainState.actions";

/**
 * Page for mass editing
 */
const MassEdit = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch


    /**
     * Unassign all states
     */
    const stateUnassignAll = () => {
        const newState = {...state}
        newState.projectDetails.stateEditing.states.forEach(state => {
            state.ownerTag = ''
        })
        dispatch(createActionEditState(newState))
    }

    /**
     * Deletes all countries
     */
    const deleteAllCountries = () => {
        const newState = {...state}
        newState.projectDetails.countryEditing.countries = []
        dispatch(createActionEditState(newState))
    }

    /**
     * Deletes all countries
     */
    const deleteAllCharacters = () => {
        const newState = {...state}
        newState.projectDetails.characterEditing.characters = []
        dispatch(createActionEditState(newState))
    }

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
                <div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column">

                    <button
                        className="btn btn-danger m-3"
                        onClick={stateUnassignAll}
                    >
                        Unassign All States
                    </button>

                    <button
                        className="btn btn-danger m-3"
                        onClick={deleteAllCountries}
                    >
                        Delete All Countries
                    </button>

                    <button
                        className="btn btn-danger m-3"
                        onClick={deleteAllCharacters}
                    >
                        Delete All Characters
                    </button>

                </div>
            </div>
        </div>
    );
}

export default MassEdit;
