import * as React from "react";

import "./dropdowngeneric.css"
import { ChangeEvent } from "react";

/**
 * Dropdown props
 */
export interface GenericDropdownProps {

    /**
     * The options for the dropdown
     */
    options: string[],

    /**
     * An optional callback that fires when the dropdown changes value
     * @param option The option that was selected
     */
    onSelect: (option: string) => string,

    /**
     * The initial value of the dropdown
     */
    initialValue?: string,

    /**
     * The maximum number of options to display at once
     */
    displayLimit?: number,

    /**
     * The overflow behavior for the dropdown options
     */
    overflow?: boolean,
}

/**
 * A generic dropdown
 */
const GenericDropdown = (props: GenericDropdownProps) => {

    let [value, setValue] = React.useState("")

    React.useEffect(()=>{
        if(props.initialValue){
            setValue(props.initialValue)
        }
    },[props.initialValue])


    let optionsToInclude: string[] = []
    optionsToInclude = props.options
    if(props.displayLimit && optionsToInclude.length > props.displayLimit){
        optionsToInclude.length = props.displayLimit
    }

    let onChange = (input: ChangeEvent<HTMLSelectElement>) => {
        const value: string | null = input.target.value
        optionsToInclude = props.options
        if(props.displayLimit && optionsToInclude.length > props.displayLimit){
            optionsToInclude.length = props.displayLimit
        }
        if(!!props.onSelect){
            props.onSelect(value)
        }
        setValue(value)
    }

    let contents: JSX.Element[] = []
    optionsToInclude.forEach((option,i) => {
        contents.push(
            <option className="dropdown-item" key={option + "-" + i} 
            style={{overflow: props.overflow ? "auto" : ""}}
            >
                {option}
            </option>
        )
    })
    
    return (
        <div className="dropdown" style={{overflow: props.overflow ? "auto" : ""}}>
            <select
                className="m-2 form-control"
                placeholder="Search.."
                id="myInput"
                onChange={onChange}
                value={value}
            >
                {contents}
            </select>
        </div>
    );
}

export default GenericDropdown;
