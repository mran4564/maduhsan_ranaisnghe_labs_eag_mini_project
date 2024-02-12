package org.b2b_system.product.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message){
        super(message);
    }
}

