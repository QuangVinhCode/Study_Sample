package edu.vn.study.exception;

import lombok.Data;

@Data
public class ClassExceptionResponse {
    private String message;

    public ClassExceptionResponse(String message) {
        this.message = message;
    }
}
