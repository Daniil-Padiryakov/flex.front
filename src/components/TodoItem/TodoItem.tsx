import './TodoItem.scss';
import React, {FC} from "react";
import {todoSlice} from "../../store/reducers/TodoSlice";
import {ITodo} from "../../domain/ITodo";
import {AppDispatch, useAppDispatch} from "../../store/store";

interface TodoItemProps {
    todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const {changeTodoIsDone} = todoSlice.actions;
    // className={todo.children.length !== 0 ? 'TodoItem' : 'TodoItem__child'}
    return (
        <div style={{marginLeft: `${7 * 10}px`}} key={todo.id}>
            <div >
                <input onChange={() => dispatch(changeTodoIsDone(todo.id))}
                       checked={todo.is_done}
                       type="checkbox"
                       style={{marginRight: "10px"}}/>

                <span className={todo.is_done ? "Todo__text_done" : "Todo__text"}
                      style={{marginRight: "10px"}}>
                             {todo.title}
            </span>

                <button className="btn btn-danger" type={"button"}>Delete</button>
            </div>
            <div>
                {todo.children.map(todo => (
                    <TodoItem todo={todo} key={todo.id} />
                ))}
            </div>
        </div>
    )
}

export default TodoItem