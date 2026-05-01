package com.example.taskmanager;

import com.example.taskmanager.model.Category;
import com.example.taskmanager.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class TaskmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskmanagerApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CategoryRepository repository) {
		return args -> {
			if (repository.findAll().stream().noneMatch(Category::isSystem)) {
				List<Category> defaultCategories = List.of(
						Category.builder().name("Work").isSystem(true).color("#ef4444").active(true).build(),
						Category.builder().name("University").isSystem(true).color("#3b82f6").active(true).build(),
						Category.builder().name("Health").isSystem(true).color("#f59e0b").active(true).build()
				);
				repository.saveAll(defaultCategories);
				System.out.println("Default categories initialized!");
			}
		};
	}
}
