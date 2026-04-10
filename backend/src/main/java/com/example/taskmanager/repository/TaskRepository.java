package com.example.taskmanager.repository;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByUserIdAndActiveTrue(Long userId);
    List<Task> findByUserIdAndPriorityAndActiveTrue(Long userId, Priority priority);
    List<Task> findByCategoryIdAndActiveTrue(Long categoryId);
    List<Task> findByUserIdAndDueDateAndStatusNotAndActiveTrue(Long userId, LocalDate dueDate, Status status);
    long countByUserIdAndActiveTrue(Long userId);
    long countByUserIdAndStatusAndActiveTrue(Long userId, Status status);
    List<Task> findByUserIdAndLabelAndActiveTrue(Long userId,String label);
}
