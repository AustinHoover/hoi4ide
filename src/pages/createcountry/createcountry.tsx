import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountryEditTabs from "../../components/countryedittabs/countryedittabs";
import CountrySearch from "../../components/countrysearch/countrysearch";
import GenericDropdown, { loseFocusContainer } from "../../components/dropdowngeneric/dropdowngeneric";
import ImageInput from "../../components/imageinput/imageinput";
import Navbar from "../../components/navbar/navbar";
import ScopeEdit from "../../components/scopeedit/scopeedit";
import { CountryFile, HistoryCountryFile, TagFile, UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionAddCountry, createActionSetCountryName } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";

import './createcountry.css';

const graphicsCultures: string[] = [
    "western_european",
    "eastern_european",
    "middle_eastern",
    "african",
    "asian",
    "southamerican",
    "commonwealth",
]

//as grabbed from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
let hexToRgb = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const defaultHistoryFile: HistoryCountryFile = {
    capital: 44,
    oob: "REPLACE_ME",
    scopes: [
        {
            name: "set_technology",
            object: {
                infantry_weapons: 1,
                tech_support: 1,
                tech_recon: 1
            },
            type: 1
        },
        {
            name: "set_politics",
            object: {
                ruling_party: "neutrality",
                last_election: "1933.3.5",
                election_frequency: 48,
                elections_allowed: false
            },
            type: 1
        },
        {
            name: "set_popularities",
            object: {
                neutrality: 100
            },
            type: 1
        }
    ],
    path: "C:\\Users\\satellite\\Documents\\hoi4\\testproject2/history/countries/COUNTRY_NAME - TAG.txt"
}

const defaultOOB: UnitHistoryFile = {
    division_template: [
        {
            name: "Infantry",
            division_names_group: "USA_INF_01",
            regiments: {
                //@ts-ignore
                infantry: [
                    {
                        x: 0,
                        y: 0
                    },
                    {
                        x: 0,
                        y: 1
                    },
                    {
                        x: 1,
                        y: 0
                    },
                    {
                        x: 1,
                        y: 1
                    }
                ]
            }
        }
    ],
    units: {
        division: [],
        fleet: [],
    },
    instant_effect: {
        scopes: [],
    },
    path: "G:/SteamLibrary/steamapps/common/Hearts of Iron IV/history/units/SWI_1936.txt"
}

const CreateCountry = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let onLoseFocusContainer: loseFocusContainer = { }

    let [page,setPage] = React.useState(0)
    let [name,setName] = React.useState("")
    let [tag,setTag] = React.useState("")
    let [graphics,setGraphics] = React.useState("")
    let [color, setColor] = React.useState("#aabbcc")
    let [flagPath, setFlagPath] = React.useState("")

    let createCountry = () => {
        const fs = window.require('fs')
        //get color
        let colors = [0,0,0]
        let parsedColor = hexToRgb(color)
        if(parsedColor){
            colors[0] = parsedColor.r
            colors[1] = parsedColor.g
            colors[2] = parsedColor.b
        }

        let countryFile: CountryFile = {
            color: colors,
            graphical_culture: graphics + "_gfx",
            graphical_culture_2d: graphics + "_2d",
            path: state.projectDetails.paths.projectDir + "/common/countries/" + name + ".txt",
        }

        let countryHistoryFile: HistoryCountryFile = {
            ...defaultHistoryFile,
            capital: 0,
            oob: tag + "_1936",
            path: state.projectDetails.paths.projectDir + "/history/countries/" + name + " - " + tag + ".txt",
        }

        let unitHistoryFile: UnitHistoryFile = {
            ...defaultOOB,
            path: state.projectDetails.paths.projectDir + "/history/units/" + tag + "_1936.txt"
        }

        let newCountry: Country = {
            tag: tag,
            color: colors,
            graphicalCulture: graphics,
            vanilla: false,
            tagFile: undefined,
            countryFile: countryFile,
            countryHistoryFile: countryHistoryFile,
            unitFiles: [
                unitHistoryFile
            ],
        }
        
        //move country flag to flags
        fs.copyFile(state.projectDetails.paths.projectImgCacheDir + "/temp1.png",state.projectDetails.paths.projectImgCacheDir + "/gfx/flags/" + name + ".png",()=>{})

        console.log(newCountry)

        dispatch(createActionAddCountry(newCountry))
        dispatch(createActionSetCountryName(name,tag))

        navigate("/countries")
    }
    

    return (
        <div className="h-100" onClick={(event)=>{
            if(onLoseFocusContainer.onLoseFocus){
                onLoseFocusContainer.onLoseFocus(event)
            }
        }}>
            <Navbar/>
            <div className="container p-0 m-0 h-100">
            {
                    page === 0 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Basic Information</h1>
                        <span>Tag</span>
                        <input onChange={(event)=>{setTag(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Name</span>
                        <input onChange={(event)=>{setName(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px"}}></input>
                        <span>Culture Graphics</span>
                        <GenericDropdown options={graphicsCultures} 
                        onSelect={(option: string)=>{setGraphics(option);return option}} 
                        loseFocusContainer={onLoseFocusContainer}/>
                        <span>Color</span>
                        <HexColorPicker color={color} onChange={setColor}/>
                        <button className="btn btn-success mt-3" onClick={()=>{setPage(1)}}>Next</button>
                    </div>
                }
                {
                    page === 1 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h3>Select default flag image for {name}</h3>
                        <div className="card shadow">
                            <ImageInput width={246} height={156} storePath={`/temp1.png`}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{setPage(0)}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{setPage(2)}}>Confirm</button>
                        </div>
                    </div>
                }
                {
                    page === 2 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Are you sure you want to create {name}?</h1>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{setPage(1)}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{createCountry()}}>Confirm</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CreateCountry;
