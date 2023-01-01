import './Auth.scss'
import { useState } from 'react'
import SignUp from '../../components/Auth/Registration/SignUp'
import SignIn from '../../components/Auth/Login/SignIn'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false)

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp)
    }

    return (
        <div className='Auth'>
            {isSignUp ? <SignUp /> : <SignIn />}

            {isSignUp ? (
                <span>
                    Already signed up?
                    <span onClick={toggleSignUp}> Go to login</span>
                </span>
            ) : (
                <span>
                    Don’t have an account?
                    <span onClick={toggleSignUp}> Sign up</span>
                </span>
            )}
        </div>
    )
}

export default Auth
