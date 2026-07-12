package com.cognizant.orm_learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cognizant.orm_learn.model.Employee;
import java.util.List;
public interface EmployeeRepository
        extends JpaRepository<Employee, Integer> {
                List<Employee> findByName(String name);    
                List<Employee> findBySalaryGreaterThan(double salary);


}