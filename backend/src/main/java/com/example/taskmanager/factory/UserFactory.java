package com.example.taskmanager.factory;

import com.example.taskmanager.Role;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.model.User;

public class UserFactory {
    public static User createUser(UserRegistrationDTO userRegistrationDTO){
        return buildBase(userRegistrationDTO)
                .role(Role.ROLE_USER)
                .build();
    }

    public static User createAdmin(UserRegistrationDTO userRegistrationDTO){
        return buildBase(userRegistrationDTO)
                .role(Role.ROLE_ADMIN)
                .build();
    }

    // Private helper - αποφεύγουμε duplication
    private static User.UserBuilder buildBase(UserRegistrationDTO dto) {
        return User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword());
    }
}
