import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.form?.pathname || '/';

    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }

    const handlePasswordBlur = event => {
        setPassword(event.target.value)
    }

    const handleUserSingIn = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    if(user){
        navigate(from, {replace : true});
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleUserSingIn}>
                    <div className="input-group">
                        <label htmlFor="email">Email :  </label>
                        <input onBlur={handleEmailBlur} type="email" name="email" id="" required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Password :  </label>
                        <input onBlur={handlePasswordBlur} type="password" name="password" id="" required/>
                    </div>
                    <p>{error?.message}</p>
                    <input className='form-submit' type="submit" value="Login" />
                </form>
                <p>New to ema-jhon? <Link className='form-link' to='/signup'>Create an account.</Link></p>
            </div>
        </div>
    );
};

export default Login;