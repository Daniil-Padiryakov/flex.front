import './ProjectList.scss';
import React, {useEffect, useState} from "react";
import {todoSlice} from "../../../store/reducers/TodoSlice";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";
import {useGetProjectsQuery} from '../../../services/ProjectService'
import {changeTodoProject} from "../../../store/reducers/ActionCreators";

const ProjectList = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {data: projects} = useGetProjectsQuery('')
    const {changeCurrentProjectId} = todoSlice.actions;
    const {currentProjectId, currentTodo} = useAppSelector(state => state.todo)

    const onChangeTodoProject = (projectId: number) => {
        dispatch(changeTodoProject({
            id: currentTodo?.id,
            projectId,
        }))
    }
    
    return (
            <ul className="ProjectList">
                {projects.map((project: any) => (
                    <div
                        onClick={() => onChangeTodoProject(project.id)}
                        className={'ProjectList__item'}
                        key={project.id}
                    >
                        {project.title}
                        {currentProjectId === project.id && <span>---</span>}
                    </div>
                ))}
            </ul>
    )
}

export default ProjectList