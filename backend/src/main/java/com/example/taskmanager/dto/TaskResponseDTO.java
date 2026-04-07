package com.example.taskmanager.dto;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {

    private String username;
    private String email;
    private String categoryName;
    private Long id;
    private String title;
    private LocalDate dueDate;
    private Priority priority;
    private Status status;
}
