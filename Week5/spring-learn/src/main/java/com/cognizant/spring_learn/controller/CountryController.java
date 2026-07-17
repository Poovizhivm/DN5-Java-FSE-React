package com.cognizant.spring_learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.cognizant.spring_learn.exception.CountryNotFoundException;

import com.cognizant.spring_learn.model.Country;
import com.cognizant.spring_learn.util.CountryUtil;

import java.util.List;


@RestController
public class CountryController {

    @Autowired
    private CountryUtil countryUtil;
    @GetMapping("/country")
    public Country getCountry() {
        countryUtil.display();
        return new Country("IN", "India");
    }

    @GetMapping("/countries")
    public List<Country> getAllCountries() {

        return List.of(
                new Country("IN", "India"),
                new Country("US", "United States"),
                new Country("JP", "Japan"),
                new Country("AU", "Australia")
        );
    }
    @GetMapping("/countries/{code}")
    public Country getCountryByCode(
        @PathVariable String code) {

        List<Country> countries = List.of(
            new Country("IN", "India"),
            new Country("US", "United States"),
            new Country("JP", "Japan"),
            new Country("AU", "Australia")
        );

        for (Country country : countries) {
            if (country.getCode()
                    .equalsIgnoreCase(code)) {
                return country;
            }
        }

        throw new CountryNotFoundException(
            "Country not found : " + code);
    }
}