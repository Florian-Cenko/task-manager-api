package com.example.taskmanager.dto;
import com.example.taskmanager.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Role role;
}
