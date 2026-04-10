package com.example.taskmanager.service;
import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.mapper.CategoryMapper;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.CategoryRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository,CategoryMapper categoryMapper){
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.categoryMapper = categoryMapper;
    }

    @Transactional
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
        List<Category> categories = categoryRepository.findByUserIdAndActiveTrue(userId);

        return categories.stream()
                .map(categoryMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteCategory(Long categoryId, Long userId){

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category doesn't exist"));

        if (!category.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this category!");
        }
        Category changedCategory = category.toBuilder()
                .active(false)
                .build();

        categoryRepository.save(changedCategory);

    }
}
