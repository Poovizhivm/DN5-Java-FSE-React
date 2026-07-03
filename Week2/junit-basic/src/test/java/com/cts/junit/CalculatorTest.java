package com.cts.junit;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    Calculator calculator;

    @BeforeAll
    static void beforeAllTests() {
        System.out.println("Before All Tests");
    }

    @BeforeEach
    void setUp() {
        System.out.println("Creating Calculator Object");
        calculator = new Calculator();
    }

    @Test
    void testAddition() {
        assertEquals(5, calculator.add(2,3));
    }

    @Test
    void testEven() {
        assertTrue(calculator.isEven(8));
    }

    @Test
    void testOdd() {
        assertFalse(calculator.isEven(7));
    }

    @AfterEach
    void tearDown() {
        System.out.println("Test Completed");
    }

    @AfterAll
    static void afterAllTests() {
        System.out.println("All Tests Finished");
    }
}