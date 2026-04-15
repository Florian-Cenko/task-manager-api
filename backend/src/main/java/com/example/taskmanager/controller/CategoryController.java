package com.example.taskmanager.controller;
import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Η default θύρα της React (Vite)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    CategoryService categoryService;
    CategoryRepository categoryRepository;

    public CategoryController(CategoryService categoryService, CategoryRepository categoryRepository){
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping()
    public CategoryResponseDTO createCategory(@Valid @RequestBody Category category, @RequestParam Long userId){
            return categoryService.createCategory(category,userId);
    }

    @GetMapping("{userId}/allCategories")
    public List<CategoryResponseDTO> allCategoriesForUser(@PathVariable Long userId){
        return categoryService.allCategoriesForUser(userId);
    }

    @DeleteMapping("/{categoryId}/user/{userId}")
    public void softDeleteCategory(@PathVariable Long categoryId,@PathVariable Long userId){
        categoryService.deleteCategory(categoryId,userId);
    }

}
