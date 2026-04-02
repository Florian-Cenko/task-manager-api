package com.example.taskmanager.controller;

import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    CategoryRepository categoryRepository;
    TaskRepository taskRepository;
    TaskService taskService;

    public CategoryController(CategoryRepository categoryRepository,TaskRepository taskRepository,TaskService taskService){
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
        this.taskService = taskService;
    }

    @PostMapping()
    public Category createCategory(@RequestBody Category category){
            return categoryRepository.save(category);
    }

    @PostMapping("/{categoryId}/tasks")
    public Task addTasksToCategory(@PathVariable Long categoryId,@RequestBody Task task) {
        return taskService.addTaskToCategory(categoryId, task);
    }
}
