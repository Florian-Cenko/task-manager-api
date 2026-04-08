package com.example.taskmanager.mapper;

import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDTO toDTO(Category category);
}
