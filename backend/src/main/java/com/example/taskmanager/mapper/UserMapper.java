package com.example.taskmanager.mapper;

import com.example.taskmanager.dto.UserResponseDTO;
import com.example.taskmanager.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toDTO(User user);
}
