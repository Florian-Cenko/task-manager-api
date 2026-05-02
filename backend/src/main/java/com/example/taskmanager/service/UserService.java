package com.example.taskmanager.service;

import com.example.taskmanager.Role;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.dto.UserResponseDTO;
import com.example.taskmanager.factory.UserFactory;
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

   // If tomorrow you want to add a ROLE_ADMIN or ROLE_PREMIUM user — you will go inside the Service and put in if/else.
   // The Service should not know how each type of User is created, SO WE NEED FACTORY METHOD(DESIGN PATTERN)
    public UserResponseDTO createUser(UserRegistrationDTO userRegistrationDTO){

        if (userRepository.existsByEmail(userRegistrationDTO.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        if (userRepository.existsByUsername(userRegistrationDTO.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        // Tomorrow if you want admin — only this changes:
       // UserFactory.createAdmin(dto) // the Service doesn't change at all!
        User user = UserFactory.createUser(userRegistrationDTO);

        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserResponseDTO getUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));
        return userMapper.toDTO(user);
    }
}
