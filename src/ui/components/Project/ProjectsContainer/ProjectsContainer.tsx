import './ProjectsContainer.scss'
import React, { useEffect, useState } from 'react'
import { todoSlice } from '../../../../store/reducers/TodoSlice'
import { AppDispatch, useAppDispatch } from '../../../../store/store'
import MyModal from '../../MyModal/MyModal'
import ProjectForm from '../ProjectForm/ProjectForm'
import { useGetProjectsQuery } from '../../../../services/ProjectService'

const ProjectsContainer = () => {
    const [modal, setModal] = useState(false)
    const dispatch: AppDispatch = useAppDispatch()
    const { data: projects, isLoading } = useGetProjectsQuery('')
    const { changeCurrentProjectId } = todoSlice.actions

    useEffect(() => {
        console.log(JSON.stringify(projects))
        if (projects) {
            dispatch(changeCurrentProjectId(projects[0]?.id))
        }
    }, [])

    if (isLoading)
        return (
            <div className='spinner-border spinner-border-sm' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        )
    if (!projects)
        return (
            <div>
                Missing projects!
                <button onClick={() => setModal(true)} className='btn btn-success' type='button'>
                    Add project
                </button>
                <MyModal isVisible={modal} setIsVisible={setModal}>
                    <ProjectForm setModal={setModal} />
                </MyModal>
            </div>
        )
    return (
        <div className='ProjectsContainer'>
            <button onClick={() => setModal(true)} className='btn btn-success' type='button'>
                Add project
            </button>
            <MyModal isVisible={modal} setIsVisible={setModal}>
                <ProjectForm setModal={setModal} />
            </MyModal>
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