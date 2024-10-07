import { CharacterProperties } from "../interface/rawFile.interface"
import { AppDispatchAction, AppDispatchActionType, AppState, Character, Country, MainStateAction, ProjectDetails, ProjectFiles, State, Unit } from "./mainState.interface"

export const createActionSetLoading = (isLoading: boolean): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_LOADING,
        value: isLoading
    }
}

export const createActionSetError = (error: Error | null): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_ERROR,
        value: error,
    }
}

export const createActionLoadProject = (projectDetails: ProjectDetails): MainStateAction => {
    return {
        type: AppDispatchActionType.LOAD_PROJECT,
        value: projectDetails
    }
}

export const createActionOpenCountry = (country: Country | null): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_COUNTRY_TO_EDIT,
        value: country,
    }
}

export const createActionOpenState = (state: State | null): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_STATE_TO_EDIT,
        value: state,
    }
}

export const createActionSetStateOwner = (state: State, ownerTag: string): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_OWNER_OF_STATE,
        value: {
            state: state,
            ownerTag: ownerTag,
        }
    }
}

export const createActionSetExportDir = (exportDir: string): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_EXPORT_DIR,
        value: exportDir,
    }
}

export const createActionSetMetadataName = (name: string): MainStateAction => {
    return {
        type: AppDispatchActionType.SET_METADATA_NAME,
        value: name,
    }
}

export const createActionOpenCharacter = (character: Character | null): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_CHARACTER_TO_EDIT,
        value: character,
    }
}

export const createActionSetCountryEditTab = (tab: number): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_COUNTRY_EDIT_TAB,
        value: tab,
    }
}

export const createActionSetCountryScopeFileIndex = (index: number): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_COUNTRY_SCOPE_FILE_INDEX,
        value: index,
    }
}

export const createActionAddCharacter = (character: Character): AppDispatchAction => {
    return {
        type: AppDispatchActionType.ADD_CHARACTER,
        value: character,
    }
}

export const createActionDeleteCharacter = (character: Character): AppDispatchAction => {
    return {
        type: AppDispatchActionType.DELETE_CHARACTER,
        value: character,
    }
}

export const createActionAddUnit = (unit: Unit): AppDispatchAction => {
    return {
        type: AppDispatchActionType.ADD_UNIT,
        value: unit
    }
}

export const createActionDeleteUnit = (unit: Unit): AppDispatchAction => {
    return {
        type: AppDispatchActionType.DELETE_UNIT,
        value: unit
    }
}

export const createActionSetImgData = (imgData: ImageData, heightmap: number[][]): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_IMG_DATA,
        value: {
            imgData: imgData,
            heightmap: heightmap,
        },
    }
}

export const createActionAddCountry = (country: Country): AppDispatchAction => {
    return {
        type: AppDispatchActionType.ADD_COUNTRY,
        value: country,
    }
}

export const createActionSetCountryName = (name: string, tag: string): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_COUNTRY_NAME,
        value: {
            name: name,
            tag: tag,
        }
    }
}

export const createActionSetCountryLeaderTraits = (characterTag: string, traits: string[]): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_COUNTRY_LEADER_TRAITS,
        value: {
            characterTag: characterTag,
            traits: traits,
        }
    }
}

export const createActionSetAdvisorTraits = (characterTag: string,  advisor: any, traits: string[]): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_ADVISOR_TRAITS,
        value: {
            characterTag: characterTag,
            advisor: advisor,
            traits: traits,
        }
    }
}

export const createActionSetUnitLeaderTraits = (characterTag: string, traits: string[]): AppDispatchAction => {
    return {
        type: AppDispatchActionType.SET_UNIT_LEADER_TRAITS,
        value: {
            characterTag: characterTag,
            traits: traits,
        }
    }
}

export const createActionEditState = (appState: AppState | null): AppDispatchAction => {
    return {
        type: AppDispatchActionType.EDIT_STATE,
        value: {
            appState: appState,
        }
    }
}