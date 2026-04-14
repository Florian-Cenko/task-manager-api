package com.example.taskmanager.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD) // Λέμε ότι μπαίνει μόνο πάνω από μεθόδους
@Retention(RetentionPolicy.RUNTIME) // Θέλουμε να είναι ορατό την ώρα που τρέχει το πρόγραμμα
public @interface CheckTaskOwnership {
}
