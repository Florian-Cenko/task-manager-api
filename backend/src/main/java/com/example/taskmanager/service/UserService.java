package com.example.taskmanager.service;

import com.example.taskmanager.Role;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.dto.UserResponseDTO;
import com.example.taskmanager.mapper.UserMapper;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository,UserMapper userMapper){

        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponseDTO createUser(UserRegistrationDTO userRegistrationDTO){

        if (userRepository.existsByEmail(userRegistrationDTO.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        if (userRepository.existsByUsername(userRegistrationDTO.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        User user = User.builder()
                .firstName(userRegistrationDTO.getFirstName())
                .lastName(userRegistrationDTO.getLastName())
                .username(userRegistrationDTO.getUsername())
                .email(userRegistrationDTO.getEmail())
                .password(userRegistrationDTO.getPassword())
                .build();

        // 3. Default Role (Πολύ σημαντικό: μην αφήνεις τον χρήστη να διαλέγει Role)
        user.setRole(Role.ROLE_USER);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserResponseDTO getUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));
        return userMapper.toDTO(user);
    }
}
