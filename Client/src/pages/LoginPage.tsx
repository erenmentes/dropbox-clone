import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useState, FormEvent } from 'react';
import { Login } from "../api/Auth/Auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await Login(email, password);
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem("refresh_token", result.data.refresh_token);
            navigate("/");
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1 className='login-title'>Login</h1>
                <form className='login-form' onSubmit={handleLogin}>
                    <div className='input-group'>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='submit-btn'>Sign In</button>
                </form>
                <p className='forgot-text'>Forgot your password?</p>
                <p className='create-account-text'>
                    Don't have an account?{' '}
                    <a
                        href=""
                        style={{ textDecoration: 'none', color: '#3e6800', fontWeight: 'bold' }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/register');
                        }}
                    >
                        Create one!
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;