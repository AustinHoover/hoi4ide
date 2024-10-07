import { Jomini } from "jomini";
import { AppContextInterface, AppDispatchActionType, Country, ProjectDetails, ProjectFiles, State } from "../../state/mainState.interface";
import { CharacterFile, CountryFile, HistoryCountryFile, HistoryStateFile, LocalisationFile, StateHistory, TagFile } from "../../interface/rawFile.interface";
import { serializeArbitraryPDXObject } from "../../util/Utils";
import { createActionLoadProject, createActionSetLoading } from "../../state/mainState.actions";
import { ipcRenderer } from "electron";
import { saveProject } from "../../util/gitutils";
import { openProject } from "../index/openProject";



const constructFolderStructure = (projectDir: string) => {
    const fs = window.require('fs');
    let folders: string[] = [
        '/common',
        '/common/characters',
        '/common/countries',
        '/common/country_leader',
        '/common/country_tags',
        '/common/unit_leader',
        '/events',
        '/gfx',
        '/gfx/flags',
        '/gfx/flags/medium',
        '/gfx/flags/small',
        '/gfx/leaders',
        '/history',
        '/history/countries',
        '/history/states',
        '/history/units',
        '/interface',
        '/imgcache',
        '/imgcache/gfx',
        '/imgcache/gfx/flags',
        '/imgcache/gfx/flags/medium',
        '/imgcache/gfx/flags/small',
        '/imgcache/gfx/leaders',
        '/localisation',
        '/localisation/english',
    ]
    folders.forEach(pathFragment => {
        let path: string = `${projectDir}${pathFragment}`
        if (!fs.existsSync(path)) fs.mkdirSync(path);
    })
}

const exportDirStart: string = "/Documents/Paradox Interactive/Hearts of Iron IV/mod/"

export const createProjectStructure = async (context: AppContextInterface, projectDir: string) => {
    //start loading
    context.dispatch(createActionSetLoading(true))
    
    const fs = window.require('fs');
    const child_process = window.require('child_process');
    const homedir = window.require('os').homedir();

    let modFileName = context.state.projectDetails.metadata.name.replaceAll(" ","_")

    child_process.spawn(`git init ${projectDir}`, null, {
        encoding: 'utf8',
        shell: true
    }).on('close', (code: number) => {
        //Here you can get the exit code of the script  
        switch (code) {
            case 0: {
                //config git user stuff
                child_process.execSync("git config user.email \"auto@save.hoi4\"", {cwd:projectDir});
                child_process.execSync("git config user.name \"autoSave\"", {cwd:projectDir});
                //config file
                let fileContent: string = JSON.stringify({exportDir:`${homedir}${exportDirStart}${modFileName}`,name:context.state.projectDetails.metadata.name})
                fs.writeFileSync(`${projectDir}/project.json`,fileContent)
                //export folder and context
                if (!fs.existsSync(`${homedir}${exportDirStart}${modFileName}`)){
                    fs.mkdirSync(`${homedir}${exportDirStart}${modFileName}`);
                }
                fs.writeFileSync(`${homedir}${exportDirStart}${modFileName}.mod`,`
name="${context.state.projectDetails.metadata.name}"
path="mod/${modFileName}"
tags={"Graphics"}
picture="thumbnail.png"
supported_version="1.14.*"`)
                //project structure
                constructFolderStructure(projectDir)
                saveProject(projectDir)
                openProject(context,projectDir)
            } break;
            default: {
                //handle the user not having git installed
            } break;
        }

    });
}

export const openProjectMetadataFileDialog = async (context: AppContextInterface) => {
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
        createProjectStructure(context,path.replaceAll("\\","/"))
    }
}