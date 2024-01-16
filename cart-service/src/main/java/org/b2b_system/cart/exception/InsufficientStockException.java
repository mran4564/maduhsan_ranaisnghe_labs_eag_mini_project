package org.b2b_system.cart.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message){
        super(message);
    }
}

