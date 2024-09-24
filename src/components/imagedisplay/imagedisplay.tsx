import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { getImgFromCache, loadImageIntoMemoryCache } from "../../img/imageCache";
import { createActionOpenCountry } from "../../state/mainState.actions";
import { AppContextInterface, Country } from "../../state/mainState.interface";


export interface ImageDisplayProps {
    width: number,
    height: number,
    relativeSourcePath: string,
}

const ImageDisplay = (props: ImageDisplayProps) => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let ref = React.useRef<HTMLImageElement>(null)


    React.useEffect(()=>{
        const fs = window.require('fs');
        loadImageIntoMemoryCache(props.relativeSourcePath,state.projectDetails,fs)
        let cachedImage = getImgFromCache(props.relativeSourcePath)
        if(cachedImage){
            let imgData = cachedImage.data.toString('base64')
            ref.current?.setAttribute("src",`data:image/png;base64, ${imgData}`)
        }
        // var _img = fs.readFileSync(filepaths[0]).toString('base64');
        //example for .png
        // var _out = '<img src="data:image/png;base64,' + _img + '" />';
        //render/display
        // var _target = document.getElementById('image_container');
    },[props.relativeSourcePath])

    
    return (
        <img style={{width: props.width + "px", height: props.height + "px"}} ref={ref} />
        // <canvas style={{width: props.width + "px", height: props.height + "px"}} ref={ref}></canvas>
    );
}

export default ImageDisplay;
