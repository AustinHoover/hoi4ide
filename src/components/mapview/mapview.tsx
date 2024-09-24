import * as React from "react";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties, ScopeableObject } from "../../interface/rawFile.interface";
import { Scope } from "../../interface/scope.interface";
import { effectDefinitions } from "../../pdxapi/effectDefinitions";
import { scopeDeclarations } from "../../pdxapi/scopeDefinitions";
import { triggerDefinitions } from "../../pdxapi/triggerDefinitions";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState, createActionSetImgData } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import { Delaunay } from "d3-delaunay"

export interface MapViewProps {
}

function generate() {
    // const noise2D = createNoise2D();
    // let image = new Image(1000,1000);
    // let bitmap = createImageBitmap(image,)
    // bitmap.then((context)=>{
    //     context.
    // })
    // img.canv
    // for(let x = 0; x < 1000; x++){
    //     for(let y = 0; y < 1000; y++){
    //         console.log(noise2D(x,y))
    //         let intensity = (noise2D(x,y) + noise2D(x * 0.5, y * 0.5) + noise2D(x * 0.25,y * 0.25) + 3) / 6
    //         let r,g,b = intensity * 255
    //         let a = 255
    //         ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    //         ctx.fillRect( x, y, 1, 1 );
    //     }
    // }
}

let runGeneration = true

const MapView = (props: MapViewProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let canvasRef = React.useRef<HTMLCanvasElement>(null)

    let [imgData, setImgData] = React.useState(null)

    const worker = React.useMemo(() => new Worker(new URL('./generator.ts', import.meta.url)), []);

    worker.onmessage = (ev: MessageEvent<any>) => {
        if(runGeneration){
            console.log("send signal start generation")
            runGeneration = false
            worker.postMessage({
                type: "START",
                data: "somedata",
            })
        }
        switch(ev.data.type){
            case "FINISH": {
                // setTimeout(()=>{
                    let message = ev.data
                    console.log(message.data)
                    // setImgData(message.data)
                    dispatch(createActionSetImgData(ev.data.data.imgData,ev.data.data.heightmap))
                // },5000)
                // setStartRenderSwitch(true)
                // console.log(ev.data.data)
                // let drawFunc = () => {
                //     let ctx = canvasRef.current?.getContext("2d")
                //     if(ctx && ev.data.data){
                //         console.log("put image data")
                //         ctx.putImageData(ev.data.data,0,0)
                //         ctx.lineTo(10,10)
                //     } else {
                //         console.log("render bounce " + canvasRef.current + " " + ev.data.data)
                //         setTimeout(drawFunc, 1000)
                //     }
                // }
                // setTimeout(drawFunc, 1000)
            } break;
        }
    }

    let delaunay = new Delaunay(Float64Array.of(0,0,1,0,0,1,1,1))
    console.log(delaunay)

    React.useEffect(()=>{
        let ctx = canvasRef.current?.getContext("2d")
        if(canvasRef.current && ctx && state.projectDetails.mapEditing.imgData){
            console.log("put image data")
            ctx.putImageData(state.projectDetails.mapEditing.imgData,0,0)
            ctx.scale(1,1)
            ctx.lineTo(10,10)
        } else {
            console.log("failed to set " + ctx)
        }
    },[imgData])

    // React.useEffect(()=>{
    //     console.log("setStart render siwtch " + startRenderSwitch)
    //     setRenderSwitch(!renderSwitch)
    // },[startRenderSwitch])

    // React.useEffect(()=>{
    //     console.log("trigger effect")
    //     if(canvasRef.current){
    //         // console.log("canvas exists")
    //         let ctx = canvasRef.current.getContext("2d")
    //         if(ctx && offscreenCanvas){
    //             ctx.putImageData(offscreenCanvas,0,0)
    //             ctx.lineTo(10,10)
    //             console.log("finish rerender")
    //             // ctx.drawImage(offscreenCanvas,0,0)
    //             // const myWorker = new Worker("./generator.ts");
    //             // if(myWorker){
    //             //     myWorker.onmessage = (event) => {
    //             //         console.log(event.data)
    //             //     }
    //             // }
    //             // ctx.drawImage
    //         }
    //         // console.log("done generating")
    //     }
    // },[offscreenCanvas])
    
    return (
        <div className="">
            <canvas ref={canvasRef} style={{width: 1000, height: 1000}}></canvas>
        </div>
    );
}

export default MapView;
