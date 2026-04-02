package com.example.taskmanager.service;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }
}
