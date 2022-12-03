import './TodoForm.scss';
import {FC, useState} from "react";
import {ITodo} from "../../../domain/ITodo";
import {createTodo} from "../../../store/reducers/ActionCreators";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";

const TodoForm: FC<any> = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [newTodo, setNewTodo] = useState({title: ''});
    const {currentProjectId, currentTodo} = useAppSelector(state => state.todo)

    const handleCreateTodo = async (e: any) => {
        e.preventDefault();
        await dispatch(createTodo(
            {
                title: newTodo.title, 
                parent_id: currentTodo ? currentTodo.id : 0, 
                project_id: currentProjectId,
                children: [] as ITodo[],
            } as ITodo));
        setNewTodo({title: ''})
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