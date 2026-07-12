package com.cognizant.orm_learn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.model.Department;
import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.repository.EmployeeRepository;

import com.cognizant.orm_learn.repository.DepartmentRepository;


@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private EmployeeRepository repository;
    @Autowired
    private DepartmentRepository departmentRepository;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }
@Override
public void run(String... args)
        throws Exception {

    Department dept =
            new Department(1, "IT");

    departmentRepository.save(dept);

    Employee emp =
            new Employee(
                    2,
                    "Poovizhi",
                    60000);

    emp.setDepartment(dept);

    repository.save(emp);

    System.out.println(
            "Department and Employee saved.");
}
}