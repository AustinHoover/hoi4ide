import { Jomini } from "jomini";
import { AirFleet, AppContextInterface, AppDispatchActionType, Character, Country, CountryEditing, Fleet, ProjectDetails, ProjectFiles, State, Unit } from "../../state/mainState.interface";
import { CharacterFile, CountryFile, FileTracking, HistoryCountryFile, HistoryStateFile, LocalisationFile, StateHistory, TagFile, UnitFileDivision, UnitHistoryFile } from "../../interface/rawFile.interface";
import { isVanillaPath, serializeArbitraryPDXObject } from "../../util/Utils";
import { createActionLoadProject, createActionSetExportDir, createActionSetLoading } from "../../state/mainState.actions";
import { ipcRenderer } from "electron";
import { Scope } from "../../interface/scope.interface";



const regexTagRegex = new RegExp(/^D[0-9][0-9]$/)

export const saveProjectData = async (context: AppContextInterface) => {
    console.log("start save")
    context.dispatch(createActionSetLoading(true))
    const fs = window.require("fs");
    const path = window.require("path");
    const jomini = await Jomini.initialize();

    let projectDetails = context.state.projectDetails

    let projectDir: string = projectDetails.paths.projectDir

    projectDetails.countryEditing.countries.forEach(country => {
        //country file
        let countryFile: CountryFile | undefined = country.countryFile
        if(countryFile){
            //save country to country file
            countryFile.color = country.color
        } else {
            countryFile = {
                graphical_culture: country.graphicalCulture + "_gfx",
                graphical_culture_2d: country.graphicalCulture + "_2d",
                color: country.color,
                path: `${projectDir}/common/countries/${projectDetails.localisationMap[country.tag]}.txt`
            }
        }
        //write country file
        writeFileJomini(countryFile, jomini, context, fs)

        //tag file
        let tagFile: TagFile | undefined = country.tagFile
        if(!tagFile){
            if(projectDetails.projectFiles.tagFiles.length <= 0){
                throw new Error("No tag files exist")
            }
            let modTagFile: TagFile = projectDetails.projectFiles.tagFiles[0]
            modTagFile[country.tag] = `countries/${projectDetails.localisationMap[country.tag]}.txt`
        }

        //history files
        let historyFile = {...country.countryHistoryFile}
        historyFile.path = `${projectDir}/history/countries/${country.tag} - ${projectDetails.localisationMap[country.tag]}.txt`

        writeFileJomini(historyFile,jomini,context,fs)
        // let tagFile = projectDetails.projectFiles.tagFiles.find(tagFile => tagFile[country.tag] !== undefined)
        // if(!tagFile){
        //     //accumulate to new tag file
        //     if(nonvanillaTagFile){
        //         //add to tag file
        //     } else {
        //         //create nonvanilla tag file and add
        //     }
        // } else if(isVanillaPath(tagFile.path,context) && !country.vanilla){
        //     //move vanilla path to mod folder
        // }
    })

    // write tag files
    projectDetails.projectFiles.tagFiles.forEach(tagFile => {
        writeFileJomini(tagFile, jomini, context, fs)
    })

    projectDetails.stateEditing.states.forEach(state => {
        let historyFile: HistoryStateFile | undefined = state.historyFile
        if(historyFile){
            let loadedOwnerScope: Scope | undefined = historyFile.state.history.scopes.find(scope => scope.name === "owner")
            if(loadedOwnerScope){
                if(state.ownerTag && state.ownerTag !== ''){
                    loadedOwnerScope.object = state.ownerTag
                } else {
                    historyFile.state.history.scopes = historyFile.state.history.scopes.filter(scope => scope.name !== 'owner')
                }
            }
        } else {
            throw new Error("Saving new states not implemented yet")
        }
        //write state history file
        writeFileJomini(historyFile, jomini, context, fs)
    })

    //write character files
    {
        let characterTagMap: any = {}
        projectDetails.characterEditing.characters.forEach(character => {
            let tag: string = character.tag.substring(0,3)
            if(characterTagMap[tag]){
                characterTagMap[tag].push(character)
            } else {
                characterTagMap[tag] = [character]
            }
        })
        let tagMapKeys: string[] = Object.keys(characterTagMap)
        tagMapKeys.forEach((key: string) => {
            let charArray: Character[] = characterTagMap[key]
            let tag: string = charArray[0].tag.substring(0,3)
            let newCharacterFile: CharacterFile = {
                characters: {},
                path: `${projectDir}/common/characters/${tag}.txt`,
            }
            charArray.forEach(character => {
                newCharacterFile.characters[character.tag] = character.properties
            })
            // if(tag === "BUL"){
            //     console.log(newCharacterFile)
            //     debugger
            // }
            writeFileJomini(newCharacterFile,jomini,context,fs)
        })
    }

    //write unit files
    {
        let unitAccumulatorMap: Record<string,{units?: Unit[],fleets?: Fleet[], airfleet?: AirFleet[]}> = {}
        //map units
        projectDetails.unitEditing.units.forEach(unit => {
            let fileName: string = unit.unitFile?.name ? unit.unitFile?.name : ""
            let unitFile: any = unitAccumulatorMap[fileName]
            if(unitFile){
                unitFile.units.push(unit)
            } else {
                unitAccumulatorMap[fileName] = {
                    units: [unit]
                }
            }
        })
        //map fleets
        projectDetails.unitEditing.fleets.forEach(fleet => {
            let fileName: string = fleet.unitFile?.name ? fleet.unitFile?.name : ""
            let unitFile: any = unitAccumulatorMap[fileName]
            if(unitFile){
                unitFile.fleets.push(fleet)
            } else {
                unitAccumulatorMap[fileName] = {
                    fleets: [fleet]
                }
            }
        })
        //map air wings
        projectDetails.unitEditing.airfleets.forEach(airfleet => {
            let fileName: string = airfleet.unitFile?.name ? airfleet.unitFile?.name : ""
            let unitFile: any = unitAccumulatorMap[fileName]
            if(unitFile){
                unitFile.airfleet.push(airfleet)
            } else {
                unitAccumulatorMap[fileName] = {
                    airfleet: [airfleet]
                }
            }
        })
        //for each unit accumulator key
        let keys: string[] = Object.keys(unitAccumulatorMap)
        keys.forEach(key => {
            let unitList = unitAccumulatorMap[key]
            let matchingFile = projectDetails.projectFiles.unitHistoryFiles.find(file => file.name === key)
            if(matchingFile){
                let unitHistoryFile: UnitHistoryFile = {
                    name: key,
                    path: projectDetails.paths.projectDir + "/history/units/" + key,
                    scopes: [],
                }
                if(!unitHistoryFile.path.includes(".txt")){
                    unitHistoryFile.path = unitHistoryFile.path + ".txt"
                }
                let attachedInstantEffect: boolean = false
                if(unitList.units){
                    let exportUnitList = unitList.units.map(unit => {
                        let rVal: UnitFileDivision = {
                            location: unit.provinceId,
                            division_template: unit.divisionTemplate,
                            start_experience_factor: unit.startExperience,
                        }
                        if(unit.divisionName){
                            rVal.division_name = unit.divisionName
                        } else {
                            rVal.name = unit.name
                        }
                        if (unit.forceEquipmentVariants){
                            rVal.force_equipment_variants = unit.forceEquipmentVariants
                        }
                        if(!attachedInstantEffect && unit.unitFile?.instant_effect){
                            unitHistoryFile.instant_effect = unit.unitFile?.instant_effect
                        }
                        return rVal
                    })
                    unitHistoryFile.units = {
                        division: exportUnitList,
                    }
                }
                if(unitList.fleets){
                    //strip unit file links
                    let exportFleetList = unitList.fleets.map(fleet => {
                        if(!attachedInstantEffect && fleet.unitFile?.instant_effect){
                            unitHistoryFile.instant_effect = fleet.unitFile?.instant_effect
                        }
                        let rVal: any = {...fleet}
                        delete rVal.unitFile
                        return rVal
                    })
                    if(unitHistoryFile.units){
                        unitHistoryFile.units.fleet = exportFleetList
                    } else {
                        unitHistoryFile.units = {
                            fleet: exportFleetList
                        }
                    }
                }
                if(unitList.airfleet){
                    //strip unit file links
                    let airWings: Record<string, any> = {}
                    unitList.airfleet.forEach(airfleet => {
                        let airWingKeys = Object.keys(airfleet.airwings)
                        if(!attachedInstantEffect && airfleet.unitFile?.instant_effect){
                            unitHistoryFile.instant_effect = airfleet.unitFile?.instant_effect
                        }
                        airWingKeys.forEach(airWingKeyRaw => {
                            let key = Number.parseInt(airWingKeyRaw)
                            let airWing = airfleet.airwings[key]
                            airWings[airWingKeyRaw] = airWing
                        })
                    })
                    unitHistoryFile.air_wings = airWings
                }
                let exportFile: any = {...unitHistoryFile}
                delete exportFile.name
                writeFileJomini(exportFile, jomini, context, fs)
            }
        })
    }

    //write overrides file
    {
        const content: string = JSON.stringify(projectDetails.projectFiles.overrideFile)
        const path: string = projectDetails.paths.projectDir + "/overrides.json"
        fs.writeFileSync(path,content)
    }

    context.dispatch(createActionSetLoading(false))
    console.log("end save")
}

const writeFileJomini = (file: FileTracking, jomini: Jomini, context: AppContextInterface, fs: any) => {
    let path: string = file.path + ""
    let rawObject: any = {...file, path: undefined}
    let fileContent = serializeArbitraryPDXObject(rawObject, jomini)
    if(path.includes(context.state.projectDetails.paths.vanillaDir)){
        path = path.replace(context.state.projectDetails.paths.vanillaDir,context.state.projectDetails.paths.projectDir)
    }
    fs.writeFileSync(path,fileContent)
}