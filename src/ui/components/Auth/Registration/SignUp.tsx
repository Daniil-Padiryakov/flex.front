import React, { useState } from 'react'
import './registration-form.scss'
import { AppDispatch } from '../../../../store/store'
import { registration } from '../../../../store/reducers/thunks/auth'
import { useAppDispatch } from '../../../../store/hooks'

const Registration: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const validateForm = () => {
        return username.length > 0 && email.length > 0 && password.length > 0
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(registration({ username, email, password }))
    }

    return (
        <form className='registration' onSubmit={handleSubmit}>
            <label className='login-form__label'>
                <span className='login-form__label-text'>Username:</span>
                <input
                    className='login-form__input'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className='login-form__label'>
                <span className='login-form__label-text'>Email:</span>
                <input
                    className='login-form__input'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label className='login-form__label'>
                <span className='login-form__label-text'>Password:</span>
                <input
                    className='login-form__input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type='submit' className='registration__button'>
                Register
            </button>
        </form>
    )
}

export default Registration
