package com.example.taskmanager.repository;

import com.example.taskmanager.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User  findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
