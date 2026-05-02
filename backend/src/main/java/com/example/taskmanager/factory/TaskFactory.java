package com.example.taskmanager.factory;

import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;

public class TaskFactory {
    public static Task createTask(User user, Category category, Task requestTask){
        return buildBase(user,category,requestTask)
                .build();
    }

    private static Task.TaskBuilder buildBase(User user, Category category, Task requestTask){
        return Task.builder()
                .title(requestTask.getTitle())
                .status(requestTask.getStatus())
                .dueDate(requestTask.getDueDate())
                .label(requestTask.getLabel())
                .priority(requestTask.getPriority())
                .user(user)
                .category(category);
    }
}
