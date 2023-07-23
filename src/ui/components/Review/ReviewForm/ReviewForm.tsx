import './ReviewForm.scss'
import { FC } from 'react'
import ReviewItem from '../ReviewItem/ReviewItem'
import { useAppSelector } from '../../../../store/hooks'

const ReviewForm: FC<any> = ({ setModal }) => {
    const { todosOfCurrentProject } = useAppSelector((state) => state.todo)

    return (
        <div className='ReviewForm'>
            <ReviewItem />

            <button
                onClick={() => setModal(false)}
                className='ReviewForm__btn-close btn btn-secondary'
                type='button'
            >
                Close
            </button>
        </div>
    )
}

export default ReviewForm
