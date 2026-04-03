package com.example.taskmanager.dto;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;

import java.time.LocalDate;

public class TaskResponseDTO {

    private String username;
    private String email;
    private String categoryName;
    private Long id;
    private String title;
    private LocalDate dueDate;
    private Priority priority;
    private Status status;

    public TaskResponseDTO() {
    }

    public TaskResponseDTO(String username, String categoryName, String email, String title, LocalDate dueDate, Priority priority, Status status) {
        this.username = username;
        this.categoryName = categoryName;
        this.email = email;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
