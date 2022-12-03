import './TodoItem.scss';
import React, {FC} from "react";
import {todoSlice} from "../../../store/reducers/TodoSlice";
import {ITodo} from "../../../domain/ITodo";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {deleteTodo} from "../../../store/reducers/ActionCreators";
import {getNodeTreeById, getTreeIds} from "../../../utils/tree";

interface TodoItemProps {
    todo: ITodo;
    setModal: any;
}



const TodoItem: FC<TodoItemProps> = ({todo, setModal}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const {changeTodoIsDone, changeCurrentTodo} = todoSlice.actions;
    
    const onClick = (e: any, todo: ITodo) => {
        e.stopPropagation()
        setModal(true)
        dispatch(changeCurrentTodo(todo))
    }

    const onDelete = (e: any, todo: ITodo) => {
        e.stopPropagation()
        const id = todo.id;
        const idForDelete = getTreeIds(todo);
        dispatch(deleteTodo({id, idForDelete,}))
    }
    
    return (
        <div onClick={(e) => onClick(e, todo)} className="TodoItem" style={{marginLeft: `${2 * 10}px`}}>
            <div className="TodoItem__parent" key={todo.id}>
                    <input onChange={() => dispatch(changeTodoIsDone(todo.id))}
                           checked={todo.is_done}
                           type="checkbox"
                           style={{marginRight: "10px"}}/>

                    <span className={todo.is_done ? "Todo__text_done" : "Todo__text"}
                          style={{marginRight: "10px"}}>
                             {todo.title}
            </span>

                    <span onClick={(e) => onDelete(e, todo)} 
                          className="TodoItem__delete">Delete
                    </span>
            </div>
            {todo.children && todo?.children.map(todo => (
                <TodoItem setModal={() => setModal(true)} todo={todo} key={todo.id}/>
            ))}
        </div>
    )
}

export default TodoItem