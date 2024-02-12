package org.b2b_system.product.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.category.CategoryRequest;
import org.b2b_system.product.dto.category.CategoryResponse;
import org.b2b_system.product.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller class that defines the Category Crud endpoints
 *
 * @author Madushan Ransinghe
 */
@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            @RequestBody @Valid CategoryRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(request));
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategoryDetails(
            @PathVariable("id") UUID id, @RequestBody CategoryRequest request
    ) {
        return new ResponseEntity<>(categoryService.updateCategoryDetails(id, request),HttpStatus.OK);
    }

}
