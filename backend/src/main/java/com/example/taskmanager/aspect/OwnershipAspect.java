package com.example.taskmanager.aspect;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class OwnershipAspect {

    private static final Logger logger = LoggerFactory.getLogger(OwnershipAspect.class);
    private final TaskRepository taskRepository;
    public OwnershipAspect(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    //Το Pointcut λέει: Τρέξε ΠΡΙΝ (@Before) από οποιαδήποτε μέθοδο έχει το Annotation
    // και πάρε ως ορίσματα το taskId και το userId που στέλνει ο Controller.
    @Before("@annotation(com.example.taskmanager.security.CheckTaskOwnership) && args(taskId,userId, ..)")
    public void check(Long taskId,Long userId){

        // 1. Βρες το task στη βάση χρησιμοποιώντας το taskRepository, αν δεν υπάρχει, πέτα RuntimeException.
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // 3. Πάρε το task και δες αν το task.getUser().getId() είναι ίσο με το userId που ήρθε.
        if (!task.getUser().getId().equals(userId)){
            // 4. Αν ΔΕΝ είναι ίσα, πέτα RuntimeException("Unauthorized access!").
            throw new RuntimeException("Access Denied: You don't own this task!");
        }
        logger.info("AOP Ownership Validation: Success!");
        }
    }

