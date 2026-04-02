package com.example.taskmanager.repository;

import com.example.taskmanager.Priority;
import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

   // List<Task> findByUserId(Long userId);

    List<Task> findByUserIdAndPriority(Long userId, Priority priority);
    List<Task> findByCategoryId(Long categoryId);
    List<Task> findByUserIdAndDueDateAndCompletedFalse(Long userId, LocalDate dueDate);

    long countByUserId(Long userId);
    long countByUserIdAndCompletedFalse(Long userId);
    long countByUserIdAndCompletedTrue(Long userId);



}
