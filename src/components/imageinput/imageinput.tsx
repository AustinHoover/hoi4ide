import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { getImgFromCache, loadImageIntoMemoryCache } from "../../img/imageCache";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";
import ImageDisplay from "../imagedisplay/imagedisplay";


export interface ImageInputProps {
    width: number,
    height: number,
    storePath: string,
    loadExistingImage?: boolean,
}

const ImageInput = (props: ImageInputProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    /**
     * 0 - No image selected
     * 1 - Image selected, loading (should show spinner)
     * 2 - Image loaded, should show ImageDisplay object
     */
    let [imageState, setImageState] = React.useState(0)

    let loadImage = async (sourcePath: string, destinationPath: string) => {
        const fs = window.require('fs')
        fs.copyFile(sourcePath,destinationPath,()=>{
            loadImageIntoMemoryCache(props.storePath,state.projectDetails,fs,true)
            setImageState(2)
        })
    }

    let openSelectFlagDialog = (value: any) => {
        let path: string = value.target.files[0].path
        loadImage(path,state.projectDetails.paths.projectImgCacheDir + props.storePath)
        setImageState(1)
    }

    React.useEffect(()=>{
        const fs = window.require('fs')
        if(props.storePath){
            loadImageIntoMemoryCache(props.storePath,state.projectDetails,fs,false)
            if(props.loadExistingImage && getImgFromCache(props.storePath)){
                setImageState(2)
            }
        }
    },[])

    let content: JSX.Element[] = []
    switch(imageState){
        case 0: {
            content.push(<div style={{width: props.width + "px", height: props.height + "px", border: "solid 1px #686767"}}>Select an image!</div>)
        } break;
        case 1: {
            content.push(<div style={{width: props.width + "px", height: props.height + "px", border: "solid 1px #686767"}} className={`spinner-border`} role="status"/>)
        } break;
        case 2: {
            content.push(<ImageDisplay width={props.width} height={props.height} relativeSourcePath={props.storePath}/>)
        } break;
    }

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            {content}
            <input type="file" className="form-control-file shadow-sm" style={{width: props.width}} onChange={openSelectFlagDialog}></input>
        </div>
    );
}

export default ImageInput;
