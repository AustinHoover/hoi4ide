import * as React from "react";
import { ArrowLeft, ArrowRight, Save, Save2, SaveFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import "./traitedit.css"


export interface TraitEditProps {
    optionsAvailable: string[],
    optionsCurrentlySelected: string[],
    onSaveCallback: (selectedTraits: string[]) => void,
}

const TraitEdit = (props: TraitEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch
    
    //setup state
    let [optionsSelected, setOptionsSelected] = React.useState(props.optionsCurrentlySelected)

    let selectedListRef = React.useRef<HTMLSelectElement>(null)
    let availableListRef = React.useRef<HTMLSelectElement>(null)

    let optionsAvailableJSX: JSX.Element[] = []
    let optionsSelectedJSX: JSX.Element[] = []

    props.optionsAvailable.forEach(option => {
        optionsAvailableJSX.push(<option value={option}>{option}</option>)
    })

    optionsSelected.forEach(option => {
        optionsSelectedJSX.push(<option value={option}>{option}</option>)
    })

    let onClickLeft = (event: any) => {
        if(selectedListRef.current && availableListRef.current){
            let availableOptionsHighlighted = Array.prototype.slice.call(availableListRef.current.selectedOptions).map((option: any) => option.value)
            setOptionsSelected(optionsSelected.concat(availableOptionsHighlighted))
        }
    }

    let onClickRight = (event: any) => {
        if(selectedListRef.current && availableListRef.current){
            let selectedOptionsHighlighted = Array.prototype.slice.call(selectedListRef.current.selectedOptions).map((option: any) => option.value)
            setOptionsSelected(optionsSelected.filter((option: string) => !selectedOptionsHighlighted.includes(option)))
        }
    }

    return (
        <div>
            <div style={{display: "flex", flexDirection: "row",}}>
                <div className="m-2" style={{width: "45%"}}>
                    <div>Selected Traits</div>
                    <select className="form-select" multiple={true} ref={selectedListRef}>
                        {optionsSelectedJSX}
                    </select>
                </div>
                <div  className="m-2" style={{display: "flex", flexDirection: "column"}}>
                    <div>&nbsp;</div>
                    <button className="btn btn-primary m-2" onClick={onClickLeft}>
                        <ArrowLeft/>
                    </button>
                    <button className="btn btn-primary m-2" onClick={onClickRight}>
                        <ArrowRight/>
                    </button>
                </div>
                <div className="m-2" style={{width: "45%"}}>
                    <div>Available Traits</div>
                    <select className="form-select" multiple={true} ref={availableListRef}>
                        {optionsAvailableJSX}
                    </select>
                </div>
            </div>
            <button className="btn btn-success" onClick={()=>{props.onSaveCallback(optionsSelected)}}>
                <SaveFill/>
                Commit Changes
            </button>
        </div>
    );
}

export default TraitEdit;
