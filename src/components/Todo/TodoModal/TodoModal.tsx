import './TodoModal.scss';
import {FC, useState} from "react";
import {createTodo} from "../../../store/reducers/ActionCreators";
import {ITodo} from "../../../domain/ITodo";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";

const TodoModal: FC<any> = ({setModal}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const [newTodo, setNewTodo] = useState({title: ''});
    const {currentProjectId} = useAppSelector(state => state.todo)

    const handleCreateTodo = async (e: any) => {
        e.preventDefault();
        await dispatch(createTodo(
            {
                title: newTodo.title,
                parent_id: 0,
                project_id: currentProjectId,
                children: [] as ITodo[],
            } as ITodo));
        setNewTodo({title: ''})
    }

    return (
        <form className="ProjectForm">
            <h4 className="ProjectForm__heading">Add project</h4>

            <input value={newTodo.title}
                   onChange={(e) => setNewTodo({title: e.target.value})}
                   className="ProjectForm__input form-control"
                   type="text"
                   placeholder="New project name"/>

            <div className="ProjectForm__btns">
                <button
                    onClick={() => setModal(false)}
                    className="ProjectForm__btn-close btn btn-secondary"
                    type="button">Close
                </button>
                <button
                    onClick={(e) => handleCreateTodo(e)}
                    className="ProjectForm__btn-add btn btn-success"
                    type="button">Add
                </button>
            </div>
        </form>
    )
}

export default TodoModal