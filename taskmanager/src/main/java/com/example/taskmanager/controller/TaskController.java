package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final TaskService taskService;

    public TaskController(TaskRepository taskRepository, TaskService taskService,CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.taskService = taskService;
        this.categoryRepository = categoryRepository;

    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task taskUpdated(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    @PatchMapping("/{id}/complete")
    public Task completeTask(@PathVariable Long id) {
        return taskService.taskCompleted(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Task> tasksOfCategory(@PathVariable Long categoryId){
        return taskService.allTasksForCategory(categoryId);
    }

    @GetMapping()
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }
}
