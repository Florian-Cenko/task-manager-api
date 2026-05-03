package com.example.taskmanager.chain;

import com.example.taskmanager.model.Category;

public class SystemCategoryHandler extends CategoryValidationHandler{
    @Override
    public void validate(Category category, Long userId) {
        // If category is system, stop the chain and throw exception
        if (category.isSystem()) {
            throw new RuntimeException("Cannot delete system categories!");
        }

        // Validation passed - pass to the next handler in the chain
        if (next != null) next.validate(category, userId);
    }
}
