package com.example.taskmanager.command;

public interface Command {
    void execute();
    void undo();
}
