import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUser, setNewUser] = useState(false); // Changed to true for initial state
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        const userData = { username, email, password };

        try {
            let response;
            if (newUser) {
                // Registration
                response = await axios.post('http://localhost:5000/api/auth/register', userData);
                setSuccessMessage('Registration successful! Please log in.');
                setEmail('');
                setUsername('');
                setPassword('');
                navigate('/dashboard');
            } else {
                response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                setSuccessMessage('Login successful! Redirecting...');
                setEmail('');
                setPassword('');
                navigate('/dashboard'); // Redirect to dashboard or wherever appropriate
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const responseGoogle = (response) => {
        console.log('Google login success:', response);
        // Handle Google login success (similar to previous examples)
    };

    const responseGithub = (response) => {
        console.log('GitHub login success:', response);
        // Handle GitHub login success (similar to previous examples)
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <h3>{newUser ? 'Signup' : 'Login'}</h3>

                        {newUser && (
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input 
                                    type="text" 
                                    className="login__input" 
                                    placeholder="Username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input 
                                type="email" 
                                className="login__input" 
                                placeholder="Email" 
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

                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <button type="submit" className="button login__submit" disabled={loading}>
                            <span className="button__text">{loading ? 'Processing...' : (newUser ? 'Sign Up' : 'Log In')}</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>

                        <div className='Social-media'>
                            <GoogleLogin 
                                className="google-button"
                                clientId="164056615297-4nsgigdglk1hofmimjhjjctq3i8o0264.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={(error) => console.error('Google login error:', error)}
                                cookiePolicy={'single_host_origin'}
                            />

                            <GitHubLogin 
                                className="github-button"
                                clientId="Ov23liDFUtG3tMvKP37I"
                                onSuccess={responseGithub}
                                onFailure={(error) => console.error('GitHub login error:', error)}
                                buttonText="Sign in with GitHub"
                            />
                        </div>
                    </form>
                </div>

                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>

                <button 
                    onClick={() => {
                        setNewUser(!newUser);
                        setErrorMessage('');
                        setSuccessMessage('');
                    }}
                    className='btn01'
                >
                    {newUser ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </div>
        </div>
    );
}
