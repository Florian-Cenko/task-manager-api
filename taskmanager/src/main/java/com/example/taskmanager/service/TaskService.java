package com.example.taskmanager.service;

import com.example.taskmanager.Priority;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    public TaskService(UserRepository userRepository,TaskRepository taskRepository,CategoryRepository categoryRepository){
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    public Task addTaskToUser(Long userId, Task task){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        task.setId(null);
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task addTaskToCategory(Long categoryId,Task task){
        Category category = categoryRepository.findById(categoryId).orElseThrow(()->new RuntimeException("Category with this id"+categoryId+"does not exist"));
        task.setId(null);
        task.setCategory(category);
        return taskRepository.save(task);
    }

    public List<Task> getHighPriorityTasksForUser(Long userId, Priority priority){
        return taskRepository.findByUserIdAndPriority(userId,priority);
    }

    public Task taskCompleted(Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task doesn't exist"));
        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task doesn't exist"));

        task.setTitle(updTask.getTitle());
        task.setCompleted(updTask.isCompleted());
        task.setPriority(updTask.getPriority()); // Πρόσθεσε αυτό
        task.setDueDate(updTask.getDueDate());   // Και αυτό

        return taskRepository.save(task);
    }

    public void deleteTask(Long id){
        boolean exists = taskRepository.existsById(id);
        if (!exists){
            throw new RuntimeException("Task with this id" +id + "does not exist");
        }
            taskRepository.deleteById(id);
    }

    public List<Task> allTasksForCategory(Long categoryId){
        boolean categoryExists = categoryRepository.existsById(categoryId);
        if(!categoryExists){
            throw new RuntimeException("Category with id"+categoryId+"does not exist");
        }
        return taskRepository.findByCategoryId(categoryId);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
}
