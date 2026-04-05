package com.example.taskmanager.controller;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping()
    public Category createCategory(@Valid @RequestBody Category category){
            return categoryService.createCategory(category);
    }

}
