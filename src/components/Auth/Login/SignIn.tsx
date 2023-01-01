import React, { useState } from 'react';
import './login-form.scss';
import {login} from "../../../store/reducers/thunks/auth";
import {AppDispatch, useAppDispatch} from "../../../store/store";

type LoginFormProps = {};

const SignIn: React.FC<LoginFormProps> = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [username, setUsername] = useState('Terrence');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({username, password}))
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-form__error">{error}</div>}
            <label className="login-form__label">
                <span className="login-form__label-text">Username:</span>
                <input
                    className="login-form__input"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label className="login-form__label">
                <span className="login-form__label-text">Password:</span>
                <input
                    className="login-form__input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button
                className="login-form__button"
                type="submit"
            >
                Login
            </button>
        </form>
    );
};

export default SignIn;
