package com.example.taskmanager.command;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;

public class DeleteTaskCommand implements Command{
    private final Task task;
    private final TaskRepository taskRepository;

    public DeleteTaskCommand(Task task, TaskRepository repository){
        this.task = task;
        this.taskRepository = repository;
    }

    @Override
    public void execute() {
        task.setActive(false);
        taskRepository.save(task);
    }

    @Override
    public void undo() {
        task.setActive(true);
        taskRepository.save(task);
    }
}
