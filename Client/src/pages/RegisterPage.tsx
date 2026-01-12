import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FormEvent, useState } from 'react';
import { Register } from '../api/Auth/Auth';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (password == confirmPassword) {
                Register(email,password);
            } else {
                console.log("passwords are not same.");
            };
        } catch (error) {
            console.error(error)
        };
    };

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1 className='login-title'>Create Account</h1>
                <form className='login-form' onSubmit={handleRegister}>
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
                    <div className='input-group'>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='submit-btn'>Sign Up</button>
                </form>
                
                <p className='create-account-text'>
                    Already have an account?{' '}
                    <a
                        href=""
                        style={{ textDecoration: 'none', color: '#3e6800', fontWeight: 'bold' }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/login');
                        }}
                    >
                        Login here!
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;