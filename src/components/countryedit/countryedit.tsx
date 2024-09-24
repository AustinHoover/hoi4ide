import * as React from "react";
import { FilePerson, Plus, Trash, Tree } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionDeleteCharacter, createActionDeleteUnit, createActionOpenCharacter, createActionOpenCountry, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import ImageDisplay from "../imagedisplay/imagedisplay";

import "./countryedit.css"

export interface CountryEditProps {
    country: Country
}

const errorCountry: Country = {
    tag: "ERR",
    color: [255, 0, 0],
    graphicalCulture: "",
    // triggers: [],
    vanilla: false,
    tagFile: {path: ""},
    countryFile: {
        graphical_culture: "",
        graphical_culture_2d: "",
        color: [],
        path: "",
    },
    countryHistoryFile: {
        capital: 0,
        oob: "",
        scopes: [],
        path: "",
    },
    unitFiles: [],
}

const CountryEdit = (props: CountryEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [currentTab, setCurrentTab] = React.useState(0);

    let currentCountry: Country = state.projectDetails.countryEditing.currentlySelectedCountry ? state.projectDetails.countryEditing.currentlySelectedCountry : errorCountry

    let statesOwned = state.projectDetails.stateEditing.states.filter(state => state.ownerTag === currentCountry.tag)
    let statesOwnedBadges = statesOwned.map(stateData => {
        let selectState = () => {
            dispatch(createActionOpenState(stateData))
            navigate("/states")
        }
        return <div key={stateData.name} className="card m-1 p-2 shadow" 
        style={{cursor: "pointer", width: "24%", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center" }}
        onClick={selectState}>
            <Tree style={{marginRight: "15%"}}/>
            {state.projectDetails.localisationMap[stateData.name]}
            </div>
    })

    let tagRegex = new RegExp(`${currentCountry.tag}_`)
    let characters = state.projectDetails.characterEditing.characters.filter(character => character.tag.match(tagRegex))
    let leaders = characters.filter(character => character.properties.country_leader)
    let generals = characters.filter(character => character.properties.corps_commander)
    let advisors = characters.filter(character => character.properties.advisor)
    let leaderBadges = leaders.map(character => {
        let selectCharacter = () => {
            dispatch(createActionOpenCharacter(character))
            navigate("/characters")
        }
        let deleteCharacter = (event: React.SyntheticEvent) => {
            dispatch(createActionDeleteCharacter(character))
            event.stopPropagation()
        }
        let portrait = "GFX_portrait_unknown"
        if(character.properties.portraits.civilian?.scopes?.length && character.properties.portraits.civilian?.scopes?.length > 0){
            portrait = character.properties.portraits.civilian?.scopes[0].object
        }
        // console.log(state.projectDetails.spriteMap[portrait]?.replace("dds","png"))
        return <div key={character.tag} className="card m-3 p-2 shadow"
        style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
        onClick={selectCharacter}>
                <ImageDisplay width={50} height={50} relativeSourcePath={"/" + state.projectDetails.spriteMap[portrait]?.replace("dds","png")}/>
                {character.properties.name}
                <Trash style={{color: "#A00"}} onClick={deleteCharacter}/>
            </div>
    })
    let generalBadges = generals.map(character => {
        let selectCharacter = () => {
            dispatch(createActionOpenCharacter(character))
            navigate("/characters")
        }
        let deleteCharacter = (event: React.SyntheticEvent) => {
            dispatch(createActionDeleteCharacter(character))
            event.stopPropagation()
        }
        let portrait = "GFX_portrait_unknown"
        if(character.properties.portraits.army?.scopes?.length && character.properties.portraits.army?.scopes?.length > 0){
            portrait = character.properties.portraits.army?.scopes[0].object
        }
        return <div key={character.tag} className="card m-3 p-2 shadow"
        style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
        onClick={selectCharacter}>
                <ImageDisplay width={50} height={50} relativeSourcePath={"/" + state.projectDetails.spriteMap[portrait]?.replace("dds","png")}/>
                {character.properties.name}
                <Trash style={{color: "#A00"}} onClick={deleteCharacter}/>
            </div>
    })
    let advisorBadges = advisors.map(character => {
        let selectCharacter = () => {
            dispatch(createActionOpenCharacter(character))
            navigate("/characters")
        }
        let deleteCharacter = (event: React.SyntheticEvent) => {
            dispatch(createActionDeleteCharacter(character))
            event.stopPropagation()
        }
        let portrait = "GFX_portrait_unknown"
        if(character.properties.portraits.civilian?.scopes?.length && character.properties.portraits.civilian?.scopes?.length > 0){
            portrait = character.properties.portraits.civilian?.scopes[0].object
        }
        if(character.properties.portraits.army?.scopes?.length && character.properties.portraits.army?.scopes?.length > 0){
            portrait = character.properties.portraits.army?.scopes[0].object
        }
        return <div key={character.tag} className="card m-3 p-2 shadow"
        style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
        onClick={selectCharacter}>
                <ImageDisplay width={50} height={50} relativeSourcePath={"/" + state.projectDetails.spriteMap[portrait]?.replace("dds","png")}/>
                {character.properties.name}
                <Trash style={{color: "#A00"}} onClick={deleteCharacter}/>
            </div>
    })

    return (
        <div className="w-100 overflow-auto" style={{height: "90%", paddingRight: "5%"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                <div style={{display:"flex", flexDirection:"row", padding: "30px", alignItems: "center"}}>
                    <div style={{fontSize: "30px", paddingRight: "15px"}}>{state.projectDetails.localisationMap[currentCountry.tag]} ({currentCountry.tag})</div>
                    <div className={`dot`} style={{backgroundColor:`rgb(${currentCountry.color[0]}, ${currentCountry.color[1]}, ${currentCountry.color[2]})`}}></div>
                </div>
                <button type="button" className="btn-close" aria-label="Close" style={{margin: "15px", padding: "15px", backgroundColor: "#F00"}} onClick={()=>{dispatch(createActionOpenCountry(null))}}></button>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between", marginLeft: "20px", marginRight: "20px",}}>
                <h1 onClick={()=>setCurrentTab(0)} style={{color: currentTab === 0 ? "black" : "lightgray"}} role="button">Owned States</h1>
                <h1 onClick={()=>setCurrentTab(1)} style={{color: currentTab === 1 ? "black" : "lightgray"}} role="button">Leaders</h1>
                <h1 onClick={()=>setCurrentTab(2)} style={{color: currentTab === 2 ? "black" : "lightgray"}} role="button">Generals</h1>
                <h1 onClick={()=>setCurrentTab(3)} style={{color: currentTab === 3 ? "black" : "lightgray"}} role="button">Advisors</h1>
            </div>
            {
                currentTab === 0 &&
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {statesOwnedBadges}
                </div>
            }
            {
                currentTab === 1 &&
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {leaderBadges}
                    <div key={"add"} className="card m-3 p-2 shadow"
                    style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}} 
                    onClick={()=>{navigate("/createcharacter")}}>
                        <Plus
                            role={"button"}
                            style={{
                                backgroundColor: "forestgreen",
                                fontSize: "30px",
                            }}
                        />
                    </div>
                </div>
            }
            {
                currentTab === 2 &&
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {generalBadges}
                    <div key={"add"} className="card m-3 p-2 shadow"
                    style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}} 
                    onClick={()=>{navigate("/createcharacter")}}>
                        <Plus
                            role={"button"}
                            style={{
                                backgroundColor: "forestgreen",
                                fontSize: "30px",
                            }}
                        />
                    </div>
                </div>
            }
            {
                currentTab === 3 &&
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {advisorBadges}
                    <div key={"add"} className="card m-3 p-2 shadow"
                    style={{cursor: "pointer", width: "22%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}} 
                    onClick={()=>{navigate("/createcharacter")}}>
                        <Plus
                            role={"button"}
                            style={{
                                backgroundColor: "forestgreen",
                                fontSize: "30px",
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default CountryEdit;
