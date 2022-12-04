import './TodoSubList.scss';
import React, {FC, useEffect, useState} from "react";
import {ITodo} from "../../../domain/ITodo";
import {createTodo, fetchTodos} from "../../../store/reducers/ActionCreators";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";
import MyModal from "../../MyModal/MyModal";
import TodoModal from "../TodoModal/TodoModal";
import TodoItem from "../TodoItem/TodoItem";
import TodoForm from "../TodoForm/TodoForm";

const TodoSubList: FC<any> = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {isLoading, currentProjectId, currentTodo} = useAppSelector(state => state.todo)
    const todos = useAppSelector(state => state.todo.todosOfCurrentProject)

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

export default TodoSubList