import { AppContextInterface, AppState, ProjectDetails } from "../state/mainState.interface";

const execSync = window.require("child_process").execSync;

export interface ImageCache {
    [sourcePath:string]: CachedImage,
}

export interface CachedImage {
    sourcePath: string,
    cachePath: string,
    data: Buffer,
}

const memoryCache: ImageCache = {

}

const folderStructureRegex = new RegExp(/(.+)(\/)[^\/]+$/)

export const cacheImageOnDisk = (sourcePath: string, projectDetails: ProjectDetails, fs: any): string => {
    let cachePath = ""
    if(sourcePath.includes(projectDetails.paths.vanillaDir)){
        cachePath = sourcePath.substring(projectDetails.paths.vanillaDir.length)
    } else {
        cachePath = sourcePath.substring(projectDetails.paths.projectDir.length)
    }

    let directoryStructure = cachePath.match(folderStructureRegex)
    cachePath = cachePath.replace(".tga",".png").replace(".dds",".png")
    if(directoryStructure){
        let folderToCreate: string = projectDetails.paths.baseGameImgCacheDir + directoryStructure[1]
        fs.mkdirSync(folderToCreate, { recursive: true });
        if (!fs.existsSync(projectDetails.paths.baseGameImgCacheDir + cachePath)) {
            try {

                // let command = "gimp-console-2.10.exe -i -b " + beegScript + " -b \"(gimp-quit 0)\""
                // console.log(command)
                // const result = execSync(command,
                // { cwd: "C:/Program Files/GIMP 2/bin"}) 


                // old approach
                const result = execSync("java -jar ./src/img/hoi4ide-imagemanipulator.jar -i \"" + sourcePath + "\" -o \"" + projectDetails.paths.baseGameImgCacheDir + cachePath + "\"",);

                // console.log("./imagemagick/convert.exe \"" + sourcePath + "\" \"" + projectDetails.paths.baseGameImgCacheDir + cachePath + "\"")
                // try { 
                //     execSync(`gimp-console-2.10.exe -i -b "(myconvert \"${sourcePath}\" \"${projectDetails.paths.baseGameImgCacheDir + cachePath}\")" -b "(gimp-quit 0)"`,
                //      { cwd: "C:/Program Files/GIMP 2/bin", stdio: 'inherit' }) 
                //     } catch (err) {
                //          console.error(err) 
                //     }

                //used to work approach - slow
                // let command = `gimp-console-2.10.exe -i -b "(myconvert \"${sourcePath.replaceAll("\\","/")}\" \"${(projectDetails.paths.baseGameImgCacheDir + cachePath).replaceAll("\\","/")}\")" -b "(gimp-quit 0)"`
                // command = "gimp-console-2.10.exe -i -b \"(myconvert \\\"" + sourcePath.replaceAll("\\","/") + "\\\" \\\"" + (projectDetails.paths.baseGameImgCacheDir + cachePath).replaceAll("\\","/") + "\\\")\" -b \"(gimp-quit 0)\""
                // console.log(command)
                // const result = execSync(command,
                // { cwd: "C:/Program Files/GIMP 2/bin"}) 
                
            } catch (err) {
                console.error(err)
            }
        }
    }
    // console.log(projectDetails.paths.imgCacheDir + cachePath)
    return cachePath
}

/**
 * Loads an image file into the cache in memory
 * @param relativeSourcePath Relative source directory either to IDE cache, project cache, or install cache to load image from
 * @param projectDetails Project details object
 * @param fs FS object
 * @param evict If true, eject existing entry in cache for this path
 */
export const loadImageIntoMemoryCache = (relativeSourcePath: string, projectDetails: ProjectDetails, fs: any, evict?: boolean): void => {
    let targetFileRelativePath = relativeSourcePath
    if(targetFileRelativePath[0] !== "/"){
        targetFileRelativePath = "/" + targetFileRelativePath
    }
    if(!memoryCache[targetFileRelativePath] || evict){
        if (fs.existsSync(projectDetails.paths.baseGameImgCacheDir + targetFileRelativePath)) {
            let imgBuffer = fs.readFileSync(projectDetails.paths.baseGameImgCacheDir + targetFileRelativePath)
            memoryCache[targetFileRelativePath] = {
                sourcePath: targetFileRelativePath,
                cachePath: projectDetails.paths.baseGameImgCacheDir + targetFileRelativePath,
                data: imgBuffer
            }
        } else if (fs.existsSync(projectDetails.paths.projectImgCacheDir + targetFileRelativePath)) {
            let imgBuffer = fs.readFileSync(projectDetails.paths.projectImgCacheDir + targetFileRelativePath)
            memoryCache[targetFileRelativePath] = {
                sourcePath: targetFileRelativePath,
                cachePath: projectDetails.paths.projectImgCacheDir + targetFileRelativePath,
                data: imgBuffer
            }
        } else if(fs.existsSync(projectDetails.paths.installDir + targetFileRelativePath)) {
            //this path for resources of the app
            let imgBuffer = fs.readFileSync(projectDetails.paths.installDir + targetFileRelativePath)
            memoryCache[targetFileRelativePath] = {
                sourcePath: targetFileRelativePath,
                cachePath: projectDetails.paths.installDir + targetFileRelativePath,
                data: imgBuffer
            }
        }
    }
}

export const getImgFromCache = (relativeSourcePath: string): CachedImage | null => {
    if(relativeSourcePath[0] === "/"){
        return memoryCache[relativeSourcePath]
    } else {
        return memoryCache["/" + relativeSourcePath]
    }
}

export const getImagePath = (imageTag: string, state: AppState): string => {
    return state.projectDetails.spriteMap[imageTag] ? state.projectDetails.spriteMap[imageTag].replace(".dds",".png") : ""
}