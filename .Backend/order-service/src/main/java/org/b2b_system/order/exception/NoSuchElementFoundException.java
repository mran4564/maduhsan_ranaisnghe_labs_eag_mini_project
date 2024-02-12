package org.b2b_system.order.exception;

public class NoSuchElementFoundException extends RuntimeException {
    public NoSuchElementFoundException(String message){
        super(message);
    }
}
