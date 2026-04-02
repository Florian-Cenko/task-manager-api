package com.example.taskmanager.service;

import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUser(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));
    }
}
