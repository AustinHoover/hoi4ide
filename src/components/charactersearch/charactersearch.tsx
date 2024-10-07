import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCharacter } from "../../state/mainState.actions";
import { AppContextInterface, Character } from "../../state/mainState.interface";

import "./charactersearch.css"
import GenericDropdown, { DropdownOption } from "../dropdowngeneric/dropdowngeneric";


export interface CharacterSearchProps {
    
}

const CharacterSearch = (props: CharacterSearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const characters = state.projectDetails?.characterEditing?.characters.filter(character => !!character?.properties?.name)
    const names: DropdownOption[] = characters.map(character => {
        return {
            label: character.properties?.name,
            value: character.properties?.name,
        }
    })

    const onSelect = (value: any) => {
        const foundChar: Character | undefined = characters.find(character => character.properties?.name === value.value)
        if(foundChar){
            dispatch(createActionOpenCharacter(foundChar))
        }
        return value
    }

    
    return (
        <div className="dropdown mb-5 w-50">
            <GenericDropdown
                options={names}
                onChange={onSelect}
            />
        </div>
    );
}

export default CharacterSearch;
