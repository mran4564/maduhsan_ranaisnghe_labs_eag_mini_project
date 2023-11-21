package org.b2b_system.product.service;

import lombok.RequiredArgsConstructor;
import org.b2b_system.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository categoryRepository;

}
