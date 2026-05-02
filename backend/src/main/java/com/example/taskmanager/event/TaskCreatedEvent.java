package com.example.taskmanager.event;
import com.example.taskmanager.model.Task;
public class TaskCreatedEvent {

    private final Task task;

    public TaskCreatedEvent(Task task){this.task = task;}

    public Task getTask(){ return task;}
}
