import './ReviewItem.scss'
import React, { FC } from 'react'

const ReviewItem: FC<any> = () => {
    return (
        <div className='ReviewItem'>
            <div className='ReviewItem__body'>
                <input type='checkbox' style={{ marginRight: '10px' }} />
                <h3 className='ReviewItem__body-text'>todo text</h3>
            </div>

            <div className='ReviewItem__btns'>
                <button type='button' className='btn btn-primary'>
                    Move to Project
                </button>
                <button type='button' className='btn btn-primary'>
                    Do smth
                </button>
                <button className='btn btn-danger'>Delete</button>
            </div>
        </div>
    )
}

export default ReviewItem
