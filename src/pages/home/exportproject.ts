import { Jomini } from "jomini";
import { AppContextInterface, AppDispatchActionType, Country, ProjectDetails, ProjectFiles, State } from "../../state/mainState.interface";
import { CharacterFile, CountryFile, HistoryCountryFile, HistoryStateFile, LocalisationFile, StateHistory, TagFile } from "../../interface/rawFile.interface";
import { deleteFolderRecursive, serializeArbitraryPDXObject } from "../../util/Utils";
import { createActionLoadProject, createActionSetExportDir, createActionSetLoading } from "../../state/mainState.actions";
import { ipcRenderer } from "electron";
import { saveProject } from "../../util/gitutils";
import { openProject } from "../index/openProject";




export const exportProject = (context: AppContextInterface) => {
    console.log("start export")
    context.dispatch(createActionSetLoading(true))
    const fs = window.require("fs");
    const path = window.require("path");

    if(context.state.projectDetails.paths.exportDir && context.state.projectDetails.paths.exportDir !== ""){
        //clear export dir
        let files: string[] = fs.readdirSync(context.state.projectDetails.paths.exportDir);
        files.forEach((files: any) => {
            for (const file of files) {
                deleteFolderRecursive(path.join(context.state.projectDetails.paths.exportDir, file))
            }
        })

        //copy
        let topLevelFolders: string[] = [
            "common",
            "events",
            "gfx",
            "history",
            "localisation",
            "map",
        ]
        topLevelFolders.forEach(folderName => {
            try {
                fs.cpSync(`${context.state.projectDetails.paths.projectDir}/${folderName}`, `${context.state.projectDetails.paths.exportDir}/${folderName}`, { recursive : true })
            } catch (err) {
                console.error(err)
            }
        })
    }
    context.dispatch(createActionSetLoading(false))
    console.log("finish export")
}

export const openExportDirectorySelectModal = async (context: AppContextInterface) => {
    const { BrowserWindow, dialog } = window.require('@electron/remote')

    // let win = new BrowserWindow({width: 800, height: 600,})
    var pathPromise = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    let path: string | null = ""
    await pathPromise.then((value: any)=>{
        if(value){
            path = value.filePaths[0]
        } else {
            path = null
        }
    })
    if(path){
        context.dispatch(createActionSetExportDir(path))
    }
}