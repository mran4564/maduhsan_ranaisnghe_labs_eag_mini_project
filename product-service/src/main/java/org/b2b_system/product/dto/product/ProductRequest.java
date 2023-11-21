package org.b2b_system.product.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String name;
    private String description;
    private UUID supplierId;
    private UUID categoryId;
    private int stockCount;
    private String imageUrl;
    private boolean isInStock;
    private String brandName;
}
