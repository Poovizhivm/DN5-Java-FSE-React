package com.cts.junit;

public class Calculator {

    public int add(int a, int b){
        return a+b;
    }

    public boolean isEven(int number){
        return number % 2 == 0;
    }

    public String getMessage(){
        return "Hello";
    }

    public String getNullValue(){
        return null;
    }

    public int divide(int a, int b){
        return a / b;
    }
}