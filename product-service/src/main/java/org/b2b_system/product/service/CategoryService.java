package org.b2b_system.product.service;

import org.b2b_system.product.dto.category.CategoryRequest;
import org.b2b_system.product.dto.category.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
    CategoryResponse updateCategoryDetails(UUID id, CategoryRequest request);
}
