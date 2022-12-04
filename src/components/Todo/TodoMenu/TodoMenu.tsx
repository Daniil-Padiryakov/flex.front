import './TodoMenu.scss';
import {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {ITodo} from "../../../domain/ITodo";
import {createTodo, deleteTodo} from "../../../store/reducers/ActionCreators";
import {AppDispatch, useAppDispatch, useAppSelector} from "../../../store/store";
import {getTreeIds} from "../../../utils/tree";
import {todoSlice} from "../../../store/reducers/TodoSlice";

const TodoMenu: FC<any> = ({todo}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const {changeMenuVisible} = todoSlice.actions;
    const menuRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const handleClickOutside = (e: any) => {
          if (!e.path.includes(menuRef.current)) {
              dispatch(changeMenuVisible(false));
          }
        }
        
        document.body.addEventListener('click', handleClickOutside);
        
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        }
    }, [])
    const onDelete = (e: any, todo: ITodo) => {
        e.stopPropagation()
        const id = todo.id;
        const idForDelete = getTreeIds(todo);
        dispatch(deleteTodo({id, idForDelete,}))
    }

    console.log(todo)
    
    return (
        <div ref={menuRef} className="TodoMenu">
            <ul className="TodoMenu__list">
                <li className="TodoMenu__list-item">Move to project</li>
                <li onClick={(e) => onDelete(e, todo)} 
                    className="TodoMenu__list-item">Delete
                </li>
            </ul>
        </div>
    )
}

export default TodoMenu