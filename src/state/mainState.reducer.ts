import { AdvisorProperties } from "../interface/rawFile.interface";
import { AppDispatchActionType, AppState, Country, ProjectDetails, ProjectFiles } from "./mainState.interface";


export const appStateReducer = (state : AppState, action: any): AppState => {
    let newState = {...state}
    switch(action.type){
        case AppDispatchActionType.SET_LOADING: {
            newState.pageState.loading = action.value
        } break;
        case AppDispatchActionType.SET_ERROR: {
            newState.pageState.error = action.value
        } break
        case AppDispatchActionType.LOAD_PROJECT: {
            let projectDetails: ProjectDetails = action.value
            newState.projectDetails = projectDetails
        } break;
        case AppDispatchActionType.SET_COUNTRY_TO_EDIT: {
            newState.projectDetails.countryEditing.currentlySelectedCountry = action.value
        } break;
        case AppDispatchActionType.SET_STATE_TO_EDIT: {
            newState.projectDetails.stateEditing.currentlySelectedState = action.value
        } break;
        case AppDispatchActionType.SET_OWNER_OF_STATE: {
            let targetState = newState.projectDetails.stateEditing.states.find(stateData => stateData.id === action.value.state.id)
            if(targetState){
                targetState.ownerTag = action.value.ownerTag
            }
        } break;
        case AppDispatchActionType.SET_EXPORT_DIR: {
            newState.projectDetails.paths.exportDir = action.value
        } break;
        case AppDispatchActionType.SET_METADATA_NAME: {
            newState.projectDetails.metadata.name = action.value
        } break;
        case AppDispatchActionType.SET_CHARACTER_TO_EDIT: {
            newState.projectDetails.characterEditing.currentlySelectedCharacter = action.value
        } break;
        case AppDispatchActionType.SET_COUNTRY_EDIT_TAB: {
            newState.projectDetails.countryEditing.editTab = action.value
        } break;
        case AppDispatchActionType.SET_COUNTRY_SCOPE_FILE_INDEX: {
            newState.projectDetails.countryEditing.scopeFileIndex = action.value
        } break;
        case AppDispatchActionType.ADD_CHARACTER: {
            newState.projectDetails.characterEditing.characters = [...state.projectDetails.characterEditing.characters, action.value]
        } break;
        case AppDispatchActionType.DELETE_CHARACTER: {
            newState.projectDetails.characterEditing.characters = state.projectDetails.characterEditing.characters.filter(character => character !== action.value)
        } break;
        case AppDispatchActionType.ADD_UNIT: {
            newState.projectDetails.unitEditing.units = [...state.projectDetails.unitEditing.units, action.value]
        } break;
        case AppDispatchActionType.DELETE_UNIT: {
            newState.projectDetails.unitEditing.units = state.projectDetails.unitEditing.units.filter(unit => unit !== action.value)
        } break;
        case AppDispatchActionType.SET_IMG_DATA: {
            newState.projectDetails.mapEditing = {
                imgData: action.value.imgData,
                heightmap: action.value.heightmap,
            }
        } break;
        case AppDispatchActionType.ADD_COUNTRY: {
            let country: Country = action.value
            //country to country array
            newState.projectDetails.countryEditing.countries = newState.projectDetails.countryEditing.countries.filter(sample => sample !== country)
            newState.projectDetails.countryEditing.countries.push(country)
            //country file
            newState.projectDetails.projectFiles.countryFiles = newState.projectDetails.projectFiles.countryFiles.filter(sample => sample !== country.countryFile)
            newState.projectDetails.projectFiles.countryFiles.push(country.countryFile)
            //country history file
            newState.projectDetails.projectFiles.historyCountryFiles = newState.projectDetails.projectFiles.historyCountryFiles.filter(sample => sample !== country.countryHistoryFile)
            newState.projectDetails.projectFiles.historyCountryFiles.push(country.countryHistoryFile)
            //unit file
            newState.projectDetails.projectFiles.unitHistoryFiles = newState.projectDetails.projectFiles.unitHistoryFiles.filter(sample => sample !== country.unitFiles[0])
            newState.projectDetails.projectFiles.unitHistoryFiles.push(country.unitFiles[0])
        } break;
        case AppDispatchActionType.SET_COUNTRY_NAME: {
            newState.projectDetails.localisationMap[action.value.tag] = action.value.name
        } break;
        case AppDispatchActionType.SET_COUNTRY_LEADER_TRAITS: {
            let character = newState.projectDetails.characterEditing.characters.find(character => character.tag === action.value.characterTag)
            if(character){
                let countryLeader = character.properties.country_leader
                if(countryLeader){
                    let traitsScope = countryLeader.scopes.find(scope => scope.name === "traits")
                    if(traitsScope){
                        traitsScope.object = action.value.traits
                    }
                }
            }
        } break;
        case AppDispatchActionType.SET_ADVISOR_TRAITS: {
            let character = newState.projectDetails.characterEditing.characters.find(character => character.tag === action.value.characterTag)
            if(character){
                let advisorRaw = character.properties.advisor
                if(advisorRaw && advisorRaw.constructor === Array){
                    let advisorArray = advisorRaw as AdvisorProperties[]
                    let advisor: AdvisorProperties | undefined = advisorArray.find(searchObj => searchObj === action.value.advisor)
                    if(advisor){
                        let traitsScope = advisor.scopes.find(scope => scope.name === "traits")
                        if(traitsScope){
                            traitsScope.object = action.value.traits
                        }
                    }
                } else if(advisorRaw){
                    let advisor = advisorRaw as AdvisorProperties
                    let traitsScope = advisor.scopes.find(scope => scope.name === "traits")
                    if(traitsScope){
                        traitsScope.object = action.value.traits
                    }
                }
            }
        } break;
        case AppDispatchActionType.SET_UNIT_LEADER_TRAITS: {
            let character = newState.projectDetails.characterEditing.characters.find(character => character.tag === action.value.characterTag)
            if(character){
                let unitLeader = character.properties.corps_commander
                if(unitLeader){
                    let traitsScope = unitLeader.scopes.find(scope => scope.name === "traits")
                    if(traitsScope){
                        traitsScope.object = action.value.traits
                    }
                }
            }
        } break;
    }
    return newState
}