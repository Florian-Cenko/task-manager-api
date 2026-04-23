const BASE_URL = "http://localhost:8080/api/tasks";

// GET: Fetch all tasks for a specific user
export const getAllTasks = async (userId) => {
    // Send GET request to the user's specific endpoint
    const response = await fetch(`${BASE_URL}/${userId}/allTasks`);
    // Throw error if the server response is not OK (e.g., 404, 500)
    if(!response.ok) throw new Error("Fetch for Tasks Failed");
    // Parse and return the JSON body
    return response.json();
};

// POST: Create a new task
export const addTask = async (userId, categoryId, taskPayload) => {
    const url = `${BASE_URL}/add?userId=${userId}&categoryId=${categoryId}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskPayload)
    });

    // Εδώ είναι η αλλαγή: αν δεν είναι OK, διάβασε το JSON του error
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown server error" }));
        console.error("Backend Error Details:", errorData); // <-- Αυτό θα τυπωθεί στην κονσόλα
        throw new Error(errorData.message || "Failed to create a new Task");
    }
    
    return response.json();
};

// PUT: Update an existing task
export const updateTask = async (taskId, taskPayload) => {
    // Send PUT request to the task-specific endpoint
    const response = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskPayload)
    });

    if(!response.ok) throw new Error("Failed to update Task");
    return response.json(); // Return the updated task object
};

// DELETE: Remove a task
export const deleteTask = async (taskId, userId) => {
    // Send DELETE request for the specific task and user
    const response = await fetch(`${BASE_URL}/${taskId}/users/${userId}`, {
        method: 'DELETE',
    });

    if(!response.ok) throw new Error("Failed to Delete the Task");
    return true; // Return true on successful deletion
};

// GET (Filtered): Search and filter tasks with pagination
export const getTasksFiltered = async(params, page = 0) => {
    // Construct the query string from the params object
    const searchParams = new URLSearchParams(params);

    // Append pagination metadata (current page and page size)
    searchParams.append("page", page);
    searchParams.append("size", 5);

    const queryString = searchParams.toString();
    const url = `${BASE_URL}/search?${queryString}`;

    // Execute the GET request with the constructed URL
    const response = await fetch(url);
    if (!response.ok) throw new Error("Filter search failed");
    return response.json(); // Return the paginated response
};

export const getUserStats = async(userId) =>{

    const response = await fetch(`${BASE_URL}/${userId}/stats`);

    if (!response.ok) {
        throw new Error("Failed to fetch statistics");
    }
    
    // Εδώ το response.json() θα γίνει απευθείας το αντικείμενο StatsResponseDTO!
    return response.json();
};