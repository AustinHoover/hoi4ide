import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { getImagePath } from "../../img/imageCache";
import { AdvisorProperties, CharacterProperties } from "../../interface/rawFile.interface";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState, createActionSetAdvisorTraits, createActionSetCountryLeaderTraits, createActionSetUnitLeaderTraits } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import ImageInput from "../imageinput/imageinput";
import TraitEdit from "../traiteditcard/traitedit";

import "./characteredit.css"

export interface CharacterEditProps {
    character: Character
}

const errorCharacter: Character = {
    tag: "ERR",
    properties: {
        name: "ERR",
        portraits: {

        },
    },
    characterFile: null,
}

const CharacterEdit = (props: CharacterEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let currentCharacter: Character = state.projectDetails.characterEditing.currentlySelectedCharacter ? state.projectDetails.characterEditing.currentlySelectedCharacter : errorCharacter

    //
    //ADVISOR
    //
    let advisorElement: JSX.Element = <div></div>
    if(currentCharacter.properties.advisor){
        // console.log(currentCharacter.properties.advisor)
        if(currentCharacter.properties.advisor.constructor === Array){
            currentCharacter.properties.advisor.forEach(advisor => {
                let traits = advisor.scopes.find(scope => scope.name === "traits")
                advisorElement = 
                <div className="col-6">
                    <div className="card m-3 p-3 shadow" style={{minHeight: 400}}>
                        Advisor
                        <div className="d-flex flex-column align-items-start">
                            <span>tokens: {advisor.scopes.find(scope=>scope.name==="idea_tokens")?.object}</span>
                            <span>slot: {advisor.scopes.find(scope=>scope.name==="slot")?.object}</span>
                            {traits && <TraitEdit optionsCurrentlySelected={traits.object} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                            onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetAdvisorTraits(currentCharacter.tag,advisor,selectedTraits))}}
                            />}
                            {!traits && <TraitEdit optionsCurrentlySelected={[]} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                            onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetAdvisorTraits(currentCharacter.tag,advisor,selectedTraits))}}
                            />}
                        </div>
                    </div>
                </div>
            })
        } else {
            let advisor: AdvisorProperties = currentCharacter.properties.advisor as AdvisorProperties
            let traits = advisor.scopes.find(scope => scope.name === "traits")
            advisorElement =
            <div className="col-6">
                <div className="card m-3 p-3 shadow" style={{minHeight: 400}}>
                    Advisor
                    <div className="d-flex flex-column align-items-start">
                        <span>tokens: {advisor.scopes.find(scope=>scope.name==="idea_tokens")?.object}</span>
                        <span>slot: {advisor.scopes.find(scope=>scope.name==="slot")?.object}</span>
                        {traits && <TraitEdit optionsCurrentlySelected={traits.object} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                        onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetAdvisorTraits(currentCharacter.tag,advisor,selectedTraits))}}
                        />}
                        {!traits && <TraitEdit optionsCurrentlySelected={[]} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                        onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetAdvisorTraits(currentCharacter.tag,advisor,selectedTraits))}}
                        />}
                    </div>
                </div>
            </div>
        }
    }

    //
    //COUNTRY LEADER
    //
    let countryLeaderElement: JSX.Element = <div></div>
    if(currentCharacter.properties.country_leader){
        let traits = currentCharacter.properties.country_leader.scopes.find(scope => scope.name === "traits")
        countryLeaderElement = 
        <div className="col-6">
            <div className="card m-3 p-3 shadow" style={{minHeight: 400}}>
                Country Leader
                <div className="d-flex flex-column align-items-start">
                    <span>Expire: {currentCharacter.properties.country_leader.scopes.find(scope=>scope.name==="expire")?.object}</span>
                    <span>Ideology: {currentCharacter.properties.country_leader.scopes.find(scope=>scope.name==="ideology")?.object}</span>
                    {traits && <TraitEdit optionsCurrentlySelected={traits.object} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                    onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetCountryLeaderTraits(currentCharacter.tag,selectedTraits))}}
                    />}
                    {!traits && <TraitEdit optionsCurrentlySelected={[]} optionsAvailable={state.projectDetails.characterEditing.advisorTraits}
                    onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetCountryLeaderTraits(currentCharacter.tag,selectedTraits))}}
                    />}
                </div>
            </div>
        </div>
    }


    //
    //CORPS COMMANDER
    //
    let corpsCommanderElement: JSX.Element = <div></div>
    if(currentCharacter.properties.corps_commander){
        let traits = currentCharacter.properties.corps_commander.scopes.find(scope => scope.name === "traits")
        corpsCommanderElement = 
        <div className="col-6">
            <div className="card m-3 p-3 shadow" style={{minHeight: 400}}>
                Corps Commander
                <div className="d-flex flex-column align-items-start">
                    <span style={{color: "red"}}>Attack: {currentCharacter.properties.corps_commander.attack_skill}</span>
                    <span style={{color: "darkgoldenrod"}}>Defense: {currentCharacter.properties.corps_commander.defense_skill}</span>
                    <span style={{color: "green"}}>Logistics: {currentCharacter.properties.corps_commander.logistics_skill}</span>
                    <span style={{color: "blue"}}>Planning: {currentCharacter.properties.corps_commander.planning_skill}</span>
                    <span style={{color: "grey"}}>Skill: {currentCharacter.properties.corps_commander.scopes.find(scope=>scope.name==="skill")?.object}</span>
                    {traits && <TraitEdit optionsCurrentlySelected={traits.object} optionsAvailable={state.projectDetails.characterEditing.unitTraits}
                    onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetUnitLeaderTraits(currentCharacter.tag,selectedTraits))}}
                    />}
                    {!traits && <TraitEdit optionsCurrentlySelected={[]} optionsAvailable={state.projectDetails.characterEditing.unitTraits}
                    onSaveCallback={(selectedTraits: string[])=>{dispatch(createActionSetUnitLeaderTraits(currentCharacter.tag,selectedTraits))}}
                    />}
                </div>
            </div>
        </div>
    }
    

    //
    //PORTRAITS
    //
    let portraitsElement: JSX.Element = <div></div>
    if(currentCharacter.properties.portraits){
        let portraitSelects: JSX.Element[] = []
        //civilian
        if(currentCharacter.properties.portraits.civilian){
            let largeRaw = currentCharacter.properties.portraits.civilian.scopes.find(scope => scope.name === "large")
            let large: any = ""
            if(largeRaw){
                large = largeRaw.object
            }
            let smallRaw = currentCharacter.properties.portraits.civilian.scopes.find(scope => scope.name === "small")
            let small: any = ""
            if(smallRaw){
                small = smallRaw.object
            }
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Civilian, Large
                    <ImageInput width={150} height={200} storePath={getImagePath(large,state)} loadExistingImage={true}/>
                </div>
            )
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Civilian, Small
                    <ImageInput width={150} height={200} storePath={getImagePath(small,state)} loadExistingImage={true}/>
                </div>
            )
        }
        //army
        if(currentCharacter.properties.portraits.army){
            console.log(currentCharacter.properties.portraits.army)
            let largeRaw = currentCharacter.properties.portraits.army.scopes.find(scope => scope.name === "large")
            let large: any = ""
            if(largeRaw){
                large = largeRaw.object
            }
            let smallRaw = currentCharacter.properties.portraits.army.scopes.find(scope => scope.name === "small")
            let small: any = ""
            if(smallRaw){
                small = smallRaw.object
            }
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Army, Large
                    <ImageInput width={150} height={200} storePath={getImagePath(large,state)} loadExistingImage={true}/>
                </div>
            )
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Army, Small
                    <ImageInput width={150} height={200} storePath={getImagePath(small,state)} loadExistingImage={true}/>
                </div>
            )
        }
        //navy
        if(currentCharacter.properties.portraits.navy){
            let largeRaw = currentCharacter.properties.portraits.navy.scopes.find(scope => scope.name === "large")
            let large: any = ""
            if(largeRaw){
                large = largeRaw.object
            }
            let smallRaw = currentCharacter.properties.portraits.navy.scopes.find(scope => scope.name === "small")
            let small: any = ""
            if(smallRaw){
                small = smallRaw.object
            }
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Army, Large
                    <ImageInput width={150} height={200} storePath={getImagePath(large,state)} loadExistingImage={true}/>
                </div>
            )
            portraitSelects.push(
                <div className="card m-2 p-2">
                    Army, Small
                    <ImageInput width={150} height={200} storePath={getImagePath(small,state)} loadExistingImage={true}/>
                </div>
            )
        }
        portraitsElement =
        <div className="col-6">
            <div className="card m-3 p-3 shadow" style={{minHeight: 400}}>
                Portraits
                <div style={{display:"flex", flexDirection:"row", flexWrap: "wrap"}}>
                    {portraitSelects}
                </div>
            </div>
        </div>
    }

    return (
        <div className="w-100 h-100">
            <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                <div style={{display:"flex", flexDirection:"row", padding: "30px", alignItems: "center"}}>
                    <div style={{fontSize: "30px", paddingRight: "15px"}}>{currentCharacter.properties.name} </div>
                </div>
                <button type="button" className="btn-close" aria-label="Close" style={{margin: "15px", padding: "15px", backgroundColor: "#F00"}} onClick={()=>{dispatch(createActionOpenCharacter(null))}}></button>
            </div>
            <div className="row d-flex flex-row">
                {
                    currentCharacter.properties.advisor &&
                    advisorElement
                }
                {
                    currentCharacter.properties.corps_commander &&
                    corpsCommanderElement
                }
                {
                    currentCharacter.properties.country_leader &&
                    countryLeaderElement
                }
                {
                    currentCharacter.properties.portraits &&
                    portraitsElement
                }
            </div>
        </div>
    );
}

export default CharacterEdit;
