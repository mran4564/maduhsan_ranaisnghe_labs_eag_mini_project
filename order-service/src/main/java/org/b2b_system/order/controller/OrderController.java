package org.b2b_system.order.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.order.dto.CreateOrderRequest;
import org.b2b_system.order.dto.OrderResponse;
import org.b2b_system.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody @Valid CreateOrderRequest request
    ) {
        return ResponseEntity.ok(orderService.createCategory(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(orderService.getOrderByOrderId(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(@RequestParam(name = "customer_id", required = false) UUID customerId) {
        return ResponseEntity.ok(orderService.getOrders(customerId));
    }

}
