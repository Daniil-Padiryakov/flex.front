import './MyModal.scss'
import { FC } from 'react'

interface MyModalProps {
    children: any
    isVisible: boolean
    setIsVisible: any
}

const MyModal: FC<MyModalProps> = ({ children, isVisible, setIsVisible }) => {
    return (
        <div className={isVisible ? 'MyModal MyModal__active' : 'MyModal'}>
            <div className='MyModal__content'>{children}</div>
        </div>
    )
}

export default MyModal
