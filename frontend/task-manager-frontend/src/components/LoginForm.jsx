import { useState } from "react";
import { login } from "../services/authService";

export default function LoginForm({ onLoginSuccess,onSwitchToRegister }) {

    // State management for user credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission

        try {
            // Attempt to authenticate using the auth service
            const user = await login(email, password);
            
            // Persist the userId in session storage to keep the user logged in
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("username",user.username);
            
            // Trigger the success callback to update the App component state
            onLoginSuccess(user.id);
        } catch (err) {
            alert("Login failed! Check your credentials.");
        }
    };

return (

    //Layout
    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-85">
            <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-96 space-y-4">
            <h2 className="flex justify-center text-3xl font-bold text-gray-700">
                <img src="/src/icons/task-manager.png" alt="icon" className=" mr-2 w-10 h-10" />
                Task Manager
            </h2>
            <p className="flex justify-center mt-2 text-gray-700">Welcome back! Please login to continue.</p>
           
            <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 mt-3 mb-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mt-2 mb-3 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br/>
            <a href="/forgot-password" className="flex justify-end text-sm text-blue-500">
                 Forgot Password?
            </a>
            <button type="submit" className="w-full p-2 mt-3 mb-3 border text-white bg-blue-500 rounded-lg">Login</button>
            <hr className="my-4 border-gray-300" />
            <p className="flex justify-center mr-5 mt-2 text-gray-700">Don't have an account?</p>
            <div className="text-right -mt-6 mr-6">
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-blue-500"
                >
                    Register Now
                </button>
            </div>
        </form>
        </div>
    </div>

    );
};
