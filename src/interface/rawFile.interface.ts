import { Scope } from "./scope.interface"

/**
 * The config file for the overall project
 */
export interface ConfigFile {

    /**
     * The directory to export to
     */
    exportDir: string,

    /**
     * The name of the project
     */
    name: string,
}

/**
 * The file that contains all paths that are being overwritten by the project
 */
export interface OverrideFile {

    /**
     * All paths being overwritten by the project
     */
    overridePaths: string[]
}

//
//scopeable files interface
//
export interface ScopeableObject {
    scopes: Scope[],
}


export interface FileTracking {
    path: string,
}

//
// country tag list files
//
export interface TagFile extends FileTracking {
    [key:string]: string
}


//
//countries files
//
export interface CountryFile extends FileTracking {
    graphical_culture: string,
    graphical_culture_2d: string,
    color: number[]
}

//
//characters file
//
export interface CharacterFile extends FileTracking {
    characters: Record<string,CharacterProperties>
}


export interface CharacterProperties {
    name: string,
    portraits: PortraitProperties,
    country_leader?: CountryLeaderProperties,
    advisor?: AdvisorProperties | AdvisorProperties[],
    corps_commander?: CorpsCommanderProperties,
}

export interface PortraitProperties {
    civilian?: PortraitList,
    army?: PortraitList,
    navy?: PortraitList,
}

export interface PortraitList extends ScopeableObject {
    //never found bc scoped objects
    // large?: string
    // small?: string,
}

export interface CorpsCommanderProperties extends ScopeableObject {
    attack_skill: number,
    defense_skill: number,
    planning_skill: number,
    logistics_skill: number,
    legacy_id: number,
}

export interface CountryLeaderProperties extends ScopeableObject {
    // ideology: string,
    // expire: string,
    id: number,
}

export interface AdvisorAIProperties {
    factor: number,
}

export interface AdvisorProperties extends ScopeableObject {
    // slot: string,
    // idea_tokens: string,
    // ledger: string,
    // // ai_will_do: AdvisorAIProperties,
    // traits?: string[],
}


//
//Character portraits
//
export interface CharacterPortraitFile extends FileTracking {
    data: Uint8Array,
}

//
//history country file
//
export interface HistoryCountryFile extends ScopeableObject, FileTracking {
    capital: number,
    oob: string,
}

//
//history state files
//
export interface HistoryStateFile extends FileTracking {
    state : StateObject,
}

export interface StateObject {
    id: number,
    name: string,
    manpower: number,
    resources?: any,
    state_category: string,
    history: StateHistory,
    provinces: number[],
    local_supplies: number,
}

export interface StateHistory extends ScopeableObject {
    buildings: Buildings,
}

export interface Buildings {
    infrastructure?: number,
    arms_factory?: number,
    industrial_complex?: number,
    air_base?: number,
}

//
// Localisation file
//
export interface LocalisationFile extends FileTracking {
    l_english: any
}

//
//unit history file
//
export interface UnitHistoryFile extends FileTracking, ScopeableObject {
    name: string,
    instant_effect?: ScopeableObject,
    units?: UnitBlock,
    division_template?: DivisionTemplate[],
    air_wings?: Record<string,any>,
}

export interface DivisionTemplate {
    name: string,
    regiments: any[],
    support: any[],
}

export interface UnitBlock {
    division?: UnitFileDivision[],
    fleet?: any[],
}

export interface UnitFileDivision {
    name?: string,
    division_name?: UnitFileDivisionName,
    location: number,
    division_template: string,
    start_experience_factor: number,
    force_equipment_variants?: Record<string,UnitEquipmentVariant>,
}

export interface UnitFileDivisionName {
    is_name_ordered: boolean,
    name_order: number,
}

export interface UnitEquipmentVariant {
    owner: string,
    version_name: string,
}

//
//National focus file
//
export interface NationalFocusFile extends FileTracking, ScopeableObject {

}

//
//sprite files
//
export interface SpriteFile extends FileTracking {
    spriteTypes: SpriteType[],
}

export interface SpriteType {
    name: string,
    textureFile: string,
}