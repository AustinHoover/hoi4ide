import * as React from "react";
import { AppContext } from "../../App";
import { createActionEditState, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Country, State } from "../../state/mainState.interface";
import StateOwnerEdit from "../stateowneredit/stateowneredit";

import "./stateedit.css"
import GenericDropdown, { DropdownOption } from "../dropdowngeneric/dropdowngeneric";

/**
 * Props for state edit component
 */
export interface StateEditProps {

    /**
     * The state to edit
     */
    state: State
}

/**
 * The maximum number of provinces
 */
const MAX_PROVINCES = 10000

/**
 * State to display on error
 */
const errorState: State = {
    id: -1,
    name: "ERR",
    ownerTag: "ERR",
    provinces: [],
    historyFile: {
        path: "",
        state: {
            id: -1,
            name: "ERR",
            manpower: 0,
            local_supplies: 0,
            state_category: "",
            history: {
                scopes: [],
                buildings: {
                    infrastructure: 0,
                    arms_factory: 0,
                    industrial_complex: 0,
                    air_base: 0,
                }
            },
            provinces: [],
        },
    },
}

/**
 * Component for editing a state
 */
const StateEdit = (props: StateEditProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const currentState: State = state.projectDetails.stateEditing.currentlySelectedState ? state.projectDetails.stateEditing.currentlySelectedState : errorState

    //convert provinces to province options
    const initialOptions: DropdownOption[] = currentState.provinces.map(province => {
        return {
            label: province + '',
            value: province,
        }
    })

    //tracks input provinces
    const [provinces,setProvinces] = React.useState<DropdownOption[]>(initialOptions)
    const [edited,setEdited] = React.useState<boolean>(false)

    //fires on selecting a province
    const onSelectProvince = (value: any) => {
        setProvinces(value)
        setEdited(true)
    }

    //all province options available
    const provinceOptions: DropdownOption[] = []
    for(let i = 0; i < MAX_PROVINCES; i++){
        provinceOptions.push({
            label: i + '',
            value: i,
        })
    }

    //saves all mutations made on the page
    const onSave = () => {
        currentState.provinces = provinces.map(option => option.value)
        dispatch(createActionEditState({...state}))
        setEdited(false)
    }

    return (
        <div className="w-100 h-100">
            <div className="card shadow m-3">
                <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                    <div style={{fontSize: "30px", padding: "30px"}}>{state.projectDetails.localisationMap[currentState.name]} ({currentState.name})</div>
                    <button type="button" className="btn-close" aria-label="Close" style={{margin: "15px", padding: "15px", backgroundColor: "#F00"}} onClick={()=>{dispatch(createActionOpenState(null))}}></button>
                </div>
                <div>
                    <StateOwnerEdit ownerTag={currentState.ownerTag}/>
                </div>
                <div className="provinceedit m-3">
                    <div className="text-left">Provinces</div>
                    <GenericDropdown options={provinceOptions} onChange={onSelectProvince} value={provinces} isMulti={true}/>
                </div>
                <button className="btn btn-success m-3" onClick={onSave} disabled={!edited}>Save</button>
            </div>
        </div>
    );
}

export default StateEdit;
