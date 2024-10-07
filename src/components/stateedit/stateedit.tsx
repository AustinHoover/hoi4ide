import * as React from "react";
import { AppContext } from "../../App";
import { createActionEditState, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Country, State } from "../../state/mainState.interface";

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

//all province options available
const provinceOptions: DropdownOption[] = []
for(let i = 0; i < MAX_PROVINCES; i++){
    provinceOptions.push({
        label: i + '',
        value: i,
    })
}

/**
 * Options for state category
 */
const CATEGORY_OPTIONS: DropdownOption[] = [
    {
        label: "wasteland",
        value: "wasteland"
    },
    {
        label: "enclave",
        value: "enclave"
    },
    {
        label: "tiny_island",
        value: "tiny_island"
    },
    {
        label: "pastoral",
        value: "pastoral"
    },
    {
        label: "small_island",
        value: "small_island"
    },
    {
        label: "rural",
        value: "rural"
    },
    {
        label: "town",
        value: "town"
    },
    {
        label: "large_town",
        value: "large_town"
    },
    {
        label: "city",
        value: "city"
    },
    {
        label: "large_city",
        value: "large_city"
    },
    {
        label: "metropolis",
        value: "metropolis"
    },
    {
        label: "megalopolis",
        value: "megalopolis"
    },
]

/**
 * State to display on error
 */
const errorState: State = {
    id: -1,
    name: "ERR",
    ownerTag: "ERR",
    provinces: [],
    manpower: 0,
    category: 'rural',
    historyFile: {
        path: "",
        state: {
            id: -1,
            name: "ERR",
            manpower: 0,
            local_supplies: 0,
            state_category: "rural",
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

    //ownership related data
    const initialOwner: DropdownOption = {
        label: currentState.ownerTag,
        value: currentState.ownerTag,
    }
    const allOwnerOptions: DropdownOption[] = state.projectDetails.countryEditing.countries.map(country => {
        return {
            label: country.tag,
            value: country.tag,
        }
    })

    //tracks input provinces
    const [provinces,setProvinces] = React.useState<DropdownOption[]>(initialOptions)
    const [edited,setEdited] = React.useState<boolean>(false)
    const [owner,setOwner] = React.useState<DropdownOption>(initialOwner)
    const [manpower,setManpower] = React.useState<number>(currentState.manpower)
    const [oil,setOil] = React.useState<number>(currentState?.resources?.oil ? currentState?.resources?.oil : 0)
    const [aluminum,setAluminum] = React.useState<number>(currentState?.resources?.aluminum ? currentState?.resources?.aluminum : 0)
    const [rubber,setRubber] = React.useState<number>(currentState?.resources?.rubber ? currentState?.resources?.rubber : 0)
    const [tungsten,setTungsten] = React.useState<number>(currentState?.resources?.tungsten ? currentState?.resources?.tungsten : 0)
    const [steel,setSteel] = React.useState<number>(currentState?.resources?.steel ? currentState?.resources?.steel : 0)
    const [chromium,setChromium] = React.useState<number>(currentState?.resources?.chromium ? currentState?.resources?.chromium : 0)
    const [category,setCategory] = React.useState<DropdownOption>({label: currentState.category,value: currentState.category,})

    //fires on editing a numeric field
    const onEditNumeric = (dispatchFunc: React.Dispatch<any>) => {
        return (event: any) => {
            dispatchFunc(+event.target.value)
            setEdited(true)
        }
    }

    //fires on selecting a value from a dropdown
    const onEditSelect = (dispatchFunc: React.Dispatch<any>) => {
        return (value: any) => {
            dispatchFunc(value)
            setEdited(true)
        }
    }

    //saves all mutations made on the page
    const onSave = () => {
        currentState.provinces = provinces.map(option => option.value)
        //filter provinces in this state from all other states
        state.projectDetails.stateEditing.states.filter(toFilter => toFilter !== currentState).forEach(toFilter => {
            toFilter.provinces = toFilter.provinces.filter(province => !currentState.provinces.includes(province))
        })

        currentState.manpower = manpower
        if(currentState.resources){
            currentState.resources.oil = oil
            currentState.resources.aluminum = aluminum
            currentState.resources.rubber = rubber
            currentState.resources.tungsten = tungsten
            currentState.resources.steel = steel
            currentState.resources.chromium = chromium
        }

        currentState.ownerTag = owner?.value
        currentState.category = category.value

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


                <div className="row row-cols-1 row-cols-md-3 g-4">

                    <div className="col p-3 mt-0 owneredit">
                        <div className="p-3 h-100">
                            <GenericDropdown
                                options={allOwnerOptions}
                                value={owner}
                                onChange={onEditSelect(setOwner)}
                                label="Owner"
                                isClearable={true}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 provinceedit">
                        <div className="p-3 h-100">
                            <GenericDropdown options={provinceOptions} onChange={onEditSelect(setProvinces)} value={provinces} isMulti={true} label="Provinces"/>
                        </div>
                    </div>

                    <div className="col p-3 mt-0 oiledit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Oil</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={oil}
                                onChange={onEditNumeric(setOil)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 aluminumedit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Aluminum</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={aluminum}
                                onChange={onEditNumeric(setAluminum)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 rubberedit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Rubber</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={rubber}
                                onChange={onEditNumeric(setRubber)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 tungstenedit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Tungsten</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={tungsten}
                                onChange={onEditNumeric(setTungsten)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 steeledit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Steel</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={steel}
                                onChange={onEditNumeric(setSteel)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 chromiumedit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Chromium</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={chromium}
                                onChange={onEditNumeric(setChromium)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 manpoweredit">
                        <div className="p-3 h-100 form-group">
                            <label htmlFor="manpowerInput">Manpower</label>
                            <input
                                id="manpowerInput"
                                type="number"
                                className="form-control"
                                value={manpower}
                                onChange={onEditNumeric(setManpower)}
                            />
                        </div>
                    </div>

                    <div className="col p-3 mt-0 categoryedit">
                        <div className="p-3 h-100">
                            <GenericDropdown options={CATEGORY_OPTIONS} onChange={onEditSelect(setCategory)} value={category} label="Category"/>
                        </div>
                    </div>

                </div>


                <button className="btn btn-success m-3" onClick={onSave} disabled={!edited}>Save</button>
            </div>
        </div>
    );
}

export default StateEdit;
