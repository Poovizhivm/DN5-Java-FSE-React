package com.cognizant.orm_learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cognizant.orm_learn.model.Employee;

public interface EmployeeRepository
        extends JpaRepository<Employee, Integer> {

    // Derived Queries
    List<Employee> findByName(String name);

    List<Employee> findBySalaryGreaterThan(double salary);

    // JPQL Query
    @Query("SELECT e FROM Employee e")
    List<Employee> getAllEmployees();

    @Query(
            "SELECT e FROM Employee e " +
            "WHERE e.salary > :salary"
    )
    List<Employee> getEmployeesBySalary(
            @Param("salary")
            double salary
    );

    // Native Query
    @Query(
            value = "SELECT * FROM employee",
            nativeQuery = true
    )
    List<Employee> getAllEmployeesNative();

    @Query(
            value =
                    "SELECT * FROM employee " +
                    "WHERE salary > ?1",
            nativeQuery = true
    )
    List<Employee> getEmployeesNative(
            double salary
    );

    // HQL Query
    @Query(
            "SELECT e FROM Employee e " +
            "WHERE e.permanent = true"
    )
    List<Employee> getAllPermanentEmployees();

    // Average Salary Query
    @Query(
            "SELECT AVG(e.salary) FROM Employee e"
    )
    Double getAverageSalary();
}