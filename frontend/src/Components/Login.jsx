import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Login successful:', response.data);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials or server error');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/google', {
                id_token: credentialResponse.credential,
            });
            console.log('Google login successful:', response.data);
            navigate('/dashboard');
        } catch (err) {
            console.error('Google login error:', err);
            setError('Google login failed');
        }
    };

    const handleGoogleFailure = () => {
        setError('Google login failed');
    };

    const handleGitHubLogin = () => {
        const clientId = 'Ov23liDFUtG3tMvKP37I';
        const redirectUri = 'http://localhost:5000/auth/github/callback';
        const scope = 'read:user,user:email';

        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        {error && <div className="error-message">{error}</div>}
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input 
                                type="text" 
                                className="login__input" 
                                placeholder="User name / Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input 
                                type="password" 
                                className="login__input" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>   

                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            style={{ margin: '10px 0' }}
                        />
                        
                        <button type="button" className="button login__submit" onClick={handleGitHubLogin}>
                            Sign in with GitHub
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>		
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>
    );
}
