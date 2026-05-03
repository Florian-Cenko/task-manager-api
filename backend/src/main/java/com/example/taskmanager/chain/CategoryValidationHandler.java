package com.example.taskmanager.chain;

import com.example.taskmanager.model.Category;

// Base class for all validation handlers in the chain
public abstract class CategoryValidationHandler {

    // Reference to the next handler in the chain
    protected CategoryValidationHandler next;

    // Sets the next handler and returns it to allow chaining
    public CategoryValidationHandler setNext(CategoryValidationHandler next) {
        this.next = next;
        return next;
    }

    // Each handler must implement its own validation logic
    public abstract void validate(Category category, Long userId);
}