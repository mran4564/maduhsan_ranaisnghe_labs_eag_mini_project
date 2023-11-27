package org.b2b_system.product.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody @Valid ProductRequest request
    ) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAll(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "2") int size,
            @RequestParam(name = "category_id", required = false) UUID categoryId,
            @RequestParam(name = "brand_name", required = false) String brandName,
            @RequestParam(name = "in_stock", required = false) Boolean isInStock
    ) {
        Pageable pageRequest = PageRequest.of(page, size);

        return ResponseEntity.ok(productService.
                getAllProducts(pageRequest, categoryId, brandName, isInStock));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductDetails(
            @PathVariable("id") UUID id
    ) {
        return ResponseEntity.ok(productService.getProductDetails(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProductDetails(
            @PathVariable("id") UUID id, @RequestBody UpdateProductRequest request
    ) {
        return ResponseEntity.ok(productService.updateProductDetails(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }

}
