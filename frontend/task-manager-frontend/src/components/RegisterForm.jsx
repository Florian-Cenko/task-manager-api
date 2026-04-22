import { useState } from "react";
import { register } from "../services/authService";

export default function RegisterForm({onRegisterSuccess, onSwitchToLogin}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            await register(firstName,lastName,username,email,password);
            alert("Account created Successfully!")
            onRegisterSuccess();
        }catch (err) {
             alert("Registration failed. Please check your inputs.");
        }
    }

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br/>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br/>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br/>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/>

                <button type="submit">Sign up</button>

                <p>
                    Already have an account? 
                    <button onClick={onSwitchToLogin}>Login here</button>
                </p>
            </form>
        </div>

    );

};