import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  enrolledStudents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.courseService.getCourseById(id);
      }),
      tap((course) => {
        this.course = course;
      }),
      /*
       * WHY switchMap CANCELS PREVIOUS INNER OBSERVABLES:
       *
       * 1. Auto-Unsubscribe: When the source observable emits a new value (e.g. route param changes from course 1 to course 2),
       *    switchMap immediately unsubscribes from the previous active inner observable (fetching students for course 1).
       * 2. Prevents Race Conditions: This ensures slow, out-of-order network responses from previous requests do not overwrite
       *    the display of the most current request.
       */
      switchMap((course) => {
        if (!course) {
          return of([]);
        }
        return this.enrollmentService.getStudentsByCourse(course.id);
      })
    ).subscribe({
      next: (students) => {
        this.enrolledStudents = students;
      },
      error: (err) => {
        console.log('Error loading course detail and students:', err);
        this.course = undefined;
        this.enrolledStudents = [];
      },
    });
  }
}
