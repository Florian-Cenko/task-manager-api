package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.taskmanager.model.Category;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    // Dependency Injection μόνο του Service (το Repository πρέπει να καλείται μόνο από το Service)
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    // Δημιουργία κατηγορίας (θα είναι πάντα isSystem = false)
    @PostMapping("/createCategory")
    public CategoryResponseDTO createCategory(@Valid @RequestBody Category category, @RequestParam Long userId){
        return categoryService.createCategory(category, userId);
    }

    // Εδώ είναι η βασική αλλαγή: Θα επιστρέφει System + User κατηγορίες
    @GetMapping("/{userId}/allCategories")
    public List<CategoryResponseDTO> allCategoriesForUser(@PathVariable Long userId){
        // Το service πρέπει να καλεί την findAllByUserIdIncludingSystem που φτιάξαμε στο Repo
        return categoryService.allCategoriesForUser(userId);
    }

    @DeleteMapping("/{categoryId}/user/{userId}")
    public void softDeleteCategory(@PathVariable Long categoryId, @PathVariable Long userId){
        categoryService.deleteCategory(categoryId, userId);
    }

    @PostMapping("/undo")
    public ResponseEntity<?> undoLastDelete(){
        categoryService.undoLastDelete();
        return  ResponseEntity.ok("Undo was Successful!");
    }
}