package com.library.aspect;

public class LoggingAspect {

    public void beforeMethod() {
        System.out.println("LoggingAspect: Method execution started...");
    }

    public void afterMethod() {
        System.out.println("LoggingAspect: Method execution completed...");
    }
}