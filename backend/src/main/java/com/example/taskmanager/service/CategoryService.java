package com.example.taskmanager.service;
import com.example.taskmanager.chain.CategoryOwnershipHandler;
import com.example.taskmanager.chain.CategoryValidationHandler;
import com.example.taskmanager.chain.SystemCategoryHandler;
import com.example.taskmanager.command.Command;
import com.example.taskmanager.command.CommandHistory;
import com.example.taskmanager.command.DeleteCategoryCommand;
import com.example.taskmanager.dto.CategoryResponseDTO;
import com.example.taskmanager.factory.CategoryFactory;
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
    private final CommandHistory commandHistory;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository,CategoryMapper categoryMapper,CommandHistory commandHistory){
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.categoryMapper = categoryMapper;
        this.commandHistory = commandHistory;
    }

    @Transactional
    public CategoryResponseDTO createCategory(Category category, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));

        Category categoryWithUser = CategoryFactory.createCategory(category,user);

        Category savedCategory = categoryRepository.save(categoryWithUser);
        return categoryMapper.toDTO(savedCategory);
    }

    public List<CategoryResponseDTO> allCategoriesForUser(Long userId){
        // Τώρα τραβάει και του χρήστη και τα defaults
        List<Category> categories = categoryRepository.findAllByUserIdIncludingSystem(userId);

        return categories.stream()
                .map(categoryMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteCategory(Long categoryId, Long userId){
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category doesn't exist"));

        // Build the validation chain: SystemCheck -> OwnershipCheck
        CategoryValidationHandler chain = new SystemCategoryHandler();
        chain.setNext(new CategoryOwnershipHandler());

        // Run all validations with a single call
        chain.validate(category, userId);

        Command command = new DeleteCategoryCommand(category,categoryRepository);
        command.execute();
        commandHistory.push(command);
    }
    @Transactional
    public void undoLastDelete(){
        if(commandHistory.isEmpty()){
            throw new RuntimeException("Nothing to undo");
        }
        commandHistory.undo();

    }
}
