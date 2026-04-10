package com.example.taskmanager.service;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.mapper.TaskMapper;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class TaskService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final TaskMapper taskMapper;

    public TaskService(UserRepository userRepository, TaskRepository taskRepository, CategoryRepository categoryRepository,TaskMapper taskMapper) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.taskMapper = taskMapper;
    }

    @Transactional
    public TaskResponseDTO createTask(Long userId, Long categoryId, Task taskRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category with this id" + categoryId + "does not exist"));

        Task task = Task.builder()
                        .title(taskRequest.getTitle())
                        .status(taskRequest.getStatus())
                        .dueDate(taskRequest.getDueDate())
                        .label(taskRequest.getLabel())
                        .priority(taskRequest.getPriority())
                        .user(user)
                        .category(category).build();

        Task savedTask = taskRepository.save(task);
        return taskMapper.toDTO(savedTask);
    }

    public List<TaskResponseDTO> getHighPriorityTasksForUser(Long userId, Priority priority) {

        List<Task> tasks = taskRepository.findByUserIdAndPriorityAndActiveTrue(userId, priority);

        // 2. Τη μετατρέπουμε σε λίστα από DTOs SOSSSSS
        return tasks.stream()
                .map(taskMapper::toDTO) // Μετατρέπει κάθε Task σε TaskResponseDTO
                .toList();// Την ξανακάνει λίστα
    }

    public List<TaskResponseDTO> getDeadlineTasksIsNotCompleted(Long userId) {
        LocalDate today = LocalDate.now();
        List<Task> tasks = taskRepository.findByUserIdAndDueDateAndStatusNotAndActiveTrue(userId, today,Status.DONE); //STATUS NOT DONEEEE!!!!!!
        // 2. Τη μετατρέπουμε σε λίστα από DTOs SOSSSSS
        return tasks.stream()
                .map(taskMapper::toDTO) // Μετατρέπει κάθε Task σε TaskResponseDTO
                .toList();// Την ξανακάνει λίστα
    }

    @Transactional
    public TaskResponseDTO updateTask(Long id, Task updTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task doesn't exist"));

        existingTask.setTitle(updTask.getTitle());
        existingTask.setStatus(updTask.getStatus());
        existingTask.setPriority(updTask.getPriority());
        existingTask.setDueDate(updTask.getDueDate());

        Task savedTask = taskRepository.save(existingTask);
        return taskMapper.toDTO(savedTask);
    }

    @Transactional
    public void deleteTask(Long taskId,Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task doesn't exist"));

        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this task");
        }
        Task deletedTask = task.toBuilder()
                .active(false)
                .build();

        taskRepository.save(deletedTask);
    }

    public List<TaskResponseDTO> allTasksForCategory(Long categoryId) {
        boolean categoryExists = categoryRepository.existsById(categoryId);

        if (!categoryExists) {
            throw new RuntimeException("Category with id" + categoryId + "does not exist");
        }
        List<Task> tasks = taskRepository.findByCategoryIdAndActiveTrue(categoryId);

        return tasks.stream()
                .map(taskMapper::toDTO)
                .toList();
    }

    public String getUserStats(Long userId) {
        long total = taskRepository.countByUserIdAndActiveTrue(userId);
        long completedTasks = taskRepository.countByUserIdAndStatusAndActiveTrue(userId,Status.DONE);
        long pending = total - completedTasks;

        if (total == 0) {
            return "No tasks found for this User";
        }
        double percentage = ((double) completedTasks / total) * 100;
        return String.format("Stats for User %d: Total: %d | Completed: %d | Pending: %d | Progress: %.2f%%",
                userId, total, completedTasks, pending, percentage);
    }

    //This method returns Tasks accordingly the label that user search
    public List<TaskResponseDTO> getUserTasksFromLabel(Long userId, String label){
        List<Task> task = taskRepository.findByUserIdAndLabelAndActiveTrue(userId,label);
        return task.stream()
                .map(taskMapper::toDTO)
                .toList();
    }

    public List<TaskResponseDTO> allTasksForUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        List<Task> tasks = taskRepository.findByUserIdAndActiveTrue(userId);

        return tasks.stream()
                .map(taskMapper::toDTO)
                .toList();
    }
}

