package org.b2b_system.product.service;

import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.CreateCategoryRequest;
import org.b2b_system.product.dto.CategoryResponse;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.Category;
import org.b2b_system.product.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    Logger logger = LoggerFactory.getLogger(CategoryService.class);


    public CategoryResponse createCategory(CreateCategoryRequest request)  {
        if (categoryRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException("Category %s already exists".formatted(request.getName()));
        }
        var category = mapRequestToCategory(request);
        var savedCategory = categoryRepository.save(category);

        logger.info("Category saved successfully");

        return mapCategoryToResponse(savedCategory);
    }


    public Category mapRequestToCategory(CreateCategoryRequest request) {
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public CategoryResponse mapCategoryToResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
}
