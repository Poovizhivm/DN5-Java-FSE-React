package com.cognizant.spring_learn.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            CountryNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleCountryException(
            CountryNotFoundException ex) {

        return ex.getMessage();
    }
}