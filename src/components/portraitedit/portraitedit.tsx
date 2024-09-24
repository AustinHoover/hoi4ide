import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import ImageDisplay from "../imagedisplay/imagedisplay";

import "./portraitedit.css"

export enum PortraitType {
    CIVILIAN_SMALL,
    CIVILIAN_LARGE,
    ARMY_SMALL,
    ARMY_LARGE,
    NAVY_SMALL,
    NAVY_LARGE,
}

export interface PortraitEditProps {
    characterTag: string,
    portraitType: PortraitType,
}

const defaultPath = "/gfx/leaders/leader_unknown.png"

const PortraitEdit = (props: PortraitEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const [loading, setLoading] = React.useState(false)

    let path = ""

    state.projectDetails.characterEditing.characters.forEach(character => {
        if(character.tag === props.characterTag){
            let portraitTag: string | undefined = ""
            switch(props.portraitType){
                // case PortraitType.CIVILIAN_SMALL: {
                //     portraitTag = character.properties.portraits.civilian?.small
                // } break;
                // case PortraitType.CIVILIAN_LARGE: {
                //     portraitTag = character.properties.portraits.civilian?.large
                // } break;
                // case PortraitType.ARMY_SMALL: {
                //     portraitTag = character.properties.portraits.army?.small
                // } break;
                // case PortraitType.ARMY_LARGE: {
                //     portraitTag = character.properties.portraits.army?.large
                // } break;
                // case PortraitType.NAVY_SMALL: {
                //     portraitTag = character.properties.portraits.navy?.small
                // } break;
                // case PortraitType.NAVY_LARGE: {
                //     portraitTag = character.properties.portraits.navy?.large
                // } break;
            }
            if(portraitTag && portraitTag !== ""){
                path = "/" + state.projectDetails.spriteMap[portraitTag]?.replace("dds","png")
            }
        }
    })

    if(path === ""){
        path = defaultPath
    }
    
    return (
        <div className="card shadow">
            { loading === true  && <div className={`spinner-border`} role="status"/> }
            { loading === false && <ImageDisplay width={250} height={500} relativeSourcePath={path}></ImageDisplay> }
            <div className="d-flex flex-row">
                <span className="form-label"></span>
                <input className="form-control" type="file"></input>
            </div>
        </div>
    );
}

export default PortraitEdit;
