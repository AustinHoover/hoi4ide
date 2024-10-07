import * as React from "react";

import "./dropdowngeneric.css"
import { ChangeEvent } from "react";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";

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
     * The overflow behavior for the dropdown options
     */
    overflow?: boolean,

    /**
     * Controls whether the dropdown is clearable or not
     */
    isClearable?: boolean,
}

/**
 * A generic dropdown
 */
const GenericDropdown = (props: GenericDropdownProps) => {

    /**
     * Options available
     */
    const options = props.options.map(option => {
        return {
            value: option,
            label: option,
        }
    }) as any

    let onChange = (newValue: any, actionMeta: ActionMeta<string>) => {
        const value = newValue?.value ? newValue.value : ''
        if(!!props.onSelect){
            props.onSelect(value)
        }
    }

    //clearable status
    const clearable: boolean = props.isClearable ? props.isClearable : false
    
    return (
        <div className="dropdown" style={{overflow: props.overflow ? "auto" : ""}}>
            <ReactSelect
            options={options}
            onChange={onChange}
            isClearable={clearable}
            />
        </div>
    );
}

export default GenericDropdown;
