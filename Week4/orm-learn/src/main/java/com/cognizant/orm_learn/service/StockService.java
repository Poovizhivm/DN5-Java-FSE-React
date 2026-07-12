package com.cognizant.orm_learn.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.model.Stock;
import com.cognizant.orm_learn.repository.StockRepository;

@Service
public class StockService {

    @Autowired
    private StockRepository repository;

    public List<Stock> getFacebookStocks() {

        return repository.findByCodeAndDateBetween(
                "FB",
                LocalDate.of(2019, 9, 1),
                LocalDate.of(2019, 9, 30));
    }

    public List<Stock> getGoogleStocks() {

        return repository.findByCodeAndCloseGreaterThan(
                "GOOGL",
                1250);
    }

    public List<Stock> getTopVolumeStocks() {

        return repository.findTop3ByOrderByVolumeDesc();
    }

    public List<Stock> getLowestNetflixStocks() {

        return repository.findTop3ByCodeOrderByCloseAsc(
                "NFLX");
    }
}