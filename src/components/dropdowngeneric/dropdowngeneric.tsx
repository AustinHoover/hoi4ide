import * as React from "react";

import "./dropdowngeneric.css"
import { ChangeEvent } from "react";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";
import WindowedSelect from "react-windowed-select";

/**
 * An option for the dropdown
 */
export interface DropdownOption {

    /**
     * The label of the option
     */
    label: string,

    /**
     * The value of the option
     */
    value: any,
}

/**
 * Dropdown props
 */
export interface GenericDropdownProps {

    /**
     * The options for the dropdown
     */
    options: DropdownOption[],

    /**
     * An optional callback that fires when the dropdown changes value
     * @param option The option that was selected
     */
    onChange: (option: any) => void,

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

    /**
     * Toggles whether this is a multidropdown or not
     */
    isMulti?: boolean,

    /**
     * The value of the dropdown
     */
    value?: any,

    /**
     * An optional label for the dropdown
     */
    label?: string,
}

/**
 * A generic dropdown
 */
const GenericDropdown = (props: GenericDropdownProps) => {

    let onChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        if(!!props.onChange){
            props.onChange(newValue)
        }
    }

    //clearable status
    const clearable: boolean = props.isClearable ? props.isClearable : false
    
    return (
        <div className="dropdown" style={{overflow: props.overflow ? "auto" : ""}}>
            {
                props.label &&
                <label>{props.label}</label>
            }
            <WindowedSelect
            options={props.options}
            onChange={onChange}
            isClearable={clearable}
            windowThreshold={50}
            value={props?.value !== undefined ? props.value : undefined}
            isMulti={props.isMulti}
            />
        </div>
    );
}

export default GenericDropdown;
