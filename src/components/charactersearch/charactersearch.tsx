import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties } from "../../interface/rawFile.interface";
import { createActionOpenCharacter, createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";

import "./charactersearch.css"


export interface CharacterSearchProps {
    
}

const CharacterSearch = (props: CharacterSearchProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [showDropdownChildren, setShowDropdownChildren] = React.useState(false)
    let [filterString, setFilterString] = React.useState("")

    let charactersToInclude: Character[] = []
    charactersToInclude = state.projectDetails?.characterEditing?.characters?.filter(character => 
        !!character?.properties?.name && 
        character.properties.name?.toLocaleLowerCase?.()?.includes(filterString)
    )
    if(charactersToInclude.length > 5){
        charactersToInclude.length = 5
    }

    let filterFunction = (input: any) => {
        setFilterString(input.target.value)
        charactersToInclude = state.projectDetails?.characterEditing?.characters?.filter(character => 
            !!character?.properties?.name &&
            character.properties.name?.toLocaleLowerCase?.()?.includes(filterString)
        )
        if(charactersToInclude.length > 5){
            charactersToInclude.length = 5
        }
    }

    let contents: JSX.Element[] = []
    charactersToInclude.forEach(character => {
        contents.push(
            <a className="dropdown-item" key={character.properties.name} onClick={(event) => {
                dispatch(createActionOpenCharacter(character))
            }}>{character.properties.name} ({character.tag})</a>
        )
    })
    
    return (
        <div className="dropdown mb-5 w-50">
            {/* <a className="btn btn-secondary dropdown-toggle" onClick={()=>{setShowDropdownChildren(!showDropdownChildren)}}>
                Dropdown link
            </a> */}
            <input className="m-2 form-control" type="text" placeholder="Search.." id="myInput" onKeyUp={filterFunction} onClick={()=>{setShowDropdownChildren(true)}}/>
            <div className={`dropdown-menu w-100 m-2 ${showDropdownChildren ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                {contents}
            </div>
        </div>
    );
}

export default CharacterSearch;
