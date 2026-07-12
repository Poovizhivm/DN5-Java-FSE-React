package com.cognizant.orm_learn;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.model.Skill;
import com.cognizant.orm_learn.repository.EmployeeRepository;
import com.cognizant.orm_learn.repository.SkillRepository;
import com.cognizant.orm_learn.service.CountryService;
import com.cognizant.orm_learn.service.StockService;

@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CountryService countryService;

    @Autowired
    private StockService stockService;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        // ---------------- COUNTRY ----------------

        System.out.println("All Countries:");
        countryService.getAllCountries()
                .forEach(System.out::println);

        System.out.println("----------------");

        System.out.println("Country IN:");
        System.out.println(
                countryService.getCountry("IN"));

        // ---------------- STOCK ----------------

        System.out.println("----------------");

        System.out.println("Facebook Stocks");
        stockService.getFacebookStocks()
                .forEach(System.out::println);

        // ---------------- EMPLOYEE ----------------

        Employee emp =
                repository.findById(1)
                        .orElse(null);

        if (emp == null) {

            emp = new Employee();

            emp.setId(1);
            emp.setName("Poovizhi");
            emp.setSalary(50000);
            emp.setPermanent(true);
            emp.setDateOfBirth(
                    LocalDate.of(2003, 1, 1));

            repository.save(emp);
        }

        System.out.println("----------------");

        System.out.println("Permanent Employees");

        repository
                .getAllPermanentEmployees()
                .forEach(System.out::println);

        System.out.println("----------------");

        System.out.println(
                "Average Salary : "
                        + repository.getAverageSalary());

        // ---------------- MANY TO MANY ----------------

        Skill s1 =
                skillRepository.findById(1)
                        .orElse(
                                new Skill(1, "Java"));

        Skill s2 =
                skillRepository.findById(2)
                        .orElse(
                                new Skill(2, "Spring"));

        skillRepository.save(s1);
        skillRepository.save(s2);

        emp.setSkills(
                List.of(s1, s2));

        repository.save(emp);

        System.out.println(
                "ManyToMany completed");
    }
}