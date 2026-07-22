import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap((courses) => console.log('Courses loaded (side-effect in tap):', courses.length)),
      /*
       * WHY TAP IS PREFERRED OVER SIDE EFFECTS INSIDE MAP:
       *
       * 1. Single Responsibility: 'tap' is designed specifically to execute side-effects (e.g., logging, triggering analytics, caching)
       *    without modifying the values in the stream.
       * 2. 'map' is strictly for transformation: 'map' should only transform data. Placing side-effects in map
       *    obscures the transformation logic and makes testing/debugging harder.
       */
      map((courses) => courses.filter((c) => c.credits > 0)),
      catchError((err) => {
        console.error('HTTP Error in CourseService:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.log(`HTTP Error fetching course ${id}:`, err);
        return throwError(() => new Error('Failed to load course details.'));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
