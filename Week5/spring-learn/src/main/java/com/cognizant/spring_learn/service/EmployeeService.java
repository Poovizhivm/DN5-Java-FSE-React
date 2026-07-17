package com.cognizant.spring_learn.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.spring_learn.model.Employee;

@Service
public class EmployeeService {

    private static List<Employee> employees =
            new ArrayList<>();

    static {

        employees.add(
                new Employee(
                        1,
                        "Poovizhi",
                        50000));

        employees.add(
                new Employee(
                        2,
                        "John",
                        60000));
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    public Employee getEmployee(int id) {

    return employees.stream()
            .filter(e -> e.getId() == id)
            .findFirst()
            .orElse(null);
}

public Employee addEmployee(Employee employee) {

    employees.add(employee);
    return employee;
}

public Employee updateEmployee(
        int id,
        Employee employee) {

    Employee emp = getEmployee(id);

    if (emp != null) {
        emp.setName(employee.getName());
        emp.setSalary(employee.getSalary());
    }

    return emp;
}

public String deleteEmployee(int id) {

    Employee emp = getEmployee(id);

    if (emp != null) {
        employees.remove(emp);
        return "Employee Deleted";
    }

    return "Employee Not Found";
}
}