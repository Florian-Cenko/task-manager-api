package com.example.taskmanager.controller;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
                                      @Valid @RequestBody Task task) {

        return taskService.createTask(userId, categoryId, task);
    }

    @DeleteMapping("/{taskId}/users/{userId}")
    public void deleteTask(@PathVariable Long taskId,@PathVariable Long userId) {
        taskService.deleteTask(taskId,userId);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO taskUpdated(@PathVariable Long id, @Valid @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    @GetMapping("/category/{categoryId}")
    public List<TaskResponseDTO> tasksOfCategory(@PathVariable Long categoryId) {
        return taskService.allTasksForCategory(categoryId);
    }

    @GetMapping("/{userId}/stats")
    public String getUserStats(@PathVariable Long userId) {
        return taskService.getUserStats(userId);
    }

    @GetMapping("/{userId}/labels")
    public List<TaskResponseDTO> getTasksByLabel(@PathVariable Long userId,@RequestParam String label){
        return taskService.getUserTasksFromLabel(userId,label);
    }

    @GetMapping("{userId}/allTasks")
    public List<TaskResponseDTO> allTasksForUser(@PathVariable Long userId){
        return taskService.allTasksForUser(userId);
    }

    @GetMapping("/search")
    public Page<TaskResponseDTO> searchTasks(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort){

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort[0]).descending());
        return taskService.getTasksPaged(userId,status,priority,title,pageable);
    }
}
