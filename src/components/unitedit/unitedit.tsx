import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties, UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import GenericDropdown, { DropdownOption } from "../dropdowngeneric/dropdowngeneric";

import "./unitedit.css"

export interface UnitEditProps {
    unitFiles: UnitHistoryFile[],
}

const UnitEdit = (props: UnitEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [currentFile, setCurrentFile] = React.useState("")

    let fileOptions: DropdownOption[] = []

    let fileMap: any = {}
    props.unitFiles.forEach((unitFile) => {
        // console.log(unitFile.path)
        let regex = unitFile.path.match(/^.*[\\\/]([^\/\\]*)\.[^\/\\]*$/)
        if(regex){
            let fileName = regex[1]
            fileOptions.push({
                label: fileName,
                value: fileName,
            })
            fileMap[fileName] = unitFile
        }
    })

    let selectFile = (file: any): string => {
        setCurrentFile(file.value)
        return file
    }

    let unitsWidget: JSX.Element[] = []

    if(currentFile !== "" && fileMap[currentFile]){
        let unitFile: UnitHistoryFile = fileMap[currentFile]
        //discover templates
        let templates: DropdownOption[] = []
        if(unitFile.division_template){
            unitFile.division_template.forEach(template => {
                templates.push({
                    label: template.name,
                    value: template.name,
                })
            })
        }
        let selectTemplate = (template: string): string => {
            //handle
            return template
        }
        console.log(unitFile)
        if(unitFile?.units?.division){
            unitFile.units.division.forEach(unit => {
                unitsWidget.push(<div className="card shadow m-3 p-3" style={{width: "24.5vh"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                        <span>Name: {unit.name ? unit.name : unit.division_name?.name_order}</span>
                        <span>Location: {unit.location}</span>
                        <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>Template: <GenericDropdown options={templates} onChange={selectTemplate} initialValue={unit.division_template}/></span>
                    </div>
                </div>)
            })
        }
    }

    return (
        <div className="w-100 h-100">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <GenericDropdown options={fileOptions} onChange={selectFile}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", overflow: "auto"}}>
                {unitsWidget}
            </div>
        </div>
    );
}

export default UnitEdit;
