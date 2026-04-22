import { useState } from "react";
import { login } from "../services/authService";

export default function LoginForm({ onLoginSuccess }) {

    // State management for user credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission

        try {
            // Attempt to authenticate using the auth service
            const userId = await login(email, password);
            
            // Persist the userId in session storage to keep the user logged in
            sessionStorage.setItem("userId", userId);
            
            // Trigger the success callback to update the App component state
            onLoginSuccess(userId);
        } catch (err) {
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {/* Form submission triggers handleLogin */}
            <form onSubmit={handleLogin}>
                {/* Controlled input for email */}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br/>
                
                {/* Controlled input for password */}
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br/>
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}