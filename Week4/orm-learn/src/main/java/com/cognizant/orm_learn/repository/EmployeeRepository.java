package com.cognizant.orm_learn.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cognizant.orm_learn.model.Employee;
import java.util.List;
public interface EmployeeRepository
        extends JpaRepository<Employee,Integer>{

    List<Employee> findByName(String name);

    List<Employee>
    findBySalaryGreaterThan(double salary);

    @Query("SELECT e FROM Employee e")
    List<Employee> getAllEmployees();

    @Query(
            "SELECT e FROM Employee e " +
            "WHERE e.salary > :salary")
    List<Employee>
    getEmployeesBySalary(
            @Param("salary")
            double salary);
}