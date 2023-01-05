import './Header.scss'
import { Link } from 'react-router-dom'
import Review from '../Review/Review'
import { useState } from 'react'

const Header = () => {
    const [modal, setModal] = useState(false)

    return (
        <header className='Header'>
            <nav>
                <Link to='/'>Home</Link> | {''}
                <Link to='/auth'>Auth</Link> | {''}
                <Review modal={modal} setModal={setModal} />
            </nav>
        </header>
    )
}

export default Header
