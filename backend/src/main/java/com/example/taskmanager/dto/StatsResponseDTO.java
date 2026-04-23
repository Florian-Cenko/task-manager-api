package com.example.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponseDTO {

    private int totalTasks;
    private int completedTasks;
    private int pendingTasks;
    private float progress;
}
