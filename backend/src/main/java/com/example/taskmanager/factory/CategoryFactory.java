package com.example.taskmanager.factory;

import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.User;

public class CategoryFactory {

    public static Category createCategory(Category category, User user){

        return buildBase(category,user)
                .build();
    }

    public static Category.CategoryBuilder buildBase(Category category, User user){
        return Category.builder()
                .name(category.getName())
                .description(category.getDescription())
                .color(category.getColor())
                .user(user)
                .isSystem(false)
                .active(true);

    }
}
