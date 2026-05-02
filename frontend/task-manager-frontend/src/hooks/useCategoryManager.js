import { useState, useEffect } from "react";
import * as catService from "../services/categoryService";

export const useCategoryManager = (userId) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [error, setError] = useState(null);

    const loadCategories = async () => {
        try {
            const data = await catService.getCategoriesForUser(userId);
            setCategories(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (userId) loadCategories();
    }, [userId]);

    const handleAddCategory = async (name) => {
        if (!name.trim()) {  // ← αν είναι κενό
        alert("Please enter a category name!");
        return;
    }
        try {
            const newCategory = await catService.createCategory(userId, {
                name: name,
                color: "#3498db"
            });

            await loadCategories();

            return newCategory; // 👈 useful
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await catService.deleteCategory(categoryId, userId);
            await loadCategories();
        } catch (err) {
            alert(err.message);
        }
    };

    return {
        categories,
        selectedCategoryId,
        setSelectedCategoryId,
        handleAddCategory,
        handleDeleteCategory,
        refresh: loadCategories
    };
};