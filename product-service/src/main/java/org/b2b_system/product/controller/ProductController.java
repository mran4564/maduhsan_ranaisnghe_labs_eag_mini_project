package org.b2b_system.product.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final  ProductService productService;

    @PostMapping()
    public ResponseEntity<ProductResponse> createCategory(
            @RequestBody @Valid ProductRequest request
    ) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @GetMapping()
    public ResponseEntity<List<ProductResponse>> getAll() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductDetails(
            @PathVariable("id") UUID id
    ) {
        return ResponseEntity.ok(productService.getProductDetails(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProductDetails(
            @PathVariable("id") UUID id , @RequestBody UpdateProductRequest request
    ) {
        return ResponseEntity.ok(productService.updateProductDetails(id,request));
    }

}
