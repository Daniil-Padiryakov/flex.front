import './TodoItem.scss'
import React, { FC, useState } from 'react'
import { todoSlice } from '../../../../store/reducers/TodoSlice'
import { ITodo } from '../../../../domain/ITodo'
import { AppDispatch, useAppDispatch, useAppSelector } from '../../../../store/store'
import TodoMenu from '../TodoMenu/TodoMenu'
import menuIconSvg from '../../../assets/icons/menu-dots.svg'

interface TodoItemProps {
    todo: ITodo
    modal?: any
    setModal?: any
}

const TodoItem: FC<TodoItemProps> = ({ todo, setModal, modal }) => {
    const dispatch: AppDispatch = useAppDispatch()
    const { currentTodo, menu } = useAppSelector((state) => state.todo)
    const { changeTodoIsDone, changeCurrentTodo, changeMenuVisible } = todoSlice.actions
    const [menuIcon, setMenuIcon] = useState(false)

    const onClick = (e: any, todo: ITodo) => {
        e.stopPropagation()
        if (!modal && !menu) {
            setModal(true)
        }
        dispatch(changeCurrentTodo(todo))
    }

    const onMenu = (e: any) => {
        e.stopPropagation()
        dispatch(changeCurrentTodo(todo))
        dispatch(changeMenuVisible(true))
    }

    return (
        <div
            onClick={(e) => onClick(e, todo)}
            className={todo.parent_id ? 'TodoItem TodoItem__margin' : 'TodoItem'}
        >
            <div
                className='TodoItem__parent'
                key={todo.id}
                onMouseOver={() => setMenuIcon(true)}
                onMouseLeave={() => setMenuIcon(false)}
            >
                <input
                    onChange={() => dispatch(changeTodoIsDone(todo.id))}
                    checked={todo.is_done}
                    type='checkbox'
                    style={{ marginRight: '10px' }}
                />

                <span
                    className={todo.is_done ? 'Todo__text_done' : 'Todo__text'}
                    style={{ marginRight: '10px' }}
                >
                    {todo.title}
                </span>

                <span style={{ fontSize: '12px' }}>{todo.parent_title}</span>

                <span className='TodoItem__parent-menu' onClick={(e) => onMenu(e)}>
                    <img
                        className={
                            menuIcon
                                ? 'TodoItem__parent-menu-icon_active'
                                : 'TodoItem__parent-menu-icon'
                        }
                        src={menuIconSvg}
                        alt='menu'
                    />
                    {menu && currentTodo?.id === todo.id ? <TodoMenu todo={todo} /> : ''}
                </span>
            </div>
            {todo.children &&
                todo?.children.map((todo) => (
                    <TodoItem
                        setModal={() => setModal(true)}
                        modal={modal}
                        todo={todo}
                        key={todo.id}
                    />
                ))}
        </div>
    )
}

export default TodoItem
