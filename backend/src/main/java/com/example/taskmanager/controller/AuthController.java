package com.example.taskmanager.controller;

import com.example.taskmanager.dto.LoginRequestDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserRepository userRepository;
    private UserService userService;

    public AuthController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
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
