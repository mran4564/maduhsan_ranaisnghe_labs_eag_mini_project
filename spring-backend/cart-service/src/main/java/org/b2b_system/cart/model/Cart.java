package org.b2b_system.cart.model;

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
@Table(name = "cart")
public class Cart {

    @Id
    @SequenceGenerator(name = "CART_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CART_SEQ")
    private int id;
    private UUID cartId;
    private UUID customerId;
    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cart", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    private List<CartItem> cartItems = new ArrayList<>();

    public  void addCartItems(CartItem newCartItem){
        this.cartItems.add(newCartItem);
        updateTotal(newCartItem.getTotal());
    }

    public void reduceTotal(BigDecimal itemTotal){
        this.total = total.subtract(itemTotal);
    }

    public void updateTotal(BigDecimal itemTotal){
        this.total = total.add(itemTotal);
    }

    public void updateTotal(BigDecimal itemTotalNew,BigDecimal itemTotalPrev){
        this.total = total.subtract(itemTotalPrev);
        this.total = total.add(itemTotalNew);
    }
}
