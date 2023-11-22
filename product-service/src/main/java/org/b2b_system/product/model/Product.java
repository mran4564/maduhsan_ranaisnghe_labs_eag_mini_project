package org.b2b_system.product.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @SequenceGenerator(name = "Product_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Product_SEQ")
    private int id;
    private String name;
    private UUID productId;
    private String description;
    private int stockCount;
    private String imageUrl;
    private boolean isInStock;
    private UUID categoryId;
    private UUID supplierId;
    private String brandName;
    private BigDecimal price;
}
