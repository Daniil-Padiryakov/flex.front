import './TodoForm.scss';
import {FC, useState} from "react";
import {useCreateProjectMutation} from "../../../services/ProjectService";
import {ITodo} from "../../../domain/ITodo";

const TodoForm: FC<any> = ({setModal}) => {
    const [newTodo, setNewTodo] = useState({title: ''});
    const [createProject, {}] = useCreateProjectMutation();

    const handleCreateTodo = async (e: any) => {
        e.preventDefault();
        // await createProject({title: newTodo.title});
        setNewTodo({title: ''})
        setModal(false)
    }

    return (
        <form className="TodoForm">
            <input value={newTodo.title}
                   onChange={(e) => setNewTodo({title: e.target.value})}
                   className="TodoForm__input form-control"
                   type="text"
                   placeholder="New todo name"/>

            <div className="TodoForm__btns">
                <button
                    onClick={(e) => handleCreateTodo(e)}
                    className="ProjectForm__btn-add btn btn-success"
                    type="button">Add Todo
                </button>
            </div>
        </form>
    )
}

export default TodoForm