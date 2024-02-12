package org.b2b_system.product.exception;

public class NoSuchElementFoundException extends RuntimeException {
    public NoSuchElementFoundException(String message){
        super(message);
    }
}
