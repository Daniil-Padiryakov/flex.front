import './ReviewForm.scss'
import { FC } from 'react'
import TodoItem from '../../Todo/TodoItem/TodoItem'
import { useAppSelector } from '../../../../store/store'

const ReviewForm: FC<any> = ({ setModal }) => {
    const { todosOfCurrentProject } = useAppSelector((state) => state.todo)

    return (
        <div>
            {todosOfCurrentProject.map((task) => (
                <TodoItem todo={task} key={task.id} />
            ))}

            <button
                onClick={() => setModal(false)}
                className='ProjectForm__btn-close btn btn-secondary'
                type='button'
            >
                Close
            </button>
        </div>
    )
}

export default ReviewForm
