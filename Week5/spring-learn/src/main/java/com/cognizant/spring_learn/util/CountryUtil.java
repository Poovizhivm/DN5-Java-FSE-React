package com.cognizant.spring_learn.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CountryUtil {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryUtil.class);

    public void display() {
        LOGGER.info("Inside CountryUtil");
    }
}