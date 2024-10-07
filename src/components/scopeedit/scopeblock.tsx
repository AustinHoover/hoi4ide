
import { Scope } from "../../interface/scope.interface";
import { Plus, TrashFill } from "react-bootstrap-icons";
import { effectDefinitions } from "../../pdxapi/effectDefinitions";
import { scopeDeclarations, SCOPE_TYPE } from "../../pdxapi/scopeDefinitions";
import { triggerDefinitions } from "../../pdxapi/triggerDefinitions";
import { ScopeableObject } from "../../interface/rawFile.interface";


/**
 * Props for the block component
 */
export interface ScopeBlockProps {

    /**
     * The scope for this block
     */
    scope: Scope,

    /**
     * The indent level of this block
     */
    indent: number,

    /**
     * Callback to call when adding an element
     */
    openModal: (scopeableObj: Scope) => void,

    /**
     * Callback to call when deleting an element
     */
    onDelete: () => void,

    /**
     * Callback to invoke when an edit has been made
     */
    onEdit: () => void,
}

/**
 * The allowed colors
 */
const blockColors: string[] = [
    "lightsalmon",
    "lightblue",
    "palegreen",
    "lemonchiffon",
]

/**
 * A single block in a scope editing view
 */
const ScopeBlock = (props: ScopeBlockProps) => {

    let content: JSX.Element[] = []
    let properties: JSX.Element[] = []
    let isObject: boolean = true
    if(props.scope.object){
        if(props.scope.object.scopes){
            let scopes: Scope[] = props.scope.object.scopes
            scopes.forEach((scope,i) => {
                if(scope.object){
                    const deleteCallback = () => {
                        props.scope.object.scopes = props.scope.object.scopes.filter((toFilter: Scope) => toFilter !== scope)
                        props.onEdit()
                    }
                    content.push(<ScopeBlock
                        key={'scope ' + i}
                        scope={scope}
                        indent={props.indent + 1}
                        openModal={props.openModal}
                        onDelete={deleteCallback}
                        onEdit={props.onEdit}
                    />)
                }
            })
        }
        let keys = Object.keys(props.scope.object)
        if(typeof(props.scope.object) === "object"){
            keys.forEach((key, i) => {
                if(key !== "effects" && key !== "triggers" && key !== "scopes" && key !== "properties" && props.scope.object[key]){
                    if(typeof(props.scope.object[key]) === "object") {
                        const deleteCallback = () => {
                            delete props.scope.object[key]
                            props.onEdit()
                        }
                        content.push(<ScopeBlock
                            key={'key' + i}
                            scope={{
                                name: key,
                                object: props.scope.object[key],
                                type: props.scope.type,
                            }}
                            indent={props.indent + 1}
                            openModal={props.openModal}
                            onDelete={deleteCallback}
                            onEdit={props.onEdit}
                        />)
                    } else {
                        properties.push(<div>
                            {key} - {props.scope.object[key] + ""}
                        </div>)
                    }
                }
            })
        } else {
            isObject = false
        }
    }

    const onDelete = () => {
        props.onDelete()
    }


    let logAllowedScopes = (scopeType: SCOPE_TYPE) => {
        console.log("====Allowed Scopes====")
        scopeDeclarations.forEach(declaration => {
            if(declaration.allowedScopes.includes(scopeType)){
                console.log(declaration.name)
            }
        })
        console.log("====Allowed Triggers====")
        triggerDefinitions.forEach(trigger => {
            if(trigger.allowedScopes.includes(scopeType)){
                console.log(trigger.name)
            }
        })
        console.log("====Allowed Effects====")
        effectDefinitions.forEach(effect => {
            if(effect.allowedScopes.includes(scopeType)){
                console.log(effect.name)
            }
        })
    }

    return <div 
    className="shadow d-flex flex-column align-items-start"
    style={{
        marginLeft: props.indent * 15 + "px",
        margin: "10px",
        padding: "10px",
        backgroundColor: blockColors[props.indent % 4],
        width: "95%",
    }}>
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
            <span>{props.scope.name}</span>
            {
                !isObject && <div style={{marginLeft: "50px", marginRight: "50px",}}>
                    {props.scope.object + ""}
                </div>
            }
            <button type="button" className="btn btn-danger" aria-label="Close" style={{margin: "5px", padding: "5px", backgroundColor: "#F00", opacity: 1,}} onClick={onDelete}>
                <TrashFill/>
            </button>
        </div>
        {properties}
        {content}
        {
            isObject &&
            <Plus
            role={"button"}
            style={{
                backgroundColor: "forestgreen",
                fontSize: "30px",
            }}
            onClick={()=>{
                props.openModal(props.scope)
                // logAllowedScopes(props.scope.type)
            }}
            />
        }
    </div>
}

export default ScopeBlock;