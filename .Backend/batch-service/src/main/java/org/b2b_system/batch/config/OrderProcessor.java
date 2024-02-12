package org.b2b_system.batch.config;

import org.b2b_system.batch.dto.OrderDto;
import org.b2b_system.batch.model.Order;
import org.springframework.batch.item.ItemProcessor;

import java.util.UUID;

public class OrderProcessor implements ItemProcessor<OrderDto, Order> {

    @Override
    public Order process(OrderDto orderDto) throws Exception {
         return Order.builder()
                 .supplierId(UUID.fromString(orderDto.getSupplierId()))
                 .customerId(UUID.fromString(orderDto.getCustomerId()))
                 .productId(UUID.fromString(orderDto.getProductId()))
                 .deliveryDate(orderDto.getDeliveryDate())
                 .customerName(orderDto.getCustomerName())
                 .customerEmail(orderDto.getCustomerEmail())
                 .deliveryAddress(orderDto.getDeliveryAddress())
                 .quantity(orderDto.getQuantity())
                 .productName(orderDto.getProductName())
                 .supplierBrandName(orderDto.getSupplierBrandName())
                 .build();
    }
}
