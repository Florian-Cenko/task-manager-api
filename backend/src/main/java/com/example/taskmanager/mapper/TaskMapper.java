package com.example.taskmanager.mapper;

import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(source = "user.username",target = "username")
    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "category.name",target = "categoryName")
    TaskResponseDTO toDTO(Task task);
}
