import './TodoMenu.scss'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { ITodo } from '../../../../domain/ITodo'
import { deleteTodo } from '../../../../store/reducers/thunks/todo'
import { AppDispatch, useAppDispatch } from '../../../../store/store'
import { getTreeIds } from '../../../../utils/tree'
import { todoSlice } from '../../../../store/reducers/TodoSlice'
import ProjectList from '../../Project/ProjectList/ProjectList'

const TodoMenu: FC<any> = ({ todo }) => {
    const dispatch: AppDispatch = useAppDispatch()
    const { changeMenuVisible } = todoSlice.actions
    const menuRef = useRef() as MutableRefObject<HTMLDivElement>
    const [projectList, setProjectList] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!e.path.includes(menuRef.current)) {
                setProjectList(false)
                dispatch(changeMenuVisible(false))
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])
    const onDelete = (e: any, todo: ITodo) => {
        e.stopPropagation()
        const id = todo.id
        const idForDelete = getTreeIds(todo)
        dispatch(deleteTodo({ id, idForDelete }))
    }

    return (
        <div ref={menuRef} className='TodoMenu'>
            <ul className='TodoMenu__list'>
                <li className='TodoMenu__list-item' onClick={() => setProjectList(true)}>
                    Move to project
                </li>
                {projectList && <ProjectList />}
                <li onClick={(e) => onDelete(e, todo)} className='TodoMenu__list-item'>
                    Delete
                </li>
            </ul>
        </div>
    )
}

export default TodoMenu
