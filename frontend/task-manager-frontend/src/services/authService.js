const BASE_URL = "http://localhost:8080/api/auth";

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