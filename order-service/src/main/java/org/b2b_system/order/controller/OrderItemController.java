package org.b2b_system.order.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.order.dto.orderitem.OrderItemResponse;
import org.b2b_system.order.dto.orderitem.UpdateOrderItemStatusRequest;
import org.b2b_system.order.service.OrderItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orderItems")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<List<OrderItemResponse>> getOrderItems(@RequestParam(name = "supplier_id") UUID supplierId) {
        return ResponseEntity.ok(orderItemService.getOrderItems(supplierId));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OrderItemResponse> updateOrderItemStatus(@PathVariable("id") UUID id,
                                                                   @RequestBody @Valid UpdateOrderItemStatusRequest request) {
        return ResponseEntity.ok(orderItemService.updateOrderItemStatus(id, request));
    }

}
