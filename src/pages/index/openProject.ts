import { Jomini } from "jomini";
import { AircraftEquipment, AirFleet, AppContextInterface, AppDispatchActionType, Character, Country, Fleet, ProjectDetails, ProjectFiles, Ship, State, TaskForce, Unit } from "../../state/mainState.interface";
import { CharacterFile, CharacterPortraitFile, CharacterProperties, ConfigFile, CountryFile, HistoryCountryFile, HistoryStateFile, LocalisationFile, NationalFocusFile, OverrideFile, SpriteFile, SpriteType, StateHistory, TagFile, UnitHistoryFile } from "../../interface/rawFile.interface";
import { cleanInvisibleCharacters, deleteFolderRecursive, getDirectoryOfFile, getFileNameFromPath, isVanillaPath, parseScopeableObjectTwo, serializeArbitraryPDXObject } from "../../util/Utils";
import { createActionLoadProject, createActionSetError, createActionSetLoading } from "../../state/mainState.actions";
import { cacheImageOnDisk } from "../../img/imageCache";
import { SCOPE_TYPE } from "../../pdxapi/scopeDefinitions";
import { ChildProcess } from "child_process";

const os = window.require("os")


const windowsVanillaDirBuildString: string = "/SteamLibrary/steamapps/common/Hearts of Iron IV"
const potentialVanillaDirs: string[] = [
    "/Users/" + os.userInfo().username + "/Library/Application Support/Steam/steamapps/common/Hearts of Iron IV",
]


export const openProject = async (context: AppContextInterface, projectDir: string) => {
    //start loading
    context.dispatch(createActionSetLoading(true))
    
    //start loading jomini
    const jomini = await Jomini.initialize()
    const YAML = require('yaml')

    var fs = window.require('fs')
    var child = window.require('child_process')

    let overwriteFiles: string[]
    let vanillaFiles: string[]
    let files: string[]
    let currentFileDir = ""
    let vanillaDir = ""
    
    //grab windows paths
    let windowsPaths: string[] = []
    var isWin = process.platform === "win32"
    if(isWin){
        const resultRaw: Uint8Array = child.execSync('wmic logicaldisk get name', (error: any, stdout: any) => {
            const drives: string[] = stdout.split('\r\r\n')
                    .filter((value: string) => /[A-Za-z]:/.test(value))
                    .map((value: string) => value.trim())
            console.log(drives);
        })
        const resultDecoded: string = new TextDecoder().decode(resultRaw)
        const trueResult: string[] = resultDecoded.split("\r\r\n").slice(1).filter(value => value.includes(":")).map(value => value.trim())
        windowsPaths = trueResult.map(drive => drive + windowsVanillaDirBuildString)
    }

    //find vanilla dir
    potentialVanillaDirs.concat(windowsPaths).forEach(dirToTest => {
        console.log(dirToTest)
        if (fs.existsSync(dirToTest)) {
            vanillaDir = dirToTest
        }
    })

    let projectFiles: ProjectFiles = {
        configFile: {
            exportDir: "",
            name: "",
        },
        overrideFile: {
            overridePaths: [],
        },
        tagFiles: [],
        countryFiles: [],
        characterFiles: [],
        historyCountryFiles: [],
        historyStateFiles: [],
        localisationFiles: [],
        portraitFiles: [],
        unitHistoryFiles: [],
        nationalFocusFiles: [],
        spriteFiles: [],
    }

    let projectDetails: ProjectDetails = {
        metadata: {
            name: "",
        },
        paths: {
            projectDir: projectDir,
            exportDir: "",
            vanillaDir: vanillaDir,
            installDir: process.cwd(),
            baseGameImgCacheDir: process.cwd() + "/imgcache",
            projectImgCacheDir: projectDir + "/imgcache",
        },
        projectFiles: projectFiles,
        characterEditing: {
            currentlySelectedCharacter: null,
            characters: [],
            advisorTraits: [],
            unitTraits: [],
        },
        stateEditing: {
            currentlySelectedState: null,
            states: [],
        },
        countryEditing: {
            countries: [],
            currentlySelectedCountry: null,
            currentlySelectedUnitFile: null,
            editTab: 0,
            scopeFileIndex: 0,
        },
        unitEditing: {
            currentlySelectedUnit: null,
            units: [],
            fleets: [],
            airfleets: [],
        },
        mapEditing: {
            imgData: null,
            heightmap: null,
        },
        localisationMap: {},
        spriteMap: {},
    }

    //read config file
    try {
        let data = fs.readFileSync(`${projectDir}/project.json`, 'utf8')
        // console.log(data);
        let dataModified = data
        let parsedConfigFile: ConfigFile = JSON.parse(dataModified)
        projectFiles.configFile = parsedConfigFile
        projectDetails.paths.exportDir = parsedConfigFile.exportDir
        projectDetails.metadata.name = parsedConfigFile.name
    } catch (e: any){
        console.error(e)
        context.dispatch(createActionSetError(e))
    }

    //read override file
    try {
        let data = fs.readFileSync(`${projectDir}/overrides.json`, 'utf8')
        // console.log(data);
        let dataModified = data
        let overrideFile: OverrideFile = JSON.parse(dataModified)
        projectFiles.overrideFile = overrideFile
    } catch(e: any){
        console.error(e)
        context.dispatch(createActionSetError(e))
    }

    //read country tag files
    currentFileDir = "common/country_tags"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes('common/country_tags')){
        vanillaFiles = []
    }
    files = [...overwriteFiles,...vanillaFiles]
        // if(err === null){
        //     files.forEach(file => console.log(file))
        // }
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
        // console.log(data);
        let dataModified = "\n" + data
        let parsedTagFile: TagFile = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        parsedTagFile.path = path
        projectFiles.tagFiles.push(parsedTagFile)
        // console.log(parsedTagFile)
        // let tagFileOutput = writeTagFile(parsedTagFile,jomini)
        // console.log(tagFileOutput)
        
        // console.log(serializeArbitraryPDXObject(parsedTagFile, jomini))
    })

    //read country files
    currentFileDir = "common/countries"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes('common/countries')){
        vanillaFiles = []
    }
    files = [...overwriteFiles,...vanillaFiles]
        // if(err === null){
        //     files.forEach(file => console.log(file))
        // }
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path).toString())
        // console.log(data);
        let dataModified = "\n" + data
        let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        if(intermediaryObject?.color?.rgb){
            intermediaryObject.color = intermediaryObject.color?.rgb
        }
        let parsedTagFile: CountryFile = intermediaryObject
        // if(parsedTagFile.color)
        parsedTagFile.path = path
        projectFiles.countryFiles.push(parsedTagFile)
        // console.log(parsedTagFile)
        // let countryFileOutput = writeCountryFile(parsedTagFile,jomini)
        // console.log(countryFileOutput)
        // console.log(serializeArbitraryPDXObject(parsedTagFile, jomini))
    })

    //read character files
    currentFileDir = "common/characters"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes('common/characters')){
        vanillaFiles = []
    }
    files = [...overwriteFiles,...vanillaFiles]
        // if(err === null){
        //     files.forEach(file => console.log(file))
        // }
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path).toString())
        // console.log(data);
        let dataModified = "\n" + data
        let intermediateObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        if(intermediateObject.characters){
            let keys: string[] = Object.keys(intermediateObject.characters)
            keys.forEach(key => {
                // console.log(parseScopeableObjectTwo(intermediateObject.characters[key],SCOPE_TYPE.CHARACTER_DEFN))
                intermediateObject.characters[key] = parseScopeableObjectTwo(intermediateObject.characters[key],SCOPE_TYPE.CHARACTER_DEFN,[key])
                intermediateObject.characters[key] = fixCharacterParse(intermediateObject.characters[key])
            })
        }
        // if(path.includes("USA.txt")){
        //     console.log(intermediateObject)
        // }
        let parsedCharacterFile: CharacterFile = intermediateObject
        // console.log(parsedCharacterFile)
        //character scope
        parsedCharacterFile.path = path
        projectFiles.characterFiles.push(parsedCharacterFile)
    })

    //read country history files
    currentFileDir = "history/countries"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes('history/countries')){
        vanillaFiles = []
    }
    files = [...overwriteFiles,...vanillaFiles]
        // if(err === null){
        //     files.forEach(file => console.log(file))
        // }
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
        // console.log(data);
        let dataModified = "\n" + data
        let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        //fix for soviets in particular
        if(intermediaryObject.remainder){
            let i = 0;
            let limit = intermediaryObject.remainder.length
            while(i < limit){
                let key: string = ""
                let object: any
                if(typeof(intermediaryObject.remainder[i]) === "string" && intermediaryObject.remainder[i] !== ""){
                    key = intermediaryObject.remainder[i]
                    object = intermediaryObject.remainder[i+1]
                    i = i + 2;
                } else if(intermediaryObject.remainder[i] !== ""){
                    key = Object.keys(intermediaryObject.remainder[i])[0]
                    object = intermediaryObject.remainder[i][key]
                    i++
                } else {
                    i++
                }
                if(intermediaryObject[key]){
                    if(intermediaryObject[key].constructor === Array){
                        intermediaryObject[key].push(object)
                    } else {
                        intermediaryObject[key] = [intermediaryObject[key],object]
                    }
                } else {
                    intermediaryObject[key] = object
                }
            }
            delete intermediaryObject.remainder
        }
        // if(path.includes("SWI - ")){
        //     debugger
        // }
        // let countryHistoryFile: HistoryCountryFile = <HistoryCountryFile>parseScopeableObject(intermediaryObject,SCOPE_TYPE.COUNTRY)
        let countryHistoryFile: HistoryCountryFile = <HistoryCountryFile>parseScopeableObjectTwo(intermediaryObject,SCOPE_TYPE.COUNTRY)
        // console.log(countryHistoryFile)
        // if(path.includes("SWI - ")){
        //     console.log(countryHistoryFile)
        // }
        countryHistoryFile.path = path
        projectFiles.historyCountryFiles.push(countryHistoryFile)
        // console.log(serializeArbitraryPDXObject(countryHistoryFile, jomini))
    })

    //read state history files
    currentFileDir = "history/states"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes('history/states')){
        vanillaFiles = []
    }
    files = [...overwriteFiles,...vanillaFiles]
        // if(err === null){
        //     files.forEach(file => console.log(file))
        // }
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
        let dataModified = "\n" + data
        let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        //sometimes state_category defined twice for no reason??? handled here
        if(typeof(intermediaryObject.state.state_category) !== "string"){
            intermediaryObject.state.state_category = intermediaryObject.state.state_category[0]
        }
        let stateHistoryFile: HistoryStateFile = intermediaryObject
        
        
        //might not have history, ie if not owned by anyone currently
        if(stateHistoryFile.state.history){
            stateHistoryFile.state.history = <StateHistory>parseScopeableObjectTwo(intermediaryObject.state.history,SCOPE_TYPE.STATE,["state","history"])
        }

        stateHistoryFile.path = path
        projectFiles.historyStateFiles.push(stateHistoryFile)
        // console.log(stateHistoryFile)
    })


    //read localisation files
    let languageFilePathWhitelist: string[] = [
        'countries_l_english.yml',
        'state_names_l_english.yml',
    ]
    currentFileDir = "localisation/english"
    overwriteFiles = fs.readdirSync(`${projectDir}/${currentFileDir}`, 'utf8')
    vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${currentFileDir}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name) && languageFilePathWhitelist.includes(name))
    overwriteFiles = overwriteFiles.map(name => `${projectDir}/${currentFileDir}/${name}`)
    vanillaFiles = vanillaFiles.map(name => `${projectDetails.paths.vanillaDir}/${currentFileDir}/${name}`)
    files = [...overwriteFiles,...vanillaFiles]
    files.forEach(path => {
        let fileName = getFileNameFromPath(path)
        let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
        let dataModified = ("\n" + data).replaceAll(/\n\n/g,"\n").replaceAll(/\n #[^\n]*\n/g,"\n").replaceAll(/\n\s*\n/g,"\n").replaceAll(/(\n\s[^"]*"[^"]*"\s*)(#[^\n]*)/g,"$1").replaceAll(/:[0-9]/g,":")
        let yamlParsed = YAML.parse(dataModified)
        let localisationFile: LocalisationFile = yamlParsed
        localisationFile.path = `${projectDir}/localisation/english/${fileName}.yml`
        projectFiles.localisationFiles.push(localisationFile)
    })

    //read sprite files
    {
        files = getFilesToLoadFilterEnding("interface",".gfx",fs,projectDetails)
        files.forEach(path => {
            let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
            let dataModified = "\n" + data
            let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
            let spritesArray: SpriteType[] = []
            if(intermediaryObject?.spriteTypes?.spriteType?.constructor === Array){
                intermediaryObject.spriteTypes.spriteType.forEach((sprite: any) => {
                    if(sprite.name && sprite.texturefile){
                        spritesArray.push({
                            name: sprite.name,
                            textureFile: sprite.texturefile
                        })
                    }
                })
            } else {
                if(intermediaryObject?.spriteTypes?.spriteType?.name && intermediaryObject?.spriteTypes?.spriteType?.texturefile){
                    spritesArray.push({
                        name: intermediaryObject.spriteTypes.spriteType.name,
                        textureFile: intermediaryObject.spriteTypes.spriteType.texturefile
                    })
                }
            }
            let spriteFile: SpriteFile = {
                spriteTypes: spritesArray,
                path: path
            }
            projectDetails.projectFiles.spriteFiles.push(spriteFile)
        })
    }

    //read unit history files
    files = getFilesToLoad("history/units",fs,projectDetails)
    files.forEach(path => {
        let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
        let dataModified = "\n" + data
        let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
        //deal with "remainder"
        if(intermediaryObject.remainder){
            // console.log(intermediaryObject)
            intermediaryObject.remainder.forEach((item: any) => {
                if(item){
                    if(item.air_wings){
                        intermediaryObject.air_wings = item.air_wings
                    } else if(item === "instant_effect") {
                        intermediaryObject.instant_effect = {}
                    } else if(item.add_equipment_production){
                        intermediaryObject.instant_effect['add_equipment_production'] = item.add_equipment_production
                    } else if(item.units) {
                        intermediaryObject.units = item.units
                    } else if(item.division_template) {
                        if(intermediaryObject.division_template){
                            intermediaryObject.division_template.push(item.division_template)
                        } else {
                            intermediaryObject.division_template = [item.division_template]
                        }
                    } else if(item.division_names_group) {
                        if(intermediaryObject.division_template){
                            intermediaryObject.division_template.push(item)
                        } else {
                            intermediaryObject.division_template = [item]
                        }
                    } else if(item.division && item.division.constructor === Array) {
                        item.division.forEach((division: any) => {
                            if(intermediaryObject.units){
                                intermediaryObject.units.push(division)
                            } else {
                                intermediaryObject.units = [division]
                            }
                        })
                    } else if(item.regiments) {
                        if(intermediaryObject.units){
                            intermediaryObject.units.push(item)
                        } else {
                            intermediaryObject.units = [item]
                        }
                    } else if(item.if) {
                        if(intermediaryObject.instant_effect){
                            intermediaryObject.instant_effect.if = item.if
                        } else {
                            intermediaryObject.instant_effect = {if: item.if}
                        }
                    } else if(typeof(item) !== "string") {
                        // console.log(item)
                    }
                }
                // if(item && item !== ""){
                //     console.log(item)
                // }
            })
            delete intermediaryObject.remainder
        }
        //deal with keys with messed up names
        {
            let intermediateKeys = Object.keys(intermediaryObject)
            intermediateKeys.forEach(key => {
                if(key.match(/.+division_template/)){
                    if(intermediaryObject[key].constructor === Array){
                        intermediaryObject.division_template = intermediaryObject[key]
                    }
                    delete intermediaryObject[key]
                } else if(key.match(/.+unit/)){
                    intermediaryObject.units = intermediaryObject[key]
                    delete intermediaryObject[key]
                } else if(key.match(/.+start_equipment_factor/)){
                    intermediaryObject.start_equipment_factor = intermediaryObject[key]
                    delete intermediaryObject[key]
                } else if(key.match(/.+start_experience_factor/)){
                    intermediaryObject.start_experience_factor = intermediaryObject[key]
                    delete intermediaryObject[key]
                } else if(key.match(/.+start_manpower_factor/)){
                    intermediaryObject.start_manpower_factor = intermediaryObject[key]
                    delete intermediaryObject[key]
                } else if(key.match(/.+air_wings/)){
                    intermediaryObject.air_wings = intermediaryObject[key]
                    delete intermediaryObject[key]
                }
            })
        }
        //if it somehow ends up with intermediaryObject.units being a unit array
        if(intermediaryObject.units && intermediaryObject.units.constructor === Array){
            let contentHolder = [...intermediaryObject.units]
            intermediaryObject.units = {
                division: [],
                fleet: [],
            }
            contentHolder.forEach((unit: any) => {
                if(unit.division_template){
                    intermediaryObject.units.division.push(unit)
                } else {
                    intermediaryObject.units.fleet.push(unit)
                }
            })
        }
        // console.log(path)
        // console.log(intermediaryObject)
        //if it somehow ends up with intermediaryObject.units.division being an object not an array
        if(intermediaryObject?.units?.division && intermediaryObject.units.division.constructor !== Array){
            let arr = [intermediaryObject.units.division]
            intermediaryObject.units.division = arr
        }
        //if it somehow ends up with intermediaryObject.units.fleet being an object not an array
        if(intermediaryObject?.units?.fleet && intermediaryObject.units.fleet.constructor !== Array){
            let arr = [intermediaryObject.units.fleet]
            intermediaryObject.units.fleet = arr
        }
        if(intermediaryObject?.units?.fleet){
            intermediaryObject.units.fleet.forEach((fleet: any) => {
                //if it somehow ends up with intermediaryObject.units.fleet.task_force being an object not an array
                if(fleet?.task_force && fleet.task_force.constructor !== Array){
                    let arr = [fleet.task_force]
                    fleet.task_force = arr
                }
            })
        }
        if(intermediaryObject?.units?.fleet){
            intermediaryObject.units.fleet.forEach((fleet: any) => {
                fleet.task_force.forEach((taskForce: any) => {
                    //if it somehow ends up with intermediaryObject.units.fleet.task_force.ship being an object not an array
                    if(taskForce.ship && taskForce.ship.constructor !== Array){
                        let arr = [taskForce.ship]
                        taskForce.ship = arr
                    }
                    taskForce.ship.forEach((ship: any) => {
                        parseRemainder(ship)
                    })
                })
            })
        }
        let unitHistoryFile: UnitHistoryFile = intermediaryObject
        unitHistoryFile.name = getFileNameFromPath(path)
        // stateHistoryFile.state.history = <StateHistory>parseScopeableObject(intermediaryObject.state.history,SCOPE_TYPE.STATE)
        unitHistoryFile.path = path
        projectFiles.unitHistoryFiles.push(unitHistoryFile)
    })

    //read national focus files
    // files = getFilesToLoad("common/national_focus",fs,projectDetails)
    // files.forEach(path => {
    //     let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
    //     let dataModified = "\n" + data
    //     let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
    //     //deal with "remainder"
    //     if(intermediaryObject.remainder){
    //         // console.log(intermediaryObject)
    //         intermediaryObject.remainder.forEach((item: any) => {
    //             if(item){
    //                 if(item.air_wings){
    //                     intermediaryObject.air_wings = item.air_wings
    //                 } else if(typeof(item) !== "string") {
    //                     console.log(item)
    //                 }
    //             }
    //         })
    //         delete intermediaryObject.remainder
    //     }
    //     //deal with keys with messed up names
    //     {
    //         let intermediateKeys = Object.keys(intermediaryObject)
    //         intermediateKeys.forEach(key => {
    //             if(key.match(/.+division_template/)){
    //                 if(intermediaryObject[key].constructor === Array){
    //                     intermediaryObject.division_template = intermediaryObject[key]
    //                 }
    //                 delete intermediaryObject[key]
    //             } else if(key.match(/.+unit/)){
    //                 intermediaryObject.units = intermediaryObject[key]
    //                 delete intermediaryObject[key]
    //             }
    //         })
    //     }
    //     //if it somehow ends up with intermediaryObject.units.division being an object not an array
    //     let nationalFocusFile: NationalFocusFile = intermediaryObject
    //     nationalFocusFile.path = path
    //     projectFiles.nationalFocusFiles.push(nationalFocusFile)
    // })


    //
    //Traits
    //
    //advisor traits
    {
        let traits: string[] = []
        files = getFilesToLoad("common/country_leader",fs,projectDetails)
        files.forEach(path => {
            let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
            let dataModified = "\n" + data
            let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
            let traitKeys: string[] = Object.keys(intermediaryObject.leader_traits)
            traits = traits.concat(traitKeys)
        })
        projectDetails.characterEditing.advisorTraits = traits
    }
    //unit leader traits
    {
        let traits: string[] = []
        files = getFilesToLoad("common/unit_leader",fs,projectDetails)
        files.forEach(path => {
            let data = cleanInvisibleCharacters(fs.readFileSync(path, 'utf8'))
            let dataModified = "\n" + data
            let intermediaryObject = JSON.parse(jomini.parseText(dataModified, {  }, (q) => q.json({  })))
            if(intermediaryObject.leader_traits){
                let traitKeys: string[] = Object.keys(intermediaryObject.leader_traits)
                traits = traits.concat(traitKeys)
            }
        })
        projectDetails.characterEditing.unitTraits = traits
    }


    //map localization strings
    projectDetails.projectFiles.localisationFiles.forEach(localisationFile => {
        let keys: string[] = Object.keys(localisationFile.l_english)
        keys.forEach(key => {
            projectDetails.localisationMap[key] = localisationFile.l_english[key]
        })
    })

    //map sprite strings
    projectDetails.projectFiles.spriteFiles.forEach(spriteFile => {
        spriteFile.spriteTypes.forEach(spriteType => {
            projectDetails.spriteMap[spriteType.name] = spriteType.textureFile
        })
    })

    {
        let leaderPortraits = getFilesToLoadRecursiveOverwrite("gfx/leaders",DirToRead.VANILLA,DirToRead.PROJECT,fs,projectDetails)
        leaderPortraits.forEach(path => {
            let data = fs.readFileSync(path, null)
            let portraitFile: CharacterPortraitFile = {
                data: new Uint8Array(data),
                path: path,
            }
            projectFiles.portraitFiles.push(portraitFile)
        })
    }

    //if vanilla cache hasn't been created, create it
    if (!fs.existsSync(projectDetails.paths.baseGameImgCacheDir)) {
        //generate image cache
        deleteFolderRecursive(projectDetails.paths.projectDir + "/imgcache")
        files = [...getFilesToLoadRecursiveNoOverwrite("gfx/leaders",DirToRead.VANILLA,fs,projectDetails),...getFilesToLoadRecursiveNoOverwrite("gfx/flags",DirToRead.VANILLA,fs,projectDetails)]
        files.forEach(imgFile => {
            cacheImageOnDisk(imgFile,projectDetails,fs)
        })
        // cacheImageOnDisk(files,projectDetails,fs)
    }

    {
        // let overwriteFiles = recursiveLS(relativePath,false,fs,projectDetails)
        // let vanillaFiles = recursiveLS(relativePath,true,fs,projectDetails).filter((name: string) => !overwriteFiles.includes(name))
        // overwriteFiles = overwriteFiles.map((name: string) => `${projectDetails.paths.projectDir}/${name}`)
        // vanillaFiles = vanillaFiles.map((name: string) => `${projectDetails.paths.vanillaDir}/${name}`)
        // files = [...getFilesToLoadRecursive("gfx/leaders",fs,projectDetails),...getFilesToLoadRecursive("gfx/flags",fs,projectDetails)]
    }


    //convert to in-ide datastructures
    //discover countries
    projectDetails.projectFiles.tagFiles.forEach(tagFile => {
        let tagFileKeys: string[] = Object.keys(tagFile)
        tagFileKeys.filter(key => key !== "path").forEach(tag => {
            //get country name
            let countryName: string = projectDetails.localisationMap[tag]
            if(countryName){
                let countryFile: CountryFile | undefined = projectDetails.projectFiles.countryFiles.find(countryFile => countryFile.path.includes(tagFile[tag]))
                let countryHistoryFile: HistoryCountryFile | undefined = projectDetails.projectFiles.historyCountryFiles.find(historyFile => historyFile.path.includes(tag + " - "))
                let unitFiles: UnitHistoryFile[] = projectDetails.projectFiles.unitHistoryFiles.filter(unitFile => unitFile.path.includes(tag + "_"))
                if(countryFile && countryHistoryFile){
                    let newCountry: Country = {
                        tag: tag,
                        color: countryFile ? countryFile.color : [0, 0, 0],
                        graphicalCulture: countryFile.graphical_culture_2d.substring(0,countryFile.graphical_culture_2d.length - 3),
                        // triggers: countryHistoryFile ? countryHistoryFile.triggers : [],
                        vanilla: isVanillaPath(tagFile.path, context),
                        tagFile: tagFile,
                        countryFile: countryFile,
                        countryHistoryFile: countryHistoryFile,
                        unitFiles: unitFiles,
                    }
                    // console.log(newCountry)
                    projectDetails.countryEditing.countries.push(newCountry)
                }
            }
        })
    })
    //discover states
    projectDetails.projectFiles.historyStateFiles.forEach(stateFile => {
        let newState: State = {
            id: stateFile.state.id,
            name: stateFile.state.name,
            ownerTag: "",
            provinces: [],
            historyFile: stateFile,
        }
        stateFile?.state?.history?.scopes?.forEach(scope => {
            if(scope.name === "owner"){
                newState.ownerTag = scope.object
            }
        })
        if(stateFile?.state?.provinces){
            newState.provinces = stateFile?.state?.provinces
        }
        projectDetails.stateEditing.states.push(newState)
    })
    //discover characters
    projectDetails.projectFiles.characterFiles.forEach(characterFile => {
        if(characterFile && characterFile.characters){
            let keys: string[] = Object.keys(characterFile.characters)
            keys.forEach(key => {
                // console.log(characterFile.characters[key].portraits)
                let characterProperties: CharacterProperties = characterFile.characters[key]
                let character: Character = {
                    tag: key,
                    properties: characterProperties,
                    characterFile: characterFile,
                }
                projectDetails.characterEditing.characters.push(character)
            })
        }
    })
    //discover units
    projectDetails.projectFiles.unitHistoryFiles.forEach(unitHistoryFile => {
        // console.log("==============")
        // console.log(unitHistoryFile)
        if(unitHistoryFile){
            if(unitHistoryFile?.units?.division && unitHistoryFile.units.division.constructor === Array){
                unitHistoryFile.units.division.forEach(unit => {
                    let newUnit: Unit = {
                        name: "",
                        provinceId: unit.location,
                        divisionTemplate: unit.division_template,
                        unitFile: unitHistoryFile,
                        startExperience: unit.start_experience_factor,
                    }
                    if(unit.name){
                        newUnit.name = unit.name
                    } else if(unit.division_name){
                        newUnit.name = "name order" + unit.division_name.name_order
                        newUnit.divisionName = unit.division_name
                    }
                    if(unit.force_equipment_variants){
                        newUnit.forceEquipmentVariants = unit.force_equipment_variants
                    }
                    projectDetails.unitEditing.units.push(newUnit)
                })
            }
            if(unitHistoryFile?.units?.fleet){
                unitHistoryFile.units.fleet.forEach(fleet => {
                    let newFleet: Fleet = {
                        name: fleet.name,
                        navalBase: fleet.naval_base,
                        taskForces: [],
                        unitFile: unitHistoryFile,
                    }
                    fleet.task_force.forEach((taskForce: any) => {
                        let newTaskForce: TaskForce = {
                            name: taskForce.name,
                            location: taskForce.location,
                            ship: [],
                        }
                        taskForce.ship.forEach((ship: any) => {
                            let newShip: Ship = {
                                definition: ship.definition,
                                equipment: {},
                            }
                            if(ship.name){
                                newShip.name = ship.name
                            } else {
                                newShip.ordered_name = ship.ordered_name
                            }
                            if(ship.pride_of_the_fleet){
                                newShip.pride_of_the_fleet = true
                            }
                            let equipmentKeys = Object.keys(ship.equipment)
                            equipmentKeys.forEach(equipmentKey => {
                                newShip.equipment[equipmentKey] = ship.equipment[equipmentKey]
                            })
                            newTaskForce.ship.push(newShip)
                        })
                        newFleet.taskForces.push(newTaskForce)
                    })
                })
            }
            if(unitHistoryFile?.air_wings){
                let squadronKeys = Object.keys(unitHistoryFile.air_wings)
                let wingMap: any = {}
                squadronKeys.forEach(squadronKey => {
                    //@ts-ignore
                    let squadron = unitHistoryFile.air_wings[squadronKey]
                    let newSquadron: Record<string,AircraftEquipment> = {
                    }
                    let equipmentKeys = Object.keys(squadron)
                    equipmentKeys.forEach((equipmentKey: string) => {
                        let equipment = squadron[equipmentKey]
                        newSquadron[equipmentKey] = equipment
                    })
                    wingMap[squadronKey] = newSquadron
                })
                let airFleet: AirFleet = {
                    airwings: wingMap,
                    unitFile: unitHistoryFile,
                }
                projectDetails.unitEditing.airfleets.push(airFleet)
            }
        }
    })
    //discover national focuses
    projectDetails.projectFiles.unitHistoryFiles.forEach(unitHistoryFile => {
        // console.log("==============")
        // console.log(unitHistoryFile)
        if(unitHistoryFile){
            if(unitHistoryFile?.units?.division && unitHistoryFile.units.division.constructor === Array){
                unitHistoryFile.units.division.forEach(unit => {
                    let newUnit: Unit = {
                        name: "",
                        provinceId: unit.location,
                        divisionTemplate: unit.division_template,
                        unitFile: unitHistoryFile,
                        startExperience: unit.start_experience_factor,
                    }
                    if(unit.name){
                        newUnit.name = unit.name
                    } else if(unit.division_name){
                        newUnit.name = "name order" + unit.division_name.name_order
                        newUnit.divisionName = unit.division_name
                    }
                    if(unit.force_equipment_variants){
                        newUnit.forceEquipmentVariants = unit.force_equipment_variants
                    }
                    projectDetails.unitEditing.units.push(newUnit)
                })
            }
            if(unitHistoryFile?.units?.fleet){
                unitHistoryFile.units.fleet.forEach(fleet => {
                    let newFleet: Fleet = {
                        name: fleet.name,
                        navalBase: fleet.naval_base,
                        taskForces: [],
                        unitFile: unitHistoryFile,
                    }
                    fleet.task_force.forEach((taskForce: any) => {
                        let newTaskForce: TaskForce = {
                            name: taskForce.name,
                            location: taskForce.location,
                            ship: [],
                        }
                        taskForce.ship.forEach((ship: any) => {
                            let newShip: Ship = {
                                definition: ship.definition,
                                equipment: {},
                            }
                            if(ship.name){
                                newShip.name = ship.name
                            } else {
                                newShip.ordered_name = ship.ordered_name
                            }
                            if(ship.pride_of_the_fleet){
                                newShip.pride_of_the_fleet = true
                            }
                            let equipmentKeys = Object.keys(ship.equipment)
                            equipmentKeys.forEach(equipmentKey => {
                                newShip.equipment[equipmentKey] = ship.equipment[equipmentKey]
                            })
                            newTaskForce.ship.push(newShip)
                        })
                        newFleet.taskForces.push(newTaskForce)
                    })
                })
            }
            if(unitHistoryFile?.air_wings){
                let squadronKeys = Object.keys(unitHistoryFile.air_wings)
                let wingMap: any = {}
                squadronKeys.forEach(squadronKey => {
                    //@ts-ignore
                    let squadron = unitHistoryFile.air_wings[squadronKey]
                    let newSquadron: Record<string,AircraftEquipment> = {
                    }
                    let equipmentKeys = Object.keys(squadron)
                    equipmentKeys.forEach((equipmentKey: string) => {
                        let equipment = squadron[equipmentKey]
                        newSquadron[equipmentKey] = equipment
                    })
                    wingMap[squadronKey] = newSquadron
                })
                let airFleet: AirFleet = {
                    airwings: wingMap,
                    unitFile: unitHistoryFile,
                }
                projectDetails.unitEditing.airfleets.push(airFleet)
            }
        }
    })


    context.dispatch(createActionLoadProject(projectDetails))
    context.dispatch(createActionSetLoading(false))
}


export const fixCharacterParse = (intermediaryObject: any): any => {
    //fix army portraits becoming array somehow
    if(intermediaryObject?.portraits?.army && intermediaryObject.portraits.army.constructor === Array){
        let newArmy: any = {scopes:[]}
        intermediaryObject.portraits.army.forEach((armyEntry: any) => {
            if(armyEntry?.scopes){
                newArmy.scopes.push(armyEntry.scopes[0])
            }
        })
        intermediaryObject.portraits.army = newArmy
    }
    return intermediaryObject
}




export const openProjectDialog = async (context: AppContextInterface, onSelect: (path: string) => void) => {
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
        let filePath: string = path
        onSelect(filePath)
        // createProjectStructure(context,path.replaceAll("\\","/"))
    }
}

enum DirToRead {
    VANILLA,
    PROJECT,
    IMGCACHE,
}

const getFilesToLoad = (relativePath: string, fs: any, projectDetails: ProjectDetails): string[] => {
    let overwriteFiles = fs.readdirSync(`${projectDetails.paths.projectDir}/${relativePath}`, 'utf8')
    let vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${relativePath}`, 'utf8').filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map((name: string) => `${projectDetails.paths.projectDir}/${relativePath}/${name}`)
    vanillaFiles = vanillaFiles.map((name: string) => `${projectDetails.paths.vanillaDir}/${relativePath}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes(relativePath)){
        vanillaFiles = []
    }
    let returnFiles = [...overwriteFiles,...vanillaFiles]
    return returnFiles
}

const getFilesToLoadFilterEnding = (relativePath: string, ending: string, fs: any, projectDetails: ProjectDetails): string[] => {
    let filterRegex = new RegExp(`\\${ending}$`)
    let overwriteFiles = fs.readdirSync(`${projectDetails.paths.projectDir}/${relativePath}`, 'utf8').filter((name: string) => name.match(filterRegex))
    let vanillaFiles = fs.readdirSync(`${projectDetails.paths.vanillaDir}/${relativePath}`, 'utf8').filter((name: string) => name.match(filterRegex)).filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map((name: string) => `${projectDetails.paths.projectDir}/${relativePath}/${name}`)
    vanillaFiles = vanillaFiles.map((name: string) => `${projectDetails.paths.vanillaDir}/${relativePath}/${name}`)
    if(projectDetails.projectFiles.overrideFile.overridePaths.includes(relativePath)){
        vanillaFiles = []
    }
    let returnFiles = [...overwriteFiles,...vanillaFiles]
    return returnFiles
}

const recursiveLS = (relativePath: string, dirToRead: DirToRead, fs: any, projectDetails: ProjectDetails): string[] => {
    let basePath: string = ""
    switch(dirToRead){
        case DirToRead.VANILLA:
            basePath = projectDetails.paths.vanillaDir
        break;
        case DirToRead.PROJECT:
            basePath = projectDetails.paths.projectDir
        break;
        case DirToRead.IMGCACHE:
            basePath = projectDetails.paths.baseGameImgCacheDir
        break;
    }
    let topLevelFiles = fs.readdirSync(`${basePath}/${relativePath}`, 'utf8')
    let returnFiles: string[] = []
    topLevelFiles.forEach((fileName: string) => {
        let fileStats = fs.lstatSync(`${basePath}/${relativePath}/${fileName}`)
        if(fileStats.isDirectory()){
            returnFiles = returnFiles.concat(recursiveLS(`${relativePath}/${fileName}`,dirToRead,fs,projectDetails))
        } else {
            returnFiles.push(`${relativePath}/${fileName}`)
        }
    })
    return returnFiles
}

const getFilesToLoadRecursiveNoOverwrite = (relativePath: string, dirToRead: DirToRead, fs: any, projectDetails: ProjectDetails): string[] => {
    let vanillaFiles = recursiveLS(relativePath,DirToRead.VANILLA,fs,projectDetails)
    vanillaFiles = vanillaFiles.map((name: string) => `${projectDetails.paths.vanillaDir}/${name}`)
    return [...vanillaFiles]
}

const getFilesToLoadRecursiveOverwrite = (relativePath: string, dirToRead: DirToRead, dirToOverwriteWith: DirToRead, fs: any, projectDetails: ProjectDetails): string[] => {
    let overwriteFiles = recursiveLS(relativePath,dirToOverwriteWith,fs,projectDetails)
    let vanillaFiles = recursiveLS(relativePath,dirToRead,fs,projectDetails).filter((name: string) => !overwriteFiles.includes(name))
    overwriteFiles = overwriteFiles.map((name: string) => `${projectDetails.paths.projectDir}/${name}`)
    vanillaFiles = vanillaFiles.map((name: string) => `${projectDetails.paths.vanillaDir}/${name}`)
    return [...overwriteFiles,...vanillaFiles]
}

const parseRemainder = (intermediaryObject: any): void => {
    if(intermediaryObject.remainder){
        let i = 0;
        let limit = intermediaryObject.remainder.length
        while(i < limit){
            let key: string = ""
            let object: any
            if(typeof(intermediaryObject.remainder[i]) === "string" && intermediaryObject.remainder[i] !== ""){
                key = intermediaryObject.remainder[i]
                object = intermediaryObject.remainder[i+1]
                i = i + 2;
            } else if(intermediaryObject.remainder[i] !== ""){
                key = Object.keys(intermediaryObject.remainder[i])[0]
                object = intermediaryObject.remainder[i][key]
                i++
            } else {
                i++
            }
            if(intermediaryObject[key]){
                if(intermediaryObject[key].constructor === Array){
                    intermediaryObject[key].push(object)
                } else {
                    intermediaryObject[key] = [intermediaryObject[key],object]
                }
            } else {
                intermediaryObject[key] = object
            }
        }
        delete intermediaryObject.remainder
    }
}