import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary/course-summary';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  liveCoursesCount = 0;

  constructor(private courseService: CourseService) {}

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
    this.loadCourseCount();
    console.log('HomeComponent initialised — courses loaded');
  }

  loadCourseCount() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.liveCoursesCount = courses.length;
      },
      error: (err) => console.log('Error loading course count:', err)
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
