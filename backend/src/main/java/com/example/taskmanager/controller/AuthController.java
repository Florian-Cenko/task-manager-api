package com.example.taskmanager.controller;

import com.example.taskmanager.dto.LoginRequestDTO;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.dto.UserResponseDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserRepository userRepository;
    private UserService userService;

    public AuthController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO userRegistrationDTO){

        try {
            // Κλήση του Service για δημιουργία χρήστη
            UserResponseDTO savedUser = userService.createUser(userRegistrationDTO);

            // Επιστροφή επιτυχίας (HTTP 200 OK) με τα δεδομένα του χρήστη
            return ResponseEntity.ok(savedUser);

        } catch (RuntimeException e) {
            // Επιστροφή σφάλματος αν το email ή το username υπάρχει ήδη (HTTP 400 Bad Request)
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Γενικό σφάλμα διακομιστή (HTTP 500 Internal Server Error)
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }


    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){

        User user = userRepository.findByEmail(loginRequestDTO.getEmail());

        if(user == null) {
            return ResponseEntity.status(401).body("User not found");
        }
        if(user.getPassword().equals(loginRequestDTO.getPassword())){
            return ResponseEntity.ok(user.getId());
        }


        return ResponseEntity.status(401).body("Invalid password");
    }
}
