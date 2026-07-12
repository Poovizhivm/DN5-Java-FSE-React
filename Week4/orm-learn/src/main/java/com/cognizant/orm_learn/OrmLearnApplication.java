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
public void run(String... args) throws Exception {

    System.out.println("All Employees:");

    repository.findAll()
            .forEach(System.out::println);

    System.out.println("----------------");

    Employee emp =
            repository.findById(1).orElse(null);

    System.out.println("Employee with ID 1:");
    System.out.println(emp);

    System.out.println("----------------");

    System.out.println(
            "Employee Exists : "
                    + repository.existsById(1));

    System.out.println(
            "Total Employees : "
                    + repository.count());
}
}