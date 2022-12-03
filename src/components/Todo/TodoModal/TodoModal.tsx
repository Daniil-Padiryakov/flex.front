import './TodoModal.scss';
import React, {FC, useState} from "react";
import {createTodo} from "../../../store/reducers/ActionCreators";
import {ITodo} from "../../../domain/ITodo";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";
import TodoForm from "../TodoForm/TodoForm";

const TodoModal: FC<any> = ({setModal, todo}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const [newTodo, setNewTodo] = useState({title: ''});
    const {currentProjectId} = useAppSelector(state => state.todo)

    const handleCreateTodo = async (e: any) => {
        e.preventDefault();
        console.log('asdasda')
        // await dispatch(createTodo(
        //     {
        //         title: newTodo.title,
        //         parent_id: 0,
        //         project_id: currentProjectId,
        //         children: [] as ITodo[],
        //     } as ITodo));
        // setNewTodo({title: ''})
    }

    return (
        <div className="ProjectForm">
            <h4 className="ProjectForm__heading">{todo.title}</h4>

            <TodoForm />

            <div className="ProjectForm__btns">
                <button
                    onClick={() => setModal(false)}
                    className="ProjectForm__btn-close btn btn-secondary"
                    type="button">Close
                </button>
            </div>
        </div>
    )
}

export default TodoModal