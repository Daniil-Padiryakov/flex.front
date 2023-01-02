import './Review.scss'
import MyModal from '../MyModal/MyModal'
import { FC } from 'react'
import ReviewForm from './ReviewForm/ReviewForm'

const Review: FC<any> = ({ modal, setModal }) => {
    return (
        <span className='Review'>
            <span onClick={() => setModal(true)}>Start Review</span>

            <MyModal isVisible={modal} setIsVisible={setModal}>
                <ReviewForm setModal={setModal} />
            </MyModal>
        </span>
    )
}

export default Review
