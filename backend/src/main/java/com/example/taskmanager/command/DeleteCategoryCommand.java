package com.example.taskmanager.command;

import com.example.taskmanager.model.Category;
import com.example.taskmanager.repository.CategoryRepository;

public class DeleteCategoryCommand implements Command{

    private final Category category;
    private final CategoryRepository categoryRepository;

    public DeleteCategoryCommand(Category category, CategoryRepository categoryRepository){
        this.category = category;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void execute() {
        category.setActive(false);
        categoryRepository.save(category);
    }

    @Override
    public void undo() {
        category.setActive(true);
        categoryRepository.save(category);
    }
}
