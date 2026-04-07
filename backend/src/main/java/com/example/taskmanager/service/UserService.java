package com.example.taskmanager.service;

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

    public UserResponseDTO createUser(User user){
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserResponseDTO getUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));
        return userMapper.toDTO(user);
    }
}
