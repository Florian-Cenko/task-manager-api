package com.example.taskmanager.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TaskEventListener {

    //Observer Design Pattern

    @EventListener
    // Observer 1: Log when task created
    public void onTaskCreated(TaskCreatedEvent event){
        System.out.println("✅ New task created: " + event.getTask().getTitle());
    }

    // Observer 2: Warning if task has deadline today
    @EventListener
    public  void onTaskCreatedCheckDeadline(TaskCreatedEvent event){
        LocalDate today = LocalDate.now();
        if(today.equals(event.getTask().getDueDate())){
            System.out.println("⚠️ WARNING: Task '"
                    + event.getTask().getTitle()
                    + "' has a deadline TODAY!");
        }
    }


}
