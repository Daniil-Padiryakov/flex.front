import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='Header'>
            <nav>
                <Link to='/'>Home</Link> | {''}
                <Link to='/auth'>Auth</Link>
            </nav>
        </header>
    )
}

export default Header
