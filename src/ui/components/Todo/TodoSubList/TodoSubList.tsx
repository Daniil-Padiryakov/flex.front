import './TodoSubList.scss'
import React, { FC, useEffect } from 'react'
import { fetchTodos } from '../../../../store/reducers/thunks/todo'
import { AppDispatch } from '../../../../store/store'
import TodoItem from '../TodoItem/TodoItem'
import TodoForm from '../TodoForm/TodoForm'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

const TodoSubList: FC<any> = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { isLoading, currentProjectId } = useAppSelector((state) => state.todo)
    const todos = useAppSelector((state) => state.todo.todosOfCurrentProject)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])
    return (
        <div className='TodoContainer'>
            {isLoading && (
                <div className='spinner-border spinner-border-sm' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            )}
            {currentProjectId && todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
            <TodoForm />
        </div>
    )
}

export default TodoSubList
