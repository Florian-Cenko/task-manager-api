package com.example.taskmanager.repository;

import com.example.taskmanager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    // JPQL Query: Φέρνει τις συστημικές ΚΑΙ τις προσωπικές κατηγορίες του χρήστη
    @Query("SELECT c FROM Category c WHERE c.isSystem = true OR (c.user.id = :userId AND c.active = true)")
    List<Category> findAllByUserIdIncludingSystem(@Param("userId") Long userId);

    // Προαιρετικά: Αν θες να ελέγχεις αν υπάρχει ήδη κατηγορία με το ίδιο όνομα για τον χρήστη
    boolean existsByNameAndUserId(String name, Long userId);}
