package com.example.taskmanager.chain;

import com.example.taskmanager.model.Category;

public class CategoryOwnershipHandler extends CategoryValidationHandler{
    @Override
    public void validate(Category category, Long userId) {
        if (category.getUser() == null || !category.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this category!");
        }
        // Validation passed - pass to the next handler in the chain
        if (next != null) next.validate(category, userId);
    }
}