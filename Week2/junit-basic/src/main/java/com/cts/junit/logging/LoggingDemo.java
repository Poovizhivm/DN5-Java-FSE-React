package com.cts.junit.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingDemo {

    // Create Logger object
    private static final Logger logger =
            LoggerFactory.getLogger(LoggingDemo.class);

    public static void main(String[] args) {

        logger.trace("This is TRACE message");

        logger.debug("This is DEBUG message");

        logger.info("Application Started Successfully");

        logger.warn("Low Memory Warning");

        logger.error("Database Connection Failed");

    }
}