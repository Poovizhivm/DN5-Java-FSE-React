package com.library.aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.library.service.BookService.*(..))")
    public void beforeMethod() {
        System.out.println("LoggingAspect: Method execution started...");
    }

    @After("execution(* com.library.service.BookService.*(..))")
    public void afterMethod() {
        System.out.println("LoggingAspect: Method execution completed...");
    }
}