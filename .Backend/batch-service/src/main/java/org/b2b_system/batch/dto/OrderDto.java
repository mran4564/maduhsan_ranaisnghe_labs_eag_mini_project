package org.b2b_system.batch.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    int id;
    String productId;
    String productName;
    String supplierBrandName;
    String supplierId;
    int quantity;
    String deliveryAddress;
    Date deliveryDate;
    String customerId;
    String customerName;
    String customerEmail;
}
