package com.example.taskmanager.repository;

import com.example.taskmanager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    List<Category> findByUserId(Long userId);
}
