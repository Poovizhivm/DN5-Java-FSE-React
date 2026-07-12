package com.cognizant.orm_learn.service;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository repository;

    public List<Country> getAllCountries() {
        return repository.findAll();
    }

    public Country getCountry(String code) {
        return repository.findById(code).orElse(null);
    }

    public void addCountry(Country country) {
        repository.save(country);
    }

    public void updateCountry(Country country) {
        repository.save(country);
    }

    public void deleteCountry(String code) {
        repository.deleteById(code);
    }

    public List<Country> searchCountry(String text) {
        return repository
                .findByNameContainingIgnoreCaseOrderByNameAsc(text);
    }

    public List<Country> findStartingWith(String alphabet) {
        return repository.findByNameStartingWith(alphabet);
    }
}