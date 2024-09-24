import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountryEditTabs from "../../components/countryedittabs/countryedittabs";
import CountrySearch from "../../components/countrysearch/countrysearch";
import Navbar from "../../components/navbar/navbar";
import ScopeEdit from "../../components/scopeedit/scopeedit";
import { UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionAddUnit } from "../../state/mainState.actions";
import { AppContextInterface, Unit } from "../../state/mainState.interface";

import './createunit.css';

const CreateUnit = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [page,setPage] = React.useState(0)
    let [name,setName] = React.useState("")
    let [location,setLocation] = React.useState("")
    let [divisionTemplate,setDivisionTemplate] = React.useState("")
    let [startExperience,setExperience] = React.useState("")
    let [startEquipment,setEquipment] = React.useState("")
    let [startManpower,setManpower] = React.useState("")
    //basic flow
    //page 1 set name, what type of character
    //page 2 set leader if exists
    //page 3 set advisor if exists
    //page 4 set unit leader if exists
    //page 5 save/commit

    let countryTag: string = state.projectDetails.countryEditing.currentlySelectedCountry?.tag ? state.projectDetails.countryEditing.currentlySelectedCountry?.tag : ""

    let unitFile: UnitHistoryFile | undefined = state.projectDetails.projectFiles.unitHistoryFiles.find(file => file.path.match(`${countryTag}_`))

    let createUnit = () => {

        let unit: Unit = {
            name: name,
            provinceId: Number.parseFloat(location),
            divisionTemplate: divisionTemplate,
            startExperience: 0.0,
            unitFile: unitFile ? unitFile : null,
        }

        if(startExperience !== ""){
            unit.startExperience = Number.parseFloat(startExperience)
        }
        if(startEquipment !== ""){
            unit.startEquipment = Number.parseFloat(startEquipment)
        }
        if(startManpower !== ""){
            unit.startManpower = Number.parseFloat(startManpower)
        }

        dispatch(createActionAddUnit(unit))

        navigate("/countries")
    }

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
            {
                    page === 0 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Basic Information</h1>
                        <span>Name</span>
                        <input onChange={(event)=>{setName(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Location</span>
                        <input onChange={(event)=>{setLocation(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Template</span>
                        <input onChange={(event)=>{setDivisionTemplate(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Starting Experience Percentage</span>
                        <input onChange={(event)=>{setExperience(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Starting Equipment Percentage</span>
                        <input onChange={(event)=>{setEquipment(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Starting Manpower Percentage</span>
                        <input onChange={(event)=>{setManpower(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <button className="btn btn-success" onClick={()=>{setPage(1)}}>Next</button>
                    </div>
                }
                {
                    page === 1 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Are you sure you want to create this division?</h1>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{setPage(0)}}>Back</button>
                            <button className="btn btn-success m-2" onClick={createUnit}>Next</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CreateUnit;
