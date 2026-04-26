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

        <div  className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="flex justify-center text-3xl font-bold text-gray-700">
                    Create an account
                </h2>
                <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 mt-3 mb-3 border rounded-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br/>
                <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 mt-3 mb-3 border rounded-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br/>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mt-3 mb-3 border rounded-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br/>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 mt-3 mb-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mt-3 mb-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/>
                <label className="flex items-start gap-2 text-sm text-gray-700 mb-3">
                    <input type="checkbox" className="mt-1" required />

                    <span>
                            I accept the{" "}
                        <a
                            href="https://www.termsfeed.com/public/uploads/2019/04/terms-and-conditions-template.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                            required
                        >
                            Terms and Conditions
                        </a>
                    </span>
                </label>
                <button type="submit" className="w-full p-2 mt-3 mb-3 border text-white bg-blue-500 rounded-lg" onClick={handleRegister}>Create an account</button>
                <hr className="my-4 border-gray-300" />
                <p className="flex justify-center mr-8 mt-2 text-gray-700">Already have an account?</p>
                <div className="text-right -mt-6 mr-2">
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-blue-500"
                    >
                    Login here
                </button>
            </div>
            </div>
        </div>

    );

};