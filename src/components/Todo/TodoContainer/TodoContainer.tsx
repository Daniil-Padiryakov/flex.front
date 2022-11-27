import './TodoContainer.scss';
import React, {useEffect, useState} from "react";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";
import {fetchTodos} from "../../../store/reducers/ActionCreators";
import TodoItem from "../TodoItem/TodoItem";
import TodoForm from "../TodoForm/TodoForm";

const TodoContainer = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {isLoading, currentProjectId} = useAppSelector(state => state.todo)
    const todos = useAppSelector(state => state.todo.todos
        .filter(todo => todo.project_id === currentProjectId))

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])
    return (
        <div className="TodoContainer">
            {isLoading && <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {currentProjectId && todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
            <TodoForm />
        </div>
    )
}

export default TodoContainer