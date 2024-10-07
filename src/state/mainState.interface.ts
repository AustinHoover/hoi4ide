import { Dispatch } from "react"
import { CharacterFile, CharacterPortraitFile, CharacterProperties, ConfigFile, CountryFile, HistoryCountryFile, HistoryStateFile, LocalisationFile, NationalFocusFile, OverrideFile, SpriteFile, StateHistory, TagFile, UnitEquipmentVariant, UnitFileDivisionName, UnitHistoryFile } from "../interface/rawFile.interface"


/**
 * Main details about the project
 */
export interface ProjectDetails {

    /**
     * Metadata about the project
     */
    metadata: ProjectMetadata,

    /**
     * Paths to various resources on disk
     */
    paths: Paths,

    /**
     * State for whatever is currently being edited
     */
    stateEditing: StateEditing,

    /**
     * Data about the currently edited country
     */
    countryEditing: CountryEditing,

    /**
     * Data about the currently edited character
     */
    characterEditing: CharacterEditing,

    /**
     * Data about the current unit being edited
     */
    unitEditing: UnitEditing,

    /**
     * Data about the map being edited
     */
    mapEditing: MapEditing,

    /**
     * All files in the project
     */
    projectFiles: ProjectFiles,

    /**
     * The localization map
     */
    localisationMap: any,

    /**
     * The sprite map
     */
    spriteMap: any,
}

/**
 * Metadata about the project
 */
export interface ProjectMetadata {

    /**
     * The name of the project
     */
    name: string,
}

/**
 * Paths to various resources on disk
 */
export interface Paths {

    /**
     * The root directory of the project
     */
    projectDir: string,
    
    /**
     * The directory to export to
     */
    exportDir: string,

    /**
     * The directory that stores the vanilla game install
     */
    vanillaDir: string,

    /**
     * The directory that hoi4ide is installed to
     */
    installDir: string,

    /**
     * The image cache directory for base game images
     */
    baseGameImgCacheDir: string,

    /**
     * The image cache directory for project-specific images
     */
    projectImgCacheDir: string,
}

/**
 * The files contained in the project
 */
export interface ProjectFiles {

    /**
     * The config file
     */
    configFile: ConfigFile,

    /**
     * The file containing all overriden paths
     */
    overrideFile: OverrideFile,

    /**
     * The tag files
     */
    tagFiles: TagFile[],

    /**
     * The country files
     */
    countryFiles: CountryFile[],

    /**
     * The character files
     */
    characterFiles: CharacterFile[],

    /**
     * The country history files
     */
    historyCountryFiles: HistoryCountryFile[],

    /**
     * The state history files
     */
    historyStateFiles: HistoryStateFile[],

    /**
     * The localization files
     */
    localisationFiles: LocalisationFile[],

    /**
     * The character portrait files
     */
    portraitFiles: CharacterPortraitFile[],

    /**
     * The unit history files
     */
    unitHistoryFiles: UnitHistoryFile[],
    
    /**
     * The national focus files
     */
    nationalFocusFiles: NationalFocusFile[],

    /**
     * The sprite files
     */
    spriteFiles: SpriteFile[],
}

export interface MapEditing {
    heightmap: number[][] | null,
    imgData: ImageData | null,
}

/**
 * A state
 */
export interface State {
    /**
     * The id of the state
     */
    id: number,

    /**
     * The name of the state
     */
    name: string,

    /**
     * The owner tag of the state, if one exists
     */
    ownerTag: string,

    /**
     * The provinces contained in the state
     */
    provinces: number[],

    /**
     * The manpower of the state
     */
    manpower: number,

    /**
     * The history file associated with the state object
     */
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
    EDIT_STATE,
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