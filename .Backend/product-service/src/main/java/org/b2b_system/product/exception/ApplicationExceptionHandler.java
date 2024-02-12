package org.b2b_system.product.exception;

import com.fasterxml.jackson.core.JsonParseException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.b2b_system.product.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.NotAcceptableStatusException;
import org.springframework.web.server.UnsupportedMediaTypeStatusException;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    Logger logger = LoggerFactory.getLogger(ApplicationExceptionHandler.class);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
        return exception.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
    }

    @ExceptionHandler(EntityAlreadyExistsException.class)
    public ResponseEntity<Object> handleUserAlreadyExistsException(EntityAlreadyExistsException e,
                                                                   HttpServletRequest request) {
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .status(HttpStatus.CONFLICT)
                        .message(e.getMessage())
                        .uri(request.getRequestURI())
                        .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                        .build(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleDatabaseAccessException(DataAccessException e,
                                                                HttpServletRequest request) {
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .message(Constants.DATABASE_ACCESS_EXCEPTION_MESSAGE)
                        .uri(request.getRequestURI())
                        .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                        .build(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NoSuchElementFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleNoSuchElementFoundException(NoSuchElementFoundException e,
                                                                    HttpServletRequest request) {
        logger.error("Failed to find the requested element", e);
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .message(e.getMessage())
                        .uri(request.getRequestURI())
                        .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                        .build(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InternalException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleInternalException(InternalException e,
                                                          HttpServletRequest request) {
        logger.error("Internal Server error occurred with request", e);
        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .message(e.getMessage())
                        .uri(request.getRequestURI())
                        .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                        .build(), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleUnknownException(Exception e, HttpServletRequest request) {

        if (e instanceof JsonParseException || e instanceof UnsupportedMediaTypeStatusException ||
                e instanceof InvalidMediaTypeException || e instanceof NotAcceptableStatusException) {
            logger.error("Invalid Json request {}", e.getMessage());
        }

        logger.error("Unknown exception occurred {} {}", ExceptionUtils.getMessage(e),
                ExceptionUtils.getStackTrace(e));

        return new ResponseEntity<>(
                ErrorResponse.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .message(Constants.UNEXPECTED_ERROR_OCCURRED)
                        .uri(request.getRequestURI())
                        .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                        .build(), HttpStatus.BAD_REQUEST);
    }
}