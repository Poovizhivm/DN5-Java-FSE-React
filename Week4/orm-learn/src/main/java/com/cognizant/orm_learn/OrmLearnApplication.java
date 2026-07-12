package com.cognizant.orm_learn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.repository.EmployeeRepository;

@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private EmployeeRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }

    @Override
public void run(String... args)
        throws Exception {

    System.out.println("JPQL Query:");

    repository.getAllEmployees()
            .forEach(System.out::println);

    System.out.println("----------------");

    System.out.println(
            "Salary > 30000");

    repository
            .getEmployeesBySalary(30000)
            .forEach(System.out::println);
}
}