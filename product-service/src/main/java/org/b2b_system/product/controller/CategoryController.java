package org.b2b_system.product.controller;

import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.CreateCategoryRequest;
import org.b2b_system.product.dto.CategoryResponse;
import org.b2b_system.product.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<CategoryResponse> createCategory(
             CreateCategoryRequest request
    ) {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }
}
