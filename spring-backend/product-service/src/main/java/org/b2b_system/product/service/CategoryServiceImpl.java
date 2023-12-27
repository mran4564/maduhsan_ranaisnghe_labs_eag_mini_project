package org.b2b_system.product.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.common.Constants;
import org.b2b_system.product.dto.category.CategoryRequest;
import org.b2b_system.product.dto.category.CategoryResponse;
import org.b2b_system.product.exception.EntityAlreadyExistsException;
import org.b2b_system.product.model.Category;
import org.b2b_system.product.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Hold logic related to CategoryService endpoints
 *
 * @author madushan ransinghe
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    /**
     * Create new Product Category
     *
     * @param request Category create request
     * @return CategoryResponse
     */
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException(Constants.CATEGORY_NAME_AVAILABLE_EXCEPTION_MESSAGE.formatted(request.getName()));
        }

        var category = mapRequestToCategory(request);
        var savedCategory = categoryRepository.save(category);
        logger.info("Category saved successfully");

        return mapCategoryToResponse(savedCategory);
    }

    /**
     * Get All the category types
     *
     * @return list of categoryResponse
     */
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::mapCategoryToResponse).toList();
    }

    /**
     * Update Category Details
     *
     * @param id      categoryId
     * @param request Category Update Request
     * @return updated CategoryResponse
     */
    public CategoryResponse updateCategoryDetails(UUID id, CategoryRequest request) {
        var category = categoryRepository.findByCategoryId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        Constants.CATEGORY_NOT_FOUND_EXCEPTION_MESSAGE.formatted(id)));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        var updatedCategory = categoryRepository.save(category);
        logger.info("Category Updated successfully");

        return mapCategoryToResponse(updatedCategory);
    }

    private Category mapRequestToCategory(CategoryRequest request) {
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(UUID.randomUUID())
                .build();
    }

    private CategoryResponse mapCategoryToResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
}
