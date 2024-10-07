import * as React from "react";
import { AppContextInterface, Country, State } from "../../state/mainState.interface";
import { AppContext } from "../../App";
import { createActionEditState, createActionOpenState, createActionSetStateOwner } from "../../state/mainState.actions";
import { useNavigate } from "react-router-dom";
import { Tree } from "react-bootstrap-icons";
import GenericDropdown, { DropdownOption } from "../dropdowngeneric/dropdowngeneric";


/**
 * Country owned badges props
 */
export interface OwnedStateBadgesProps {
    /**
     * The country to display data for
     */
    currentCountry: Country,
}

/**
 * View of the states owned by a country
 */
const OwnedStateBadges = (props: OwnedStateBadgesProps) => {

    const navigate = useNavigate()
    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    //Available states in the dropdown
    const availbleStates: DropdownOption[] = state.projectDetails.stateEditing.states.map(currentState => {
        return {
            label: state.projectDetails.localisationMap[currentState.name] ? state.projectDetails.localisationMap[currentState.name] : currentState.name,
            value: currentState,
        }
    })

    //the state for the dropdown
    const [selectedStates,setSelectedStates] = React.useState<DropdownOption[]>(state.projectDetails.stateEditing.states
        .filter(currentState => currentState.ownerTag === props.currentCountry.tag)
        .map(currentState => {
        return {
            label: state.projectDetails.localisationMap[currentState.name] ? state.projectDetails.localisationMap[currentState.name] : currentState.name,
            value: currentState,
        }
    }))

    //fires when states are modified
    const onChange = (value: any) => {
        value?.forEach((currentState: any) => {
            currentState.value.ownerTag = props.currentCountry.tag
        })
        const newState = {...state}
        newState.projectDetails.stateEditing.states.filter(currState => {
            return !!value.find((option: any) => option.value.id === currState.id) === false && currState.ownerTag === props.currentCountry.tag
        }).forEach(currState => {
            currState.ownerTag = ''
        })
        setSelectedStates(value)
        dispatch(createActionEditState(newState))
    }

    //the badges to display
    const statesOwned: State[] = selectedStates.map(option => state.projectDetails.stateEditing.states.find(stateObj => stateObj.id === option.value.id)) as State[]
    //state.projectDetails.stateEditing.states.filter(state => state.ownerTag === props.currentCountry.tag)
    const statesOwnedBadges = statesOwned.map(stateData => {
        let selectState = () => {
            dispatch(createActionOpenState(stateData))
            navigate("/states")
        }
        return <div key={stateData.name} className="card m-1 p-2 shadow" 
            style={{
                cursor: "pointer",
                width: "24%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center"
            }}
            onClick={selectState}>
            <Tree style={{marginRight: "15%"}}/>
            {state.projectDetails.localisationMap[stateData.name] ? state.projectDetails.localisationMap[stateData.name] : stateData.name}
        </div>
    })
    
    return (
        <div className="col">
            <GenericDropdown
                options={availbleStates}
                value={selectedStates}
                onChange={onChange}
                isMulti={true}
                closeMenuOnSelect={false}
            />
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {statesOwnedBadges}
            </div>
        </div>
    );
}

export default OwnedStateBadges;
