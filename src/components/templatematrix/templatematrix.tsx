import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CharacterProperties, DivisionTemplate, UnitHistoryFile } from "../../interface/rawFile.interface";
import { createActionOpenCharacter, createActionOpenCountry, createActionOpenState } from "../../state/mainState.actions";
import { AppContextInterface, Character, Country } from "../../state/mainState.interface";
import GenericDropdown, { loseFocusContainer } from "../dropdowngeneric/dropdowngeneric";
import ImageDisplay from "../imagedisplay/imagedisplay";

import "./templatematrix.css"

export interface TemplateMatrixProps {
    unitFile: UnitHistoryFile,
    template: DivisionTemplate,
}

const getEmptyGrid = () => {
    return [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],]
}

const setTemplateAtPosition = (current: string[][],setter: React.Dispatch<React.SetStateAction<string[][]>>, x: number, y: number, type: string) => {
    let newGrid = [...current]
    newGrid[x][y] = type
    setter(newGrid)
}

const TemplateMatrix = (props: TemplateMatrixProps) => {

    const navigate = useNavigate()

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    let [templateGrid, setTemplateGrid] = React.useState(getEmptyGrid())

    React.useEffect(()=>{
        if(props?.template?.regiments){
            let regimentTypes = Object.keys(props.template.regiments)
            regimentTypes.forEach((regimentType: any) => {
                let regimentsForType = props.template.regiments[regimentType]
                if(regimentsForType.constructor === Array){
                    regimentsForType.forEach((regiment: any) => {
                        //+1 to x because real regiments are the right 5 most columns, not zero indexed in other words
                        setTemplateAtPosition(templateGrid,setTemplateGrid,regiment.x + 1,regiment.y,regimentType)
                    })
                } else {
                    setTemplateAtPosition(templateGrid,setTemplateGrid,regimentsForType.x + 1,regimentsForType.y,regimentType)
                }
            })
        }
        if(props?.template?.support){
            let supportTypes = Object.keys(props.template.support)
            supportTypes.forEach((supportType: any) => {
                let supportForType = props.template.support[supportType]
                setTemplateAtPosition(templateGrid,setTemplateGrid,supportForType.x,supportForType.y,"sup_" + supportType)
            })
        }
    },[])

    let columns: JSX.Element[] = []
    templateGrid.forEach((column,x) => {
        let columnToRender: JSX.Element[] = []
        column.forEach((regiment,y)=>{
            if(regiment === ""){
                columnToRender.push(<div 
                    key={x + "-" + y}
                    style={{margin: "0px", paddingLeft: "76px", paddingBottom: "42px", border: "solid", borderWidth: "1px", borderColor: "#111111",}}>
                </div>)
            } else {
                //@ts-ignore
                let mapLookup: string = iconCodeMap[regiment]
                let regimentType: string = regiment ? mapLookup : ""
                columnToRender.push(<div 
                    key={x + "-" + y}
                    style={{margin: "0px", border: "solid", borderWidth: "1px", borderColor: "#111111",}}>
                    <ImageDisplay width={76} height={42} relativeSourcePath={regimentType}/>
                </div>)
            }
        })
        columns.push(<div style={{display: "flex", flexDirection: "column"}}>
            {columnToRender}
        </div>)
    })

    return (
        <div className="w-100 h-100 card shadow m-3 p-3">
            {props.template.name}
            <div style={{display: "flex", flexDirection: "row"}}>
                {columns}
            </div>
        </div>
    );
}

//TODO: replace with lookups in project for unit icons
//but that's wayyyyy down the road
const iconCodeMap = {
    //inf
    infantry: "/res/icons/template/Infantry.png",
    marine: "/res/icons/template/Marine.png",
    paratrooper: "/res/icons/template/Paratroop.png",
    mountaineers: "/res/icons/template/Mountaineers.png",
    //mobile
    cavalry: "/res/icons/template/Cavalry.png",
    motorized: "/res/icons/template/Motorized.png",
    mechanized: "/res/icons/template/Mechanized.png",
    //motorized
    mot_artillery_brigade: "/res/icons/template/Motorized_artillery.png",
    //arty
    anti_air_brigade: "/res/icons/template/Anti-air.png",
    anti_tank_brigade: "/res/icons/template/Anti-tank.png",
    artillery: "/res/icons/template/Artillery.png",
    rockey_artillery_brigade: "/res/icons/template/Rocket_artillery.png",
    motorized_rocket_brigade: "/res/icons/template/Motorized_rocket_artillery.png",
    //attachments
    sup_engineer: "/res/icons/template/Engineer.png",
    sup_field_hospital: "/res/icons/template/Field_hospital.png",
    sup_logistics_company: "/res/icons/template/Logistics_company.png",
    sup_maintenance_company: "/res/icons/template/Maintenance_company.png",
    sup_military_police: "/res/icons/template/Military_Police.png",
    sup_recon: "/res/icons/template/Recon.png",
    sup_mot_recon: "/res/icons/template/Motorized_Recon.png",
    sup_signal_company: "/res/icons/template/Signal_company.png",
    sup_anti_air: "/res/icons/template/Support_anti-air.png",
    sup_anti_tank: "/res/icons/template/Support_anti-tank.png",
    sup_artillery: "/res/icons/template/Support_artillery.png",
    sup_rocket_artillery: "/res/icons/template/Support_rocket_artillery.png",
    //armor
    //light
    light_armor: "/res/icons/template/Light_tank.png",
    light_sp_artillery_brigade: "/res/icons/template/Light_tank_artillery.png",
    light_tank_destroyer_brigade: "/res/icons/template/Light_tank_anti-tank.png",
    light_sp_anti_air_brigade: "/res/icons/template/Light_tank_anti-air.png",
    //medium
    medium_armor: "/res/icons/template/Medium_tank.png",
    medium_sp_arty: "/res/icons/template/Medium_tank_artillery.png",
    medium_tank_destroyer_brigade: "/res/icons/template/Medium_tank_anti-tank.png",
    medium_sp_anti_air_brigade: "/res/icons/template/Medium_tank_anti-air.png",
    //heavy
    heavy_armor: "/res/icons/template/Heavy_tank.png",
    heavy_sp_artillery_brigade: "/res/icons/template/Heavy_tank_artillery.png",
    heavy_tank_destroyer_brigade: "/res/icons/template/Heavy_tank_anti-tank.png",
    heavy_sp_anti_air_brigade: "/res/icons/template/Heavy_tank_anti-air.png",
    //super heavy
    super_heavy_armor: "/res/icons/template/Super_heavy_tank.png",
    super_heavy_sp_artillery_brigade: "/res/icons/template/Super_heavy_tank_artillery.png",
    super_heavy_tank_destroyer_brigade: "/res/icons/template/Super_heavy_tank_anti-tank.png",
    super_heavy_sp_anti_air_brigade: "/res/icons/template/Super_heavy_tank_anti-air.png",
    //modern
    modern_armor: "/res/icons/template/Modern_tank.png",
    modern_sp_artillery_brigade: "/res/icons/template/Modern_tank_artillery.png",
    modern_tank_destroyer_brigade: "/res/icons/template/Modern_tank_anti-tank",
    modern_sp_anti_air_brigade: "/res/icons/template/Modern_tank_anti-air.png",
}

export default TemplateMatrix;
