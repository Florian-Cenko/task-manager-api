package com.example.taskmanager.service;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.dto.StatsResponseDTO;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.event.TaskCreatedEvent;
import com.example.taskmanager.factory.TaskFactory;
import com.example.taskmanager.mapper.TaskMapper;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.User;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.security.CheckTaskOwnership;
import com.example.taskmanager.specifications.TaskSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    private final ApplicationEventPublisher applicationEventPublisher;

    public TaskService(UserRepository userRepository, TaskRepository taskRepository, CategoryRepository categoryRepository,TaskMapper taskMapper, ApplicationEventPublisher applicationEventPublisher) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.taskMapper = taskMapper;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @Transactional
    public TaskResponseDTO createTask(Long userId, Long categoryId, Task taskRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category with this id" + categoryId + "does not exist"));

        Task task = TaskFactory.createTask(user,category,taskRequest);

        Task savedTask = taskRepository.save(task);
        //Observer Design Pattern
        applicationEventPublisher.publishEvent(new TaskCreatedEvent(task));
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
    @CheckTaskOwnership
    public TaskResponseDTO updateTask(Long id, Task updTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        existingTask.setTitle(updTask.getTitle());
        existingTask.setStatus(updTask.getStatus());
        existingTask.setPriority(updTask.getPriority());
        existingTask.setLabel(updTask.getLabel());
        existingTask.setDueDate(updTask.getDueDate());

        Task savedTask = taskRepository.save(existingTask);
        return taskMapper.toDTO(savedTask);
    }


    @Transactional
    @CheckTaskOwnership
    public void deleteTask(Long taskId, Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access Denied");
        }

        // soft delete
        task.setActive(false);

        taskRepository.save(task);
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

    public StatsResponseDTO getUserStats(Long userId) {
        long total = taskRepository.countByUserIdAndActiveTrue(userId);
        long completedTasks = taskRepository.countByUserIdAndStatusAndActiveTrue(userId,Status.DONE);

        StatsResponseDTO dto = new StatsResponseDTO();
        dto.setTotalTasks((int)total);
        dto.setCompletedTasks((int)completedTasks);
        dto.setPendingTasks((int) (total - completedTasks));
        dto.setProgress(total == 0 ? 0 : ((float) completedTasks/total) * 100);
        return dto;
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

    @Transactional(readOnly = true)
    public Page<TaskResponseDTO> getTasksPaged(Long userId,Status status,Priority priority,String title,Boolean urgent, Pageable pageable){
        Specification<Task> specification = Specification.where(TaskSpecifications.hasUserId(userId))
                .and(TaskSpecifications.hasStatus(status))
                .and(TaskSpecifications.hasPriority(priority))
                .and(TaskSpecifications.titleContains(title))
                .and(TaskSpecifications.isUrgent(urgent))
                .and(TaskSpecifications.isActive());

        Page<Task> tasks = taskRepository.findAll(specification,pageable);

        return tasks.map(taskMapper::toDTO);
    }
}

