package com.cognizant.orm_learn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.List;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    private int id;
    private String name;
    private double salary;

    public Employee() {
    }

    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
public String toString() {
    return "Employee{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", salary=" + salary +
            '}';
}
@ManyToOne
@JoinColumn(name = "department_id")
private Department department;

public Department getDepartment() {
    return department;
}

public void setDepartment(
        Department department) {
    this.department = department;
}
@ManyToMany
@JoinTable(
        name = "employee_skill",
        joinColumns =
            @JoinColumn(name = "employee_id"),
        inverseJoinColumns =
            @JoinColumn(name = "skill_id")
)
private List<Skill> skills;
public List<Skill> getSkills() {
    return skills;
}

public void setSkills(List<Skill> skills) {
    this.skills = skills;
}
}