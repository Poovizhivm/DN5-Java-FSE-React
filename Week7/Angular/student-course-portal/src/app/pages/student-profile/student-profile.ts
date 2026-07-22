import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  studentInfo = {
    name: 'Jane Doe',
    email: 'jane.doe@university.edu',
    gpa: 3.8,
    major: 'Computer Science',
  };

  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
      },
      error: (err) => console.error('Error loading profile enrolled courses:', err)
    });
  }
}
