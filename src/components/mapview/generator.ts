import { GeneratorMessage } from "./ipc"
import { createNoise2D } from "simplex-noise"

postMessage("started")

const meanKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color00 = y > 0   && x > 0   ? referenceArray[x-1][y-1] * 1.0 : 0
            let color01 =            x > 0   ? referenceArray[x-1][y+0] * 1.0 : 0
            let color02 = y < 999 && x > 0   ? referenceArray[x-1][y+1] * 1.0 : 0
            let color10 = y > 0              ? referenceArray[x+0][y-1] * 1.0 : 0
            let color11 =                      referenceArray[x+0][y+0] * 1.0    
            let color12 = y < 999            ? referenceArray[x+0][y+1] * 1.0 : 0
            let color20 = y > 0   && x < 999 ? referenceArray[x+1][y-1] * 1.0 : 0
            let color21 =            x < 999 ? referenceArray[x+1][y+0] * 1.0 : 0
            let color22 = y < 999 && x < 999 ? referenceArray[x+1][y+1] * 1.0 : 0
            targetArray[x][y] = (color00 + color01 + color02 + color10 + color11 + color12 + color20 + color21 + color22) / 9.0
            targetArray[x][y] = targetArray[x][y] > 255 ? 255 : targetArray[x][y]
            targetArray[x][y] = targetArray[x][y] < 0 ? 0 : targetArray[x][y]
        }
    }
    return targetArray
}

const dilationKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color00 = y > 0   && x > 0   ? referenceArray[x-1][y-1] * 1.0 : 0
            let color01 =            x > 0   ? referenceArray[x-1][y+0] * 1.0 : 0
            let color02 = y < 999 && x > 0   ? referenceArray[x-1][y+1] * 1.0 : 0
            let color10 = y > 0              ? referenceArray[x+0][y-1] * 1.0 : 0
            let color11 =                      referenceArray[x+0][y+0] * 1.0    
            let color12 = y < 999            ? referenceArray[x+0][y+1] * 1.0 : 0
            let color20 = y > 0   && x < 999 ? referenceArray[x+1][y-1] * 1.0 : 0
            let color21 =            x < 999 ? referenceArray[x+1][y+0] * 1.0 : 0
            let color22 = y < 999 && x < 999 ? referenceArray[x+1][y+1] * 1.0 : 0
            targetArray[x][y] = Math.max(color00, color01, color02, color10, color11, color12, color20, color21, color22)
            // if(targetArray[x][y] > 127){
            //     targetArray[x][y] = referenceArray[x][y] * 2
            // } else {
            //     targetArray[x][y] = referenceArray[x][y]
            // }
            targetArray[x][y] = targetArray[x][y] > 255 ? 255 : targetArray[x][y]
            targetArray[x][y] = targetArray[x][y] < 0 ? 0 : targetArray[x][y]
        }
    }
    return targetArray
}

const erosionKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color00 = y > 0   && x > 0   ? referenceArray[x-1][y-1] * 1.0 : 255
            let color01 =            x > 0   ? referenceArray[x-1][y+0] * 1.0 : 255
            let color02 = y < 999 && x > 0   ? referenceArray[x-1][y+1] * 1.0 : 255
            let color10 = y > 0              ? referenceArray[x+0][y-1] * 1.0 : 255
            let color11 =                      referenceArray[x+0][y+0] * 1.0    
            let color12 = y < 999            ? referenceArray[x+0][y+1] * 1.0 : 255
            let color20 = y > 0   && x < 999 ? referenceArray[x+1][y-1] * 1.0 : 255
            let color21 =            x < 999 ? referenceArray[x+1][y+0] * 1.0 : 255
            let color22 = y < 999 && x < 999 ? referenceArray[x+1][y+1] * 1.0 : 255
            targetArray[x][y] = Math.min(color00, color01, color02, color10, color11, color12, color20, color21, color22)
            // if(targetArray[x][y] < 127){
            //     targetArray[x][y] = referenceArray[x][y] * 0.5
            // } else {
            //     targetArray[x][y] = referenceArray[x][y]
            // }
            targetArray[x][y] = targetArray[x][y] > 255 ? 255 : targetArray[x][y]
            targetArray[x][y] = targetArray[x][y] < 0 ? 0 : targetArray[x][y]
        }
    }
    return targetArray
}

const sharpenKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color00 = y > 0   && x > 0   ? referenceArray[x-1][y-1] *  0.0 : 255
            let color01 =            x > 0   ? referenceArray[x-1][y+0] * -1.0 : 255
            let color02 = y < 999 && x > 0   ? referenceArray[x-1][y+1] *  0.0 : 255
            let color10 = y > 0              ? referenceArray[x+0][y-1] * -1.0 : 255
            let color11 =                      referenceArray[x+0][y+0] *  5.0    
            let color12 = y < 999            ? referenceArray[x+0][y+1] * -1.0 : 255
            let color20 = y > 0   && x < 999 ? referenceArray[x+1][y-1] *  0.0 : 255
            let color21 =            x < 999 ? referenceArray[x+1][y+0] * -1.0 : 255
            let color22 = y < 999 && x < 999 ? referenceArray[x+1][y+1] *  0.0 : 255
            targetArray[x][y] = (color00 + color01 + color02 + color10 + color11 + color12 + color20 + color21 + color22)
            if(targetArray[x][y] < 127){
                targetArray[x][y] = 0
            }
            targetArray[x][y] = targetArray[x][y] > 255 ? 255 : targetArray[x][y]
            targetArray[x][y] = targetArray[x][y] < 0 ? 0 : targetArray[x][y]
        }
    }
    return targetArray
}

const extremeKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color00 = y > 0   && x > 0   ? referenceArray[x-1][y-1] *  1.0 : 255
            let color01 =            x > 0   ? referenceArray[x-1][y+0] *  1.0 : 255
            let color02 = y < 999 && x > 0   ? referenceArray[x-1][y+1] *  1.0 : 255
            let color10 = y > 0              ? referenceArray[x+0][y-1] *  1.0 : 255
            let color11 =                      referenceArray[x+0][y+0] *  1.0    
            let color12 = y < 999            ? referenceArray[x+0][y+1] *  1.0 : 255
            let color20 = y > 0   && x < 999 ? referenceArray[x+1][y-1] *  1.0 : 255
            let color21 =            x < 999 ? referenceArray[x+1][y+0] *  1.0 : 255
            let color22 = y < 999 && x < 999 ? referenceArray[x+1][y+1] *  1.0 : 255
            targetArray[x][y] = (color00 + color01 + color02 + color10 + color11 + color12 + color20 + color21 + color22)
            if(referenceArray[x][y] < 127){
                targetArray[x][y] = 0
            } else {
                targetArray[x][y] = 255
            }
        }
    }
    return targetArray
}

const clumpingKernel = (targetArray: number[][]): number[][] => {
    let referenceArray: number[][] = []
    targetArray.forEach(column => {
        referenceArray.push([...column])
    })
    for(let x = 0; x < 1000; x++){
        for(let y = 0; y < 1000; y++){
            let color02 =            x > 9   ? referenceArray[x-10][y+ 0] *  0.5 : 0
            let color12 =            x > 4   ? referenceArray[x- 5][y+ 0] *  0.5 : 0
            let color20 = y > 9              ? referenceArray[x+ 0][y-10] *  0.5 : 0
            let color21 = y > 4              ? referenceArray[x+ 0][y- 5] *  0.5 : 0
            let color22 =                      referenceArray[x+ 0][y+ 0] *  1.0    
            let color24 = y < 989            ? referenceArray[x+ 0][y+10] *  0.5 : 0
            let color23 = y < 994            ? referenceArray[x+ 0][y+ 5] *  0.5 : 0
            let color42 =            x < 989 ? referenceArray[x+10][y+ 0] *  0.5 : 0
            let color32 =            x < 994 ? referenceArray[x+ 5][y+ 0] *  0.5 : 0
            targetArray[x][y] = (color02 + color12 + color20 + color21 + color22 + color24 + color23 + color42 + color32) / 5
        }
    }
    return targetArray
}



onmessage = (event: GeneratorMessage) => {
    switch(event.data.type){
        case "START": {
            console.log("Start generation")
            const noise2D = createNoise2D();
            let canvas: OffscreenCanvas = new OffscreenCanvas(1000,1000)
            let ctx: OffscreenCanvasRenderingContext2D = <OffscreenCanvasRenderingContext2D>canvas.getContext("2d")
            if(ctx){
                let heightmap: number[][] = []
                let heightmap2: number[][] = []
                for(let x = 0; x < 1000; x++){
                    let column = []
                    for(let y = 0; y < 1000; y++){
                        let value = 
                            // noise2D(x,y) + 
                            noise2D(x*0.1,y*0.1) + 
                            noise2D(x*0.05,y*0.05) + 
                            noise2D(x*0.01,y*0.01) +
                            noise2D(x*0.001,y*0.001)
                        value = value / 4
                        value = value + 1 / 2
                        if(value < 0){
                            value = 0
                        } else if(value > 1){
                            value = 1
                        }
                        column.push(value * 255)
                    }
                    heightmap.push(column)
                    heightmap2.push([...column])
                }
                // clamp to extremes
                heightmap = extremeKernel(heightmap)
                // clumping phase
                for(let i = 0; i < 2; i++){
                    heightmap = clumpingKernel(heightmap)
                    heightmap = meanKernel(heightmap)
                    heightmap = sharpenKernel(heightmap)
                    heightmap = meanKernel(heightmap)
                }
                // blur phase 2
                for(let i = 0; i < 10; i++){
                    heightmap = meanKernel(heightmap)
                }
                //store to imagedata
                for(let x = 0; x < 1000; x++){
                    for(let y = 0; y < 1000; y++){
                        let value = heightmap[x][y]
                        let normalized = (value).toFixed(0)
                        ctx.fillStyle = `rgb(${normalized},${normalized},${normalized})`
                        ctx.fillRect( x, y, 1, 1 );
                    }
                }
                console.log("finsh generation")
                postMessage({
                    type: "FINISH",
                    data: {
                        imgData: ctx.getImageData(0,0,1000,1000),
                        heightmap: heightmap,
                    },
                })
            }
            
            // let image = new Image(1000,1000);
            // let bitmap = createImageBitmap(image,)
            // bitmap.then((context)=>{

            // })
            // image.
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
        } break;
    }
}

export {}