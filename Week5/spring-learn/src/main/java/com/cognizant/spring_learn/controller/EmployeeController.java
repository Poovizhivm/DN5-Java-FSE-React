package com.cognizant.spring_learn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.spring_learn.model.Employee;
import com.cognizant.spring_learn.service.EmployeeService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    @PostMapping("/employees")
    public Employee addEmployee(
        @Valid
        @RequestBody Employee employee) {

        return employeeService.addEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public Employee getEmployee(
            @PathVariable int id) {

        return employeeService.getEmployee(id);
    }

    @PutMapping("/employees/{id}")
    public Employee updateEmployee(
        @PathVariable int id,
        @Valid
        @RequestBody Employee employee) {

        return employeeService.updateEmployee(
            id,
            employee);
    }

    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(
            @PathVariable int id) {

        return employeeService.deleteEmployee(id);
    }
}