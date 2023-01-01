import './Sidebar.scss'
import ProjectsContainer from '../Project/ProjectsContainer/ProjectsContainer'

const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <h4 className='Sidebar__heading'>Projects</h4>
            <ProjectsContainer />
        </div>
    )
}

export default Sidebar
