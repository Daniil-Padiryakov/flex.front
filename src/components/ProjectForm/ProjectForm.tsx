import './ProjectForm.scss';
import {FC, useState} from "react";
import {useCreateProjectMutation} from "../../services/ProjectService";
import {IProject} from "../../domain/IProject";

const ProjectForm: FC<any> = ({setModal}) => {
    const [newProject, setNewProject] = useState({title: ''});
    const [createProject, {}] = useCreateProjectMutation();

    const handleCreateProject = async (e: any) => {
        e.preventDefault();
        await createProject({title: newProject.title} as IProject);
        setNewProject({title: ''})
        setModal(false)
    }

    return (
        <form className="ProjectForm">
            <h4 className="ProjectForm__heading">Add project</h4>

            <input value={newProject.title}
                   onChange={(e) => setNewProject({title: e.target.value})}
                   className="ProjectForm__input form-control"
                   type="text"
                   placeholder="New project name"/>

            <div className="ProjectForm__btns">
                <button
                    onClick={() => setModal(false)}
                    className="ProjectForm__btn-close btn btn-secondary"
                    type="button">Close
                </button>
                <button
                    onClick={(e) => handleCreateProject(e)}
                    className="ProjectForm__btn-add btn btn-success"
                    type="button">Add
                </button>
            </div>
        </form>
    )
}

export default ProjectForm