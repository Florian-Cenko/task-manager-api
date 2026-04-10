package com.example.taskmanager.specifications;

import com.example.taskmanager.Priority;
import com.example.taskmanager.Status;
import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.domain.Specification;

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

    public static Specification<Task> isActive() {
        return (root, query, cb) -> cb.equal(root.get("active"), true);
    }
}
