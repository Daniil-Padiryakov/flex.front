import React, { useState } from 'react'
import './login-form.scss'
import { login } from '../../../../store/reducers/thunks/auth'
import { AppDispatch, useAppDispatch } from '../../../../store/store'

const SignIn: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const [username, setUsername] = useState('Terrence')
    const [password, setPassword] = useState('123')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(login({ username, password }))
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
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
                <span className='login-form__label-text'>Password:</span>
                <input
                    className='login-form__input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button className='login-form__button' type='submit'>
                Login
            </button>
        </form>
    )
}

export default SignIn
