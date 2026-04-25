const BASE_URL = "http://localhost:8080/api/categories";


export const createCategory = async (userId,categoryData) =>{

    const url = `${BASE_URL}/createCategory?userId=${userId}`;

    const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(categoryData)
    });

    if(!response.ok){
        const errorData = await response.json().catch(() => ({message:  "Unknown server error"}));
        throw new Error(errorData.message || "Failed to create a new Category");
    }

    return response.json();
};

export const deleteCategory = async(categoryId,userId) => {

    const response = await fetch(`${BASE_URL}/${categoryId}/user/${userId}`,{
        method:'DELETE',
    });

    if(!response.ok) throw new Error("Failed to Delete the Category");
    return true; // Return true on successful deletion

};

export const getCategoriesForUser = async (userId) =>{

    const response = await fetch(`${BASE_URL}/${userId}/allCategories`);

    if(!response.ok) throw new Error("Fetch for Categories Failed");
    // Parse and return the JSON body
    return response.json();

};
