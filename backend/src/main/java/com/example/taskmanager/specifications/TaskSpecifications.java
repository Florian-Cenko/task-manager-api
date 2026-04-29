package com.example.taskmanager.specifications;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class TaskSpecifications {

    public static Specification<Task> hasUserId(Long userId){
        return (root,query,cb) -> cb.equal(root.get("user").get("id"),userId);
    }

    public static Specification<Task> hasStatus(Status status){
        return (root,query,cb) -> status == null ? cb.conjunction():
                                                                cb.equal(root.get("status"),status);
    }

    public static Specification<Task> hasPriority(Priority priority){
        return (root, query, cb) -> priority == null ? cb.conjunction():
                                                                cb.equal(root.get("priority"),priority);
    }

    public static Specification<Task> titleContains(String title){
        return (root, query, cb) -> title == null ? cb.conjunction():
                                                        cb.like(root.get("title"),"%" +title.toLowerCase() +"%");
    }

    public static Specification<Task> isUrgent(Boolean urgent){
        return(root, query, cb) -> {
            if(urgent == null || !urgent){
                return cb.conjunction(); // Αν είναι false ή null, μην φιλτράρεις
            }
            LocalDate today = LocalDate.now();
            LocalDate fiveDaysFromNow = today.plusDays(5);
            // Φιλτράρουμε τις εργασίες που λήγουν στο διάστημα [today, today+5]
            return cb.and(
                    cb.between(root.get("dueDate"), today, fiveDaysFromNow),
                    cb.notEqual(root.get("status"),Status.DONE));
        };
    }

    public static Specification<Task> isActive() {
        return (root, query, cb) -> cb.equal(root.get("active"), true);
    }
}
