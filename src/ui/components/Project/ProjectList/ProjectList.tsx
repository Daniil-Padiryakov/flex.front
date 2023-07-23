import './ProjectList.scss'
import React from 'react'
import { todoSlice } from '../../../../store/reducers/TodoSlice'
import { AppDispatch } from '../../../../store/store'
import { useGetProjectsQuery } from '../../../../services/ProjectService'
import { changeTodoProject } from '../../../../store/reducers/thunks/todo'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

const ProjectList = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { data: projects } = useGetProjectsQuery('')
    const { changeCurrentProjectId } = todoSlice.actions
    const { currentProjectId, currentTodo, todos } = useAppSelector((state) => state.todo)

    const onChangeTodoProject = (projectId: number) => {
        if (currentTodo?.parent_id !== 0) {
            let rootTodo
            let id = currentTodo?.parent_id

            for (let i = 0; i < todos.length; i++) {
                if (rootTodo && rootTodo.parent_id === 0) {
                    break
                }
                if (id === todos[i].id) {
                    rootTodo = todos[i]
                    id = rootTodo.parent_id
                }
            }

            console.log(rootTodo)
        }

        dispatch(
            changeTodoProject({
                id: currentTodo?.id,
                projectId,
            }),
        )
    }

    return (
        <ul className='ProjectList'>
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
