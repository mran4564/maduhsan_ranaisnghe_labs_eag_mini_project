package org.b2b_system.order.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @SequenceGenerator(name = "ORDER_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORDER_SEQ")
    private int id;
    private UUID orderId;
    private UUID customerId;
    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();
    private String deliveryAddress;

    public  void addOrderItems(List<OrderItem> newOrderItems){
        this.orderItems.addAll(newOrderItems);
    }

    public void updateTotal(BigDecimal itemTotal){
        this.total = total.add(itemTotal);
    }

}
