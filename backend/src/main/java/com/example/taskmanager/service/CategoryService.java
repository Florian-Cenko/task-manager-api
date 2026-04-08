package com.example.taskmanager.service;
import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.mapper.CategoryMapper;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;
    UserRepository userRepository;
    CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository,CategoryMapper categoryMapper){
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.categoryMapper = categoryMapper;
    }

    public CategoryResponseDTO createCategory(Category category, Long userId){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));

        Category categoryWithUser = category.toBuilder()
                .user(user)
                .build();

        Category savedCategory = categoryRepository.save(categoryWithUser);
        return categoryMapper.toDTO(savedCategory);
    }

    public List<CategoryResponseDTO> allCategoriesForUser(Long userId){
        List<Category> categories = categoryRepository.findByUserId(userId);

        return categories.stream()
                .map(categoryMapper::toDTO)
                .toList();
    }
}
