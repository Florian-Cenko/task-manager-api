package com.example.taskmanager.controller;

import com.example.taskmanager.dto.LoginRequestDTO;
import com.example.taskmanager.dto.LoginResponseDTO;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.dto.UserResponseDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
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
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            LoginResponseDTO result = userService.login(loginRequestDTO);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
