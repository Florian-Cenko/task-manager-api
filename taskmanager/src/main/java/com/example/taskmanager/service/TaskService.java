package com.example.taskmanager.service;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.dto.TaskResponseDTO;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    public TaskService(UserRepository userRepository, TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    public TaskResponseDTO createTask(Long userId, Long categoryId, Task task) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category with this id" + categoryId + "does not exist"));

        task.setId(null);
        task.setUser(user);
        task.setCategory(category);
        Task savedTask = taskRepository.save(task);
        return convertTaskToDTO(savedTask);
    }

    public List<TaskResponseDTO> getHighPriorityTasksForUser(Long userId, Priority priority) {

        List<Task> tasks = taskRepository.findByUserIdAndPriority(userId, priority);

        // 2. Τη μετατρέπουμε σε λίστα από DTOs SOSSSSS
        return tasks.stream()
                .map(this::convertTaskToDTO) // Μετατρέπει κάθε Task σε TaskResponseDTO
                .toList();// Την ξανακάνει λίστα
    }

    public List<TaskResponseDTO> getDeadlineTasksIsNotCompleted(Long userId) {
        LocalDate today = LocalDate.now();
        List<Task> tasks = taskRepository.findByUserIdAndDueDateAndStatusNot(userId, today,Status.DONE); //STATUS NOT DONEEEE!!!!!!
        // 2. Τη μετατρέπουμε σε λίστα από DTOs SOSSSSS
        return tasks.stream()
                .map(this::convertTaskToDTO) // Μετατρέπει κάθε Task σε TaskResponseDTO
                .toList();// Την ξανακάνει λίστα
    }

    public TaskResponseDTO taskCompleted(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task doesn't exist"));
        task.setStatus(Status.DONE);
        Task savedTask = taskRepository.save(task);
        return convertTaskToDTO(savedTask);
    }

    public TaskResponseDTO updateTask(Long id, Task updTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task doesn't exist"));

        task.setTitle(updTask.getTitle());
        task.setStatus(updTask.getStatus());
        task.setPriority(updTask.getPriority()); // Πρόσθεσε αυτό
        task.setDueDate(updTask.getDueDate());   // Και αυτό

        Task savedTask = taskRepository.save(task);
        return convertTaskToDTO(savedTask);
    }

    public void deleteTask(Long id) {
        boolean exists = taskRepository.existsById(id);
        if (!exists) {
            throw new RuntimeException("Task with this id" + id + "does not exist");
        }
        taskRepository.deleteById(id);
    }

    public List<TaskResponseDTO> allTasksForCategory(Long categoryId) {
        boolean categoryExists = categoryRepository.existsById(categoryId);

        if (!categoryExists) {
            throw new RuntimeException("Category with id" + categoryId + "does not exist");
        }
        List<Task> tasks = taskRepository.findByCategoryId(categoryId);

        return tasks.stream()
                .map(this::convertTaskToDTO)
                .toList();
    }

    public List<TaskResponseDTO> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(this::convertTaskToDTO)
                .toList();
    }

    public String getUserStats(Long userId) {
        long total = taskRepository.countByUserId(userId);
        long completedTasks = taskRepository.countByUserIdAndStatus(userId,Status.DONE);
        long pending = total - completedTasks;

        if (total == 0) {
            return "No tasks found for this User";
        }
        double percentage = ((double) completedTasks / total) * 100;
        return String.format("Stats for User %d: Total: %d | Completed: %d | Pending: %d | Progress: %.2f%%",
                userId, total, completedTasks, pending, percentage);
    }

    private TaskResponseDTO convertTaskToDTO(Task task){
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setUsername(task.getUser().getUsername());
        dto.setEmail(task.getUser().getEmail());
        dto.setCategoryName(task.getCategory().getName());
        return dto;
    }
    //This method returns Tasks accordingly the label that user search
    public List<TaskResponseDTO> getUserTasksFromLabel(Long userId, String label){
        List<Task> task = taskRepository.findByUserIdAndLabel(userId,label);
        return task.stream()
                .map(this::convertTaskToDTO)
                .toList();
    }
}