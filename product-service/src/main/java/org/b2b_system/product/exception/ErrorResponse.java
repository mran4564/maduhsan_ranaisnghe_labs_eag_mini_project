package org.b2b_system.product.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private HttpStatus status;
    private String message;
    private String uri;
    private ZonedDateTime timeStamp;
    private StackTraceElement trace;
}
