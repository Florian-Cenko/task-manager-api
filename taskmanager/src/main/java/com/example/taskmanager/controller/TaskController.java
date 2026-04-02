package com.example.taskmanager.controller;

import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;

    }

    @PostMapping("/add")
    public TaskResponseDTO createTask(@RequestParam Long userId,
                                      @RequestParam Long categoryId,
                                      @RequestBody Task task) {

        return taskService.createTask(userId, categoryId, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO taskUpdated(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    @PatchMapping("/{id}/complete")
    public TaskResponseDTO completeTask(@PathVariable Long id) {
        return taskService.taskCompleted(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<TaskResponseDTO> tasksOfCategory(@PathVariable Long categoryId) {
        return taskService.allTasksForCategory(categoryId);
    }

    @GetMapping()
    public List<TaskResponseDTO> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{userId}/stats")
    public String getUserStats(@PathVariable Long userId) {
        return taskService.getUserStats(userId);
    }
}
