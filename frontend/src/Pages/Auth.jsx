import React, { useState } from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';
import './auth.css'

export default function AuthToggle() {
    const [newuser, setNewUser] = useState(false);

    return (
        <>
            {newuser ? <Login /> : <Register />}
            <button onClick={() => setNewUser(!newuser)} className='btn01'>
                {newuser ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </>
    );
}
