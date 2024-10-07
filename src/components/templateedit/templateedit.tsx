import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties, UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import GenericDropdown from "../dropdowngeneric/dropdowngeneric";
import TemplateMatrix from "../templatematrix/templatematrix";

import "./templateedit.css"

export interface TemplateEditProps {
    unitFiles: UnitHistoryFile[],
}

const TemplateEdit = (props: TemplateEditProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [currentFile, setCurrentFile] = React.useState("")

    let fileOptions: string[] = []

    let fileMap: any = {}
    props.unitFiles.forEach((unitFile) => {
        // console.log(unitFile.path)
        let regex = unitFile.path.match(/^.*[\\\/]([^\/\\]*)\.[^\/\\]*$/)
        if(regex){
            let fileName = regex[1]
            fileOptions.push(fileName)
            fileMap[fileName] = unitFile
        }
    })

    let selectFile = (file: string): string => {
        setCurrentFile(file)
        return file
    }
    let templateMatrixCards: JSX.Element[] = []

    if(currentFile !== "" && fileMap[currentFile]){
        let unitFile: UnitHistoryFile = fileMap[currentFile]
        if(unitFile?.division_template){
            unitFile.division_template.forEach(template => {
                templateMatrixCards.push(<div className="m-3" style={{width: "49.5vh"}}>
                    <TemplateMatrix unitFile={unitFile} template={template}/>
                </div>)
            })
        }
    }

    return (
        <div className="w-100 h-100">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <GenericDropdown options={fileOptions} onSelect={selectFile}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {templateMatrixCards}
            </div>
        </div>
    );
}

export default TemplateEdit;
