package org.b2b_system.product.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductRequest {

    private String name;
    private String description;
    private int stockCount;
    private String imageUrl;
    private boolean isInStock;
    private BigDecimal price;

}
