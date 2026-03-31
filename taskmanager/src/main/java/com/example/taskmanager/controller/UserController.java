package com.example.taskmanager.controller;
import com.example.taskmanager.Priority;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final TaskService taskService;
    private final UserRepository userRepository;

    public UserController(TaskService taskService,UserRepository userRepository){
        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    @PostMapping()
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User doesn't exist"));
    }
    @GetMapping("/{userId}/tasks/filter")
    public List<Task> getHighPriorityTasksForUser(@PathVariable Long userId, @RequestParam Priority priority){
        return taskService.getHighPriorityTasksForUser(userId,priority);
    }

    @PostMapping("/{userId}/tasks")
    public Task addTaskToUser(@PathVariable Long userId,@RequestBody Task task){
       return taskService.addTaskToUser(userId,task);
    }

}

