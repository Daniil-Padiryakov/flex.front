import './ProjectsContainer.scss';
import {projectApi} from "../../services/ProjectService";
import React, {useEffect} from "react";
import {todoSlice} from "../../store/reducers/TodoSlice";
import {AppDispatch, useAppDispatch} from "../../store/store";

const ProjectsContainer = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const useFetchAllProjects = projectApi.endpoints.fetchAllProjects.useQuery
    const {data: projects, isLoading} = useFetchAllProjects('')
    const {changeCurrentProjectId} = todoSlice.actions;
    
    useEffect(() => {
        if (projects) {
            dispatch(changeCurrentProjectId(projects[0].id));
        }
    }, [])
    
    if (isLoading) return <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    if (!projects) return <div>Missing projects!</div>
    return (
        <div className="ProjectsContainer">
            <ul>
                {projects.map((project: any) => (
                    <div
                        onClick={() => dispatch(changeCurrentProjectId(project.id))}
                        className={'project__item'}
                        key={project.id}
                    >
                        {project.title}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ProjectsContainer