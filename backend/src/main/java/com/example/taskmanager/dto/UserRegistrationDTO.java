package com.example.taskmanager.dto;

import com.example.taskmanager.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@Setter
public class UserRegistrationDTO {
    @NotBlank
    private String firstName;
    @NotBlank private String lastName;
    @NotBlank @Size(min = 3) private String username;
    @Email
    private String email;
    @NotBlank @Size(min = 6) private String password;
}