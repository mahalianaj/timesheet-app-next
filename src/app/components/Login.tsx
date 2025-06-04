'use client';
import { useState } from "react";
import '../../styles/login.css'
import MyForm from "./Form/Form";
import { useRouter } from 'next/navigation';


export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const [showForm, setShowForm] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            router.push('/dashboard');
        }
        
    };

    return(
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-box">
                <h2 className="form-title">Login</h2>

                <fieldset className="login-fieldset">
                    <legend className="login-text">Email</legend>
                    <input 
                        type="text" 
                        placeholder="your@email.com" 
                        required
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        className="login-input"
                    /> 
                </fieldset>
                    <br />
                <fieldset className="login-fieldset">
                    <legend className="login-text">Password</legend>
                    <input 
                        type="password" 
                        placeholder="password" 
                        required
                        value={password} 
                        onChange={(e )=> setPassword(e.target.value)}
                        className="login-input"
                        />
                </fieldset>
                <br></br>
                <button type="submit" className="login-button">Login</button>

            </form>
        </div>
    );
}