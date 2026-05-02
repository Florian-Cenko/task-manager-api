package com.example.taskmanager.command;

import org.springframework.stereotype.Component;
import java.util.Stack;

@Component
public class CommandHistory {

    private final Stack<Command> history = new Stack<>();

    public void push(Command command) {
        history.push(command);
    }

    public void undo() {
        if (!history.isEmpty()) {
            Command last = history.pop();
            last.undo();
        }
    }

    public boolean isEmpty() {
        return history.isEmpty();
    }
}