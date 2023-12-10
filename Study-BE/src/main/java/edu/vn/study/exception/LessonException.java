package edu.vn.study.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LessonException extends  RuntimeException{
    public LessonException(String message) {
        super(message);
    }
}
