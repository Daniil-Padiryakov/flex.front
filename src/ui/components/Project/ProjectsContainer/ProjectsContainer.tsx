import './ProjectsContainer.scss'
import React, { useEffect, useState } from 'react'
import { todoSlice } from '../../../../store/reducers/TodoSlice'
import { AppDispatch } from '../../../../store/store'
import MyModal from '../../MyModal/MyModal'
import ProjectForm from '../ProjectForm/ProjectForm'
import { useGetProjectsQuery } from '../../../../services/ProjectService'
import { IProject } from '../../../../domain/IProject'
import { useAppDispatch } from '../../../../store/hooks'

const ProjectsContainer = () => {
    const [modal, setModal] = useState(false)
    const dispatch: AppDispatch = useAppDispatch()
    const { data: projects, isLoading } = useGetProjectsQuery('')
    const { changeCurrentProjectId } = todoSlice.actions

    useEffect(() => {
        if (projects) {
            dispatch(changeCurrentProjectId(projects[0]?.id))
        }
    }, [projects])

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
            <div className='ProjectsContainer__header'>
                <h4>Projects</h4>
                <button
                    onClick={() => setModal(true)}
                    className='btn btn-success'
                    type='button'
                    style={{ marginBottom: '16px' }}
                >
                    Add project
                </button>
            </div>

            <MyModal isVisible={modal} setIsVisible={setModal}>
                <ProjectForm setModal={setModal} />
            </MyModal>
            <ul>
                {projects.map((project: IProject) => (
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
