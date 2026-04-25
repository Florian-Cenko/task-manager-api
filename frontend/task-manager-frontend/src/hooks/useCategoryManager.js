import { useState, useEffect } from "react";
import { getCategoriesForUser } from "../services/categoryService"; 
import { createCategory } from "../services/categoryService";

export const useCategoryManager = (userId) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [newCatName, setNewCatName] = useState("");
    const [newCatColor, setNewCatColor] = useState("#3498db");

    const refetch = () => {
        if (!userId) return;
        getCategoriesForUser(userId).then(setCategories).catch(err => console.error(err));
    };

    useEffect(() => {
        refetch();
    }, [userId]);

    const handleAddCategory = async () => {
        if (!newCatName) return;
        try {
            await createCategory(userId, { name: newCatName, color: newCatColor });
            setNewCatName("");
            refetch(); //For dropdown update
        } catch (err) {
            alert("Error creating category: " + err.message);
        }
    };

    return { 
        categories, selectedCategoryId, setSelectedCategoryId, 
        newCatName, setNewCatName, handleAddCategory 
    };
};