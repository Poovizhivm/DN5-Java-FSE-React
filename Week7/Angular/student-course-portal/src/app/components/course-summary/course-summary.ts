import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary',
  imports: [CommonModule],
  templateUrl: './course-summary.html',
  styleUrl: './course-summary.css',
})
export class CourseSummaryWidget implements OnInit {
  coursesCount = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesCount = courses.length;
      },
      error: (err) => console.error('Error loading summary count:', err)
    });
  }

  addMockCourse() {
    const nextId = this.coursesCount + 1;
    this.courseService.createCourse({
      name: `Mock Course ${nextId}`,
      code: `CS${100 + nextId}`,
      credits: Math.floor(Math.random() * 3) + 2,
      gradeStatus: 'pending',
    }).subscribe({
      next: () => {
        this.loadCount();
      },
      error: (err) => console.error('Error adding mock course:', err)
    });
  }
}
