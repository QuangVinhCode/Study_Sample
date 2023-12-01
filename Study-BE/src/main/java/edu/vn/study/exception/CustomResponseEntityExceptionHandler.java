package edu.vn.study.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ClassException.class)
    public final ResponseEntity<Object> handleClassException(ClassException ex, WebRequest request){
        ClassExceptionResponse classExceptionResponse = new ClassExceptionResponse(ex.getMessage());

        return  new ResponseEntity<>(classExceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
