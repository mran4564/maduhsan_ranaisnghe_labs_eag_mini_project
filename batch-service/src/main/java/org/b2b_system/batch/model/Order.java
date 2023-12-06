package org.b2b_system.batch.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "batch-order")
public class Order {

    @Id
    @SequenceGenerator(name = "SUBORDER_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SUBORDER_SEQ")
    private int id;
    private UUID productId;
    private String productName;
    private String supplierBrandName;
    private UUID supplierId;
    private int quantity;
    private String deliveryAddress;
    private Date deliveryDate;
    private UUID customerId;
    private String customerName;
    private String customerEmail;
}
