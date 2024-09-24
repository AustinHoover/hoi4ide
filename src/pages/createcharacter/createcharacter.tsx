import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import CountryEdit from "../../components/countryedit/countryedit";
import CountryEditTabs from "../../components/countryedittabs/countryedittabs";
import CountrySearch from "../../components/countrysearch/countrysearch";
import ImageInput from "../../components/imageinput/imageinput";
import Navbar from "../../components/navbar/navbar";
import ScopeEdit from "../../components/scopeedit/scopeedit";
import { CharacterProperties, PortraitProperties } from "../../interface/rawFile.interface";
import { SCOPE_TYPE } from "../../pdxapi/scopeDefinitions";
import { createActionAddCharacter } from "../../state/mainState.actions";
import { AppContextInterface, Character } from "../../state/mainState.interface";

import './createcharacter.css';

const CreateCharacter = () => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [page,setPage] = React.useState(0)
    let [name,setName] = React.useState("")
    let [isLeader,setIsLeader] = React.useState(false)
    let [isAdvisor,setIsAdvisor] = React.useState(false)
    let [isUnitLeader,setIsUnitLeader] = React.useState(false)
    let [ideology,setIdeology] = React.useState("")
    let [expirationDate,setExpirationDate] = React.useState("")
    let [slot,setSlot] = React.useState("")
    let [ledger,setLedger] = React.useState("")
    let [traits,setTraits] = React.useState("")
    let [skill,setSkill] = React.useState("")
    let [skillAttack,setSkillAttack] = React.useState("")
    let [skillDefense,setSkillDefense] = React.useState("")
    let [skillLogistics,setSkillLogistics] = React.useState("")
    let [skillPlanning,setSkillPlanning] = React.useState("")
    //basic flow
    //page 1 set name, what type of character
    //page 2 set leader if exists
    //page 3 set advisor if exists
    //page 4 set unit leader if exists
    //page 5 save/commit

    let createCharacter = () => {
        /*country_leader?: CountryLeaderProperties,
    advisor?: AdvisorProperties,
    corps_commander?: CorpsCommanderProperties, */

        let portraits: PortraitProperties = {
            
        }

        let newCharacter: CharacterProperties = {
            name: name,
            portraits: portraits,
        }

        if(isLeader){
            newCharacter.country_leader = {
                // ideology: ideology,
                // expire: expirationDate,
                id: -1,
                scopes: [
                    {
                        name: "ideology",
                        object: ideology,
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                    {
                        name: "expire",
                        object: expirationDate,
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                ],
            }
        }

        if(isAdvisor){
            newCharacter.advisor = [{
                // slot: slot,
                // idea_tokens: state.projectDetails.countryEditing.currentlySelectedCountry?.tag + "_" + name.replaceAll(" ","_"),
                // ledger: ledger,
                // traits: traits.split(" "),
                scopes: [
                    {
                        name: "slot",
                        object: slot,
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                    {
                        name: "idea_tokens",
                        object: state.projectDetails.countryEditing.currentlySelectedCountry?.tag + "_" + name.replaceAll(" ","_"),
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                    {
                        name: "ledger",
                        object: ledger,
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                    {
                        name: "traits",
                        object: traits.split(" "),
                        type: SCOPE_TYPE.CHARACTER_DEFN,
                    },
                ],
            }]
        }

        if(isUnitLeader){
            newCharacter.corps_commander = {
                attack_skill: Number.parseFloat(skillAttack),
                defense_skill: Number.parseFloat(skillDefense),
                logistics_skill: Number.parseFloat(skillLogistics),
                planning_skill: Number.parseFloat(skillPlanning),
                legacy_id: -1,
                scopes: [{
                    name: "skill",
                    object: Number.parseFloat(skill),
                    type: SCOPE_TYPE.CHARACTER_DEFN,
                }],
            }
        }

        let finalCharacterObject: Character = {
            tag: state.projectDetails.countryEditing.currentlySelectedCountry?.tag + "_" + name.replaceAll(" ","_"),
            properties: newCharacter,
            characterFile: null,
        }

        dispatch(createActionAddCharacter(finalCharacterObject))

        navigate("/countries")
    }

    let clickNext = () => {
        switch(page){
            case 0: {
                if(isLeader){
                    setPage(1)
                } else if(isAdvisor){
                    setPage(2)
                } else if(isUnitLeader){
                    setPage(3)
                }
            } break;
            case 1: {
                if(isAdvisor){
                    setPage(2)
                } else if(isUnitLeader){
                    setPage(3)
                } else {
                    setPage(4)
                }
            } break;
            case 2: {
                if(isUnitLeader){
                    setPage(3)
                } else {
                    setPage(4)
                }
            } break;
            case 3: {
                setPage(4)
            } break;
            case 4: {
                setPage(5)
            } break;
            case 5: {
                createCharacter()
            } break;
        }
    }

    let clickPrevious = () => {
        switch(page){
            case 1: {
                setPage(0)
            } break;
            case 2: {
                if(isLeader){
                    setPage(1)
                } else {
                    setPage(0)
                }
            } break;
            case 3: {
                if(isAdvisor){
                    setPage(2)
                } else if(isLeader){
                    setPage(1)
                } else {
                    setPage(0)
                }
            } break;
            case 4: {
                if(isUnitLeader){
                    setPage(3)
                } else if(isAdvisor){
                    setPage(2)
                } else if(isLeader){
                    setPage(1)
                } else {
                    setPage(0)
                }
            } break;
            case 5: {
                setPage(4)
            } break;
        }
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
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{display: "flex", flexDirection: "column", margin: "20px", width: "33%", minWidth: "100px"}}>
                                <span className="form-check-label">Leader</span>
                                <input onChange={(event)=>{setIsLeader(event.target.checked)}} type="checkbox" className="form-check"></input>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", margin: "20px", width: "33%", minWidth: "100px"}}>
                                <span className="form-check-label">Advisor</span>
                                <input onChange={(event)=>{setIsAdvisor(event.target.checked)}} type="checkbox" className="form-check"></input>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", margin: "20px", width: "33%", minWidth: "100px"}}>
                                <span className="form-check-label">Unit Leader</span>
                                <input onChange={(event)=>{setIsUnitLeader(event.target.checked)}} type="checkbox" className="form-check"></input>
                            </div>
                        </div>
                        <button className="btn btn-success" onClick={()=>{clickNext()}}>Next</button>
                    </div>
                }
                {
                    page === 1 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>{name}'s Leader Stats</h1>
                        <span>Ideology</span>
                        <input onChange={(event)=>{setIdeology(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>"Expiration" Date</span>
                        <input onChange={(event)=>{setExpirationDate(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{clickPrevious()}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{clickNext()}}>Next</button>
                        </div>
                    </div>
                }
                {
                    page === 2 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>{name}'s Advisor Stats</h1>
                        <span>Slot</span>
                        <input onChange={(event)=>{setSlot(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Ledger</span>
                        <input onChange={(event)=>{setLedger(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Traits</span>
                        <input onChange={(event)=>{setTraits(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{clickPrevious()}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{clickNext()}}>Next</button>
                        </div>
                    </div>
                }
                {
                    page === 3 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>{name}'s Unit Leader Stats</h1>
                        <span>Skill Level</span>
                        <input onChange={(event)=>{setSkill(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Attack</span>
                        <input onChange={(event)=>{setSkillAttack(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Defense</span>
                        <input onChange={(event)=>{setSkillDefense(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Planning</span>
                        <input onChange={(event)=>{setSkillPlanning(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <span>Logistics</span>
                        <input onChange={(event)=>{setSkillLogistics(event.target.value)}} className="form-control" type="text" style={{maxWidth: "500px", marginBottom: "30px"}}></input>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{clickPrevious()}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{clickNext()}}>Next</button>
                        </div>
                    </div>
                }
                {
                    page === 4 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Select portrait here...</h1>
                        <div className="row">
                            <div className="col">
                                <span>Civilian, Large</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                            <div className="col">
                                <span>Civilian, Small</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                            <div className="col">
                                <span>Army, Large</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>Army, Small</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                            <div className="col">
                                <span>Navy, Large</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                            <div className="col">
                                <span>Navy, Small</span>
                                <ImageInput width={150} height={250} storePath={``}/>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {/*TODO: lint inputs */}
                            <button className="btn btn-danger m-2" onClick={()=>{clickPrevious()}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{clickNext()}}>Next</button>
                        </div>
                    </div>
                }
                {
                    page === 5 &&
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className="form-group h-100">
                        <h1>Confirmation</h1>
                        <div>Are you sure you want to create {name}?</div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <button className="btn btn-danger m-2" onClick={()=>{clickPrevious()}}>Back</button>
                            <button className="btn btn-success m-2" onClick={()=>{clickNext()}}>Next</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CreateCharacter;
