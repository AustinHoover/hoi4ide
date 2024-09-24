import { Dispatch } from "react"
import { CharacterFile, CharacterPortraitFile, CharacterProperties, ConfigFile, CountryFile, HistoryCountryFile, HistoryStateFile, LocalisationFile, NationalFocusFile, SpriteFile, StateHistory, TagFile, UnitEquipmentVariant, UnitFileDivisionName, UnitHistoryFile } from "../interface/rawFile.interface"


//app state related

export interface ProjectDetails {
    metadata: ProjectMetadata,
    paths: Paths,
    stateEditing: StateEditing,
    countryEditing: CountryEditing,
    characterEditing: CharacterEditing,
    unitEditing: UnitEditing,
    mapEditing: MapEditing,
    projectFiles: ProjectFiles,
    localisationMap: any,
    spriteMap: any,
}

export interface ProjectMetadata {
    name: string,
}

export interface Paths {
    projectDir: string,
    exportDir: string,
    vanillaDir: string,
    installDir: string,
    baseGameImgCacheDir: string,
    projectImgCacheDir: string,
}

export interface ProjectFiles {
    configFile: ConfigFile,
    tagFiles: TagFile[],
    countryFiles: CountryFile[],
    characterFiles: CharacterFile[],
    historyCountryFiles: HistoryCountryFile[],
    historyStateFiles: HistoryStateFile[],
    localisationFiles: LocalisationFile[],
    portraitFiles: CharacterPortraitFile[],
    unitHistoryFiles: UnitHistoryFile[],
    nationalFocusFiles: NationalFocusFile[],
    spriteFiles: SpriteFile[],
}

export interface MapEditing {
    heightmap: number[][] | null,
    imgData: ImageData | null,
}

export interface State {
    id: number,
    name: string,
    ownerTag: string,
    historyFile: HistoryStateFile,
}

export interface CharacterEditing {
    currentlySelectedCharacter: Character | null,
    characters: Character[],
    advisorTraits: string[],
    unitTraits: string[],
}

export interface Character {
    tag: string,
    properties: CharacterProperties,
    characterFile: CharacterFile | null,
}

export interface CountryEditing {
    currentlySelectedCountry: Country | null,
    currentlySelectedUnitFile: UnitHistoryFile | null,
    countries: Country[],
    editTab: number,
    scopeFileIndex: number,
}

export interface Country {
    tag: string,
    color: number[],
    graphicalCulture: string,
    vanilla: boolean,
    tagFile: TagFile | undefined,
    countryFile: CountryFile,
    countryHistoryFile: HistoryCountryFile,
    unitFiles: UnitHistoryFile[],
}

export interface StateEditing {
    currentlySelectedState: State | null,
    states: State[],
}

export interface Unit {
    name: string,
    provinceId: number,
    divisionTemplate: string,
    unitFile: UnitHistoryFile | null,
    startExperience: number,
    startEquipment?: number,
    startManpower?: number,
    divisionName?: UnitFileDivisionName,
    forceEquipmentVariants?: Record<string,UnitEquipmentVariant>,
}

export interface UnitEditing {
    currentlySelectedUnit: Unit | null,
    units: Unit[],
    fleets: Fleet[],
    airfleets: AirFleet[],
}

export interface Fleet {
    name: string,
    navalBase: number,
    taskForces: TaskForce[],
    unitFile: UnitHistoryFile | null,
}

export interface TaskForce {
    name: string,
    location: number,
    ship: Ship[],
}

export interface Ship {
    name?: string,
    ordered_name?: string,
    pride_of_the_fleet?: boolean,
    definition: string,
    equipment: Record<string,NavalEquipment>,
}

export interface NavalEquipment {
    amount: number,
    ownerTag: string,
    versionName: string,
}

export interface AirFleet {
    airwings: Record<string,AirWing>[],
    unitFile: UnitHistoryFile | null,
}

export interface AirWing {
    equipment: Record<string,AircraftEquipment>,
}

export interface AircraftEquipment {
    owner: string,
    amount: number,
}

export interface PageState {
    loading: boolean,
    error: Error | null,
}

export interface AppDetails {
    debug: boolean,
}



export interface AppState {
    pageState : PageState,
    projectDetails: ProjectDetails,
    appDetails: AppDetails,
}



//
// Initial state
//

export let initialAppState: AppState = {
    pageState: {
        loading: false,
        error: null,
    },
    projectDetails: {
        metadata: {
            name: "",
        },
        paths: {
            projectDir: "",
            exportDir: "",
            vanillaDir: "",
            installDir: "",
            baseGameImgCacheDir: "",
            projectImgCacheDir: "",
        },
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
        projectFiles: {
            configFile: {
                exportDir: "",
                name: "",
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
        },
        localisationMap: {},
        spriteMap: {},
    },
    appDetails: {
        debug: false,
    },
}











//
//context related
//
export enum AppDispatchActionType {
    SET_LOADING,
    SET_ERROR,
    LOAD_PROJECT,
    SET_COUNTRY_TO_EDIT,
    SET_STATE_TO_EDIT,
    SET_OWNER_OF_STATE,
    SET_EXPORT_DIR,
    SET_METADATA_NAME,
    SET_CHARACTER_TO_EDIT,
    SET_COUNTRY_EDIT_TAB,
    SET_COUNTRY_SCOPE_FILE_INDEX,
    ADD_CHARACTER,
    DELETE_CHARACTER,
    ADD_UNIT,
    DELETE_UNIT,
    SET_IMG_DATA,
    ADD_COUNTRY,
    SET_COUNTRY_NAME,
    SET_COUNTRY_LEADER_TRAITS,
    SET_ADVISOR_TRAITS,
    SET_UNIT_LEADER_TRAITS,
}

export interface AppDispatchAction {
    type: AppDispatchActionType,
    value: any  
}

export interface AppContextInterface {
    state : AppState,
    dispatch: Dispatch<AppDispatchAction>,
}

export let initialContext: AppContextInterface = {
    state: initialAppState,
    dispatch: () => {},
}


//
// Main state action
//

export interface MainStateAction {
    type: AppDispatchActionType,
    value: any,
}