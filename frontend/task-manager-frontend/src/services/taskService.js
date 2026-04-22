const BASE_URL = "http://localhost:8080/api/tasks";

export const getAllTasks = async (userId) => {

    const response = await fetch(`${BASE_URL}/${userId}/allTasks`);
    if(!response.ok) throw new Error("Fetch for Tasks Failed");
    return response.json();
};

export const addTask = async (userId,categoryId,taskPayload) => {

    const response = await fetch(`${BASE_URL}/add?userId=${userId}&categoryId=${categoryId}`, {
        method:'POST',
        headers:{'Content-Type': 'application/json' },
        body: JSON.stringify(taskPayload)
    });

    if(!response.ok) throw new Error("Failed to create a new Task");
    return response.json();

};

export const updateTask = async (taskId,taskPayload) => {

    const response = await fetch(`${BASE_URL}/${taskId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(taskPayload)
    });

    if(!response.ok) throw new Error("Failed to update Task");
    return response.json();
};

export const deleteTask = async (taskId,userId) => {

    const response = await fetch(`${BASE_URL}/${taskId}/users/${userId}`,{
        method:'DELETE',
    });

    if(!response.ok) throw new Error("Failed to Delete the Task");
    return true;
};

export const getTasksFiltered = async(params,page=0) =>{

    const searchParams = new URLSearchParams(params);

    searchParams.append("page",page);
    searchParams.append("size",5);

    const queryString = searchParams.toString();

    const url = `${BASE_URL}/search?${queryString}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Filter search failed");
    return response.json();
};