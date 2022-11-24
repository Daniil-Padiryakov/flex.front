import React, {useEffect, useState} from 'react';
import './App.scss';
import {fetchUsers} from "./store/reducers/ActionCreators";
import {AppDispatch, useAppDispatch, useAppSelector} from "./store/store";
import {IProject} from "./domain/IProject";
import {projectSlice} from "./store/reducers/ProjectSlice";
const App = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {projects, isLoading, error, currentProject} = useAppSelector(state => state.project)
    const {changeTodoIsDone, setCurrentProject} = projectSlice.actions;
    
    // const [newTodoTitle, setNewTodoTitle] = useState('');
    // const [currentProject, setCurrentProject] = useState(projects[0] as IProject);
    
    useEffect( () => {
             dispatch(fetchUsers())
    }, [])

    // const handlerAddNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //
    //     setProjects([...todos, {id: Date.now(), title: newTodoTitle, is_done: false, project_id: 1}])
    //     setNewTodoTitle('')
    // }

    
    return (
        <div className="App">
            <div className="sidebar">
                {isLoading && <h3>Loading</h3>}
                {error && <h3>{error}</h3>}
                {projects.map(project => (
                    <div 
                        onClick={() => dispatch(setCurrentProject(project))} 
                        className={'project__item'} 
                        key={project.id}
                    >
                        {project.title}
                    </div>    
                ))}
            </div>
            <div className="main">
                {/*<form>*/}
                {/*    <input onChange={(e) => setNewTodoTitle(e.target.value)}*/}
                {/*           value={newTodoTitle}*/}
                {/*           type="text"/>*/}
                {/*    <button onClick={(e) => handlerAddNewTodo(e)}>Add Todo</button>*/}
                {/*</form>*/}
                
                {currentProject && currentProject.todos.map(todo => (
                    <div className="Todo" key={todo.id}>
                     
                         <span className={todo.is_done ? "Todo__text_done" : "Todo__text"}
                               style={{marginRight: "10px"}}>
                             {todo.title}
                         </span>

                        <input onChange={() => dispatch(changeTodoIsDone(todo.id))}
                               checked={todo.is_done}
                               type="checkbox"
                               style={{marginRight: "10px"}}/>


                        <button>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )

};

export default App;
