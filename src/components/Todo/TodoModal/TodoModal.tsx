import './TodoModal.scss';
import React, {FC} from "react";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

const TodoModal: FC<any> = ({setModal, todo, modal}) => {
    return (
        <div className="ProjectForm">
            <h4 className="ProjectForm__heading">{todo.title}</h4>

            {
                todo.children.map((todo: any) => (
                    <TodoItem modal={modal} todo={todo} key={todo.id} />
                ))
            }

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