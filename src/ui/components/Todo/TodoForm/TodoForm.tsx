import './TodoForm.scss'
import { FC, useState } from 'react'
import { ITodo } from '../../../../domain/ITodo'
import { createTodo } from '../../../../store/reducers/thunks/todo'
import { AppDispatch } from '../../../../store/store'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

const TodoForm: FC<any> = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const [newTodo, setNewTodo] = useState({ title: '' })
    const { currentProjectId, currentTodo } = useAppSelector((state) => state.todo)
    const { user } = useAppSelector((state) => state.auth)

    const handleCreateTodo = async (e: any) => {
        e.preventDefault()
        await dispatch(
            createTodo({
                title: newTodo.title,
                parent_id: currentTodo ? currentTodo.id : 0,
                project_id: currentProjectId,
                children: [] as ITodo[],
                user_id: user?.id,
            } as ITodo),
        )
        setNewTodo({ title: '' })
    }

    return (
        <form className='TodoForm'>
            <input
                value={newTodo.title}
                onChange={(e) => setNewTodo({ title: e.target.value })}
                className='TodoForm__input form-control'
                type='text'
                placeholder='New todo name'
            />

            <button
                onClick={(e) => handleCreateTodo(e)}
                className='TodoForm__btn btn btn-success'
                type='button'
            >
                Add Todo
            </button>
        </form>
    )
}

export default TodoForm
