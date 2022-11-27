import './TodoContainer.scss';
import React, {useEffect, useState} from "react";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../store/store";
import {fetchTodos} from "../../store/reducers/ActionCreators";
import TodoItem from "../TodoItem/TodoItem";
import MyModal from "../MyModal/MyModal";

const TodoContainer = () => {
    const [modal, setModal] = useState(false);
    const dispatch: AppDispatch = useAppDispatch();
    const {isLoading, currentProjectId} = useAppSelector(state => state.todo)
    const todos = useAppSelector(state => state.todo.todos
        .filter(todo => todo.project_id === currentProjectId))

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])
    return (
        <div className="TodoContainer">
            <MyModal isVisible={modal} setIsVisible={setModal}>
            </MyModal>
            {isLoading && <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {currentProjectId && todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </div>
    )
}

export default TodoContainer