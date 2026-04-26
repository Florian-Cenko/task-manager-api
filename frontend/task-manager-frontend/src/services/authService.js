const BASE_URL = "http://localhost:8080/api/auth";


export const register = async (firstName, lastName, username, email, password) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    });

    const data = await response.json(); 

    if (!response.ok) {
        console.error("Backend error:", data);
        throw new Error(data.message || JSON.stringify(data));
    }

    return data;
};
// POST: Authenticate user
export const login = async (email, password) => {
    // Send POST request with user credentials (email and password)
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // Convert credentials to JSON string
    });

    // Throw error if authentication fails (e.g., 401 Unauthorized)
    if (!response.ok) throw new Error("Failed to Login");
    
    // Return the response data (e.g., userId, token)
    return response.json();
};