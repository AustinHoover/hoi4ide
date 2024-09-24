import * as React from "react";
import { AppContext } from "../../App";
import CharacterEdit from "../../components/characteredit/characteredit";
import CharacterSearch from "../../components/charactersearch/charactersearch";
import CountryEdit from "../../components/countryedit/countryedit";
import CountrySearch from "../../components/countrysearch/countrysearch";
import Navbar from "../../components/navbar/navbar";
import { AppContextInterface } from "../../state/mainState.interface";

import './Characters.css';

const Characters = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let currentCharacter = state.projectDetails.characterEditing.currentlySelectedCharacter

    let content;
    if(currentCharacter){
        content = <CharacterEdit character={currentCharacter}/>
    } else {
        content = <CharacterSearch/>
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

export default Characters;
