package com.cognizant.orm_learn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.model.Department;
import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.repository.EmployeeRepository;
import java.util.List;

import com.cognizant.orm_learn.model.Skill;
import com.cognizant.orm_learn.repository.SkillRepository;
import com.cognizant.orm_learn.repository.DepartmentRepository;


@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private EmployeeRepository repository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private SkillRepository skillRepository;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }
@Override
public void run(String... args)
        throws Exception {

    Skill s1 =
            new Skill(1, "Java");

    Skill s2 =
            new Skill(2, "Spring");

    skillRepository.save(s1);
    skillRepository.save(s2);

    Employee emp =
            repository.findById(2)
                    .orElse(null);

    emp.setSkills(
            List.of(s1, s2));

    repository.save(emp);

    System.out.println(
            "ManyToMany completed");
}
}