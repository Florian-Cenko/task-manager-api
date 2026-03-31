package com.example.taskmanager.model;

import com.example.taskmanager.Priority;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDate dueDate;
    private boolean completed;

    //Tell JPA to read Enums as String
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @JsonBackReference // Αυτό λέει "μην ξαναδείξεις τον user εδώ, θα κολλήσουμε σε λούπα"
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Task(){
    }

    public Task(String title,boolean completed){
        this.title = title;
        this.completed = completed;
    }

    public String getTitle() {
        return title;
    }

    public Long getId() {
        return id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}

