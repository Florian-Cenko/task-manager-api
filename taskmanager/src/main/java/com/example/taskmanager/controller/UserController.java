package com.example.taskmanager.controller;
import com.example.taskmanager.Priority;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final TaskService taskService;
    private final UserService userService;

    public UserController(TaskService taskService,UserService userService){
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping()
    public User createUser(@Valid @RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping("/{userId}")
    public User getUserFromId(@PathVariable Long userId){
        return userService.getUser(userId);
    }

    @GetMapping("/{userId}/tasks/filter")
    public List<TaskResponseDTO> getHighPriorityTasksForUser(@PathVariable Long userId, @RequestParam Priority priority){
        return taskService.getHighPriorityTasksForUser(userId,priority);
    }

    @GetMapping("/{userId}/tasks/deadline/today")
    public List<TaskResponseDTO> getDeadlineTasksIsNotCompleted(@PathVariable Long userId){
        return taskService.getDeadlineTasksIsNotCompleted(userId);
    }

    @GetMapping("/{userId}/tasks/paged")
    public Page<TaskResponseDTO> getUserPagedTasks(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){

        return taskService.getAllTasksPaged(userId,page,size);
    }
}

