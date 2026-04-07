package com.example.taskmanager.model;
import com.example.taskmanager.Priority;
import com.example.taskmanager.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Size(min = 3)
    @Column(nullable = false,unique = true)
    private String username;
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user") // ΠΡΟΣΘΕΣΕ ΑΥΤΟ!
    private List<Task> tasks;

}
