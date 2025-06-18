'use client'
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

interface LoginResponse {
  token: string;
}

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
     const [showForm, setShowForm] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        // if (email && password) {
        //     router.push('/dashboard');
        // }

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            }),

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Login failed');
                return;
            }

            const data: LoginResponse = await res.json();

            localStorage.setItem('token', data.token);

            alert('Login successfull');

            redirect('/dashboard');
        } catch (err) {
            setError('Network Error');
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