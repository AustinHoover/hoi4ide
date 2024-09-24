import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./dropdowngeneric.css"

export interface loseFocusContainer {
    onLoseFocus?: (event: any) => void,
}

export interface GenericDropdownProps {
    options: string[],
    onSelect: (option: string) => string,
    loseFocusContainer: loseFocusContainer,
    initialValue?: string,
    displayLimit?: number,
    overflow?: boolean,
}

const GenericDropdown = (props: GenericDropdownProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [showDropdownChildren, setShowDropdownChildren] = React.useState(false)
    let [filterString, setFilterString] = React.useState("")
    let [value, setValue] = React.useState("")

    React.useEffect(()=>{
        if(props.initialValue){
            setValue(props.initialValue)
        }
    },[props.initialValue])

    props.loseFocusContainer.onLoseFocus = () => {
        setShowDropdownChildren(false)
    }

    let openDropdown = (event: React.SyntheticEvent) => {
        setShowDropdownChildren(true)
        event.stopPropagation()
    }


    let optionsToInclude: string[] = []
    optionsToInclude = props.options.filter(option => option.toLocaleLowerCase().includes(filterString))
    if(props.displayLimit && optionsToInclude.length > props.displayLimit){
        optionsToInclude.length = props.displayLimit
    }

    let filterFunction = (input: any) => {
        // let newString = filterString
        // if(input.key === "Backspace"){
        //     if(newString.length > 0){
        //         newString = newString.substring(0,newString.length - 1)
        //     }
        // } else {
        //     newString = newString + input.key
        // }
        setFilterString(input.target.value)
        optionsToInclude = props.options.filter(option => option.toLocaleLowerCase().includes(filterString))
        if(props.displayLimit && optionsToInclude.length > props.displayLimit){
            optionsToInclude.length = props.displayLimit
        }
    }

    let contents: JSX.Element[] = []
    optionsToInclude.forEach((option,i) => {
        contents.push(
            <a className="dropdown-item" key={option + "-" + i} 
            style={{overflow: props.overflow ? "auto" : ""}}
            onClick={(event) => {
                props.onSelect(option)
                setValue(option)
                setFilterString(option)
                event.stopPropagation()
                setShowDropdownChildren(false)
            }}>{option}</a>
        )
    })
    
    return (
        <div className="dropdown" style={{overflow: props.overflow ? "auto" : ""}}>
            <input className="m-2 form-control" type="text" placeholder="Search.." id="myInput" onChange={filterFunction} onClick={openDropdown} value={filterString ? filterString : ""}/>
            <div className={`dropdown-menu w-100 m-2 ${showDropdownChildren ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                {contents}
            </div>
        </div>
    );
}

export default GenericDropdown;
