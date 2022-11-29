import './TodoItem.scss';
import React, {FC} from "react";
import {todoSlice} from "../../../store/reducers/TodoSlice";
import {ITodo} from "../../../domain/ITodo";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {debug} from "util";
import {deleteTodo} from "../../../store/reducers/ActionCreators";

interface TodoItemProps {
    todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const {changeTodoIsDone} = todoSlice.actions;
    
    return (
        <div className="TodoItem" style={{marginLeft: `${5 * 10}px`}}>
            <div className="TodoItem__parent" key={todo.id}>
                    <input onChange={() => dispatch(changeTodoIsDone(todo.id))}
                           checked={todo.is_done}
                           type="checkbox"
                           style={{marginRight: "10px"}}/>

                    <span className={todo.is_done ? "Todo__text_done" : "Todo__text"}
                          style={{marginRight: "10px"}}>
                             {todo.title}
            </span>

                    <span onClick={() => dispatch(deleteTodo(todo.id))} 
                          className="TodoItem__delete">Delete
                    </span>
            </div>
            {todo.children && todo?.children.map(todo => (
                <TodoItem todo={todo} key={todo.id}/>
            ))}
        </div>

    )
}

export default TodoItem