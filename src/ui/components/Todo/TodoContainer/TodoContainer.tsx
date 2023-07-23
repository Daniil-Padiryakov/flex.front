import './TodoContainer.scss'
import React, { useEffect, useState } from 'react'
import { AppDispatch } from '../../../../store/store'
import { fetchTodos } from '../../../../store/reducers/thunks/todo'
import TodoItem from '../TodoItem/TodoItem'
import TodoForm from '../TodoForm/TodoForm'
import MyModal from '../../MyModal/MyModal'
import TodoModal from '../TodoModal/TodoModal'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

const TodoContainer = () => {
    const [modal, setModal] = useState(false)
    const dispatch: AppDispatch = useAppDispatch()
    const { currentProjectId, currentTodo } = useAppSelector((state) => state.todo)
    const todos = useAppSelector((state) => state.todo.todosOfCurrentProject)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])
    return (
        <div className='TodoContainer'>
            {currentTodo && (
                <MyModal isVisible={modal} setIsVisible={setModal}>
                    <TodoModal setModal={setModal} modal={modal} todo={currentTodo} />
                </MyModal>
            )}

            {currentProjectId &&
                todos.map((todo) => (
                    <TodoItem setModal={setModal} modal={modal} todo={todo} key={todo.id} />
                ))}
            <TodoForm />
        </div>
    )
}

export default TodoContainer
