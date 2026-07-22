import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve courses and filter out courses with credits <= 0', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Data Structures');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP error gracefully and propagate custom error message (with retry)', () => {
    service.getCourses().subscribe({
      next: () => fail('Should have failed with a 500 error'),
      error: (error) => {
        expect(error.message).toContain('Failed to load courses. Please try again.');
      },
    });

    // 1st request fails, triggers 1st retry
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // 1st retry fails, triggers 2nd retry
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // 2nd retry fails, propagates error to subscriber
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
