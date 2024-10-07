import * as React from "react";
import { AppContext } from "../../App";
import Navbar from "../../components/navbar/navbar";
import { AppContextInterface, AppState } from "../../state/mainState.interface";
import { createActionEditState, createActionOpenCharacter } from "../../state/mainState.actions";

/**
 * Page for editing project-wide data
 */
const Project = () => {

    const context: AppContextInterface = React.useContext(AppContext);
    const state = context.state
    const dispatch = context.dispatch

    const [edited,setEdited] = React.useState<boolean>(false)
    const [replacePaths, setReplacePaths] = React.useState<string[]>(state.projectDetails.projectFiles.overrideFile.overridePaths)

    const onEditPaths = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const data: string[] = event.target.value.split("\n")
        setReplacePaths(data)
        setEdited(true)
    }

    const onSave = () => {
        const editedState: AppState = {
            ...state,
        }
        editedState.projectDetails.projectFiles.overrideFile.overridePaths = replacePaths
        dispatch(createActionEditState(editedState))
        setEdited(false)
    }

    return (
        <div className="h-100">
            <Navbar/>
            <div className="container p-0 m-0 h-100">
                <div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column">
                    <div>
                        Project config
                    </div>
                    <div>
                        Path Overrides:
                    </div>
                    <textarea
                        value={replacePaths.join("\n")}
                        onChange={onEditPaths}
                        className="form-control"
                    ></textarea>
                    <button
                    className="btn btn-success"
                    disabled={!edited}
                    onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Project;
