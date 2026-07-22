import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseService } from './course';
import { Course } from '../models/course.model';

interface Enrollment {
  id: string;
  courseId: number;
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';
  private enrolledCourseIds: number[] = [];

  constructor(private http: HttpClient, private courseService: CourseService) {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.http.get<Enrollment[]>(this.apiUrl).subscribe({
      next: (enrollments) => {
        this.enrolledCourseIds = enrollments.map((e) => Number(e.courseId));
      },
      error: (err) => console.error('Error loading enrollments:', err)
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  enroll(courseId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, { courseId }).pipe(
      tap(() => {
        if (!this.enrolledCourseIds.includes(courseId)) {
          this.enrolledCourseIds.push(courseId);
        }
      })
    );
  }

  unenroll(courseId: number): Observable<any> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      map((enrollments) => enrollments.find((e) => Number(e.courseId) === courseId)),
      switchMap((enrollment) => {
        if (enrollment) {
          return this.http.delete(`${this.apiUrl}/${enrollment.id}`).pipe(
            tap(() => {
              this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
            })
          );
        }
        return of(null);
      })
    );
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      switchMap((enrollments) => {
        if (enrollments.length === 0) {
          return of([]);
        }
        const courseRequests = enrollments.map((e) =>
          this.courseService.getCourseById(Number(e.courseId))
        );
        return forkJoin(courseRequests);
      })
    );
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    // Queries student list (in real scenario, filters by course enrollment)
    return this.http.get<any[]>('http://localhost:3000/students').pipe(
      map(students => students.slice(0, 3)) // just return some mock students
    );
  }
}
