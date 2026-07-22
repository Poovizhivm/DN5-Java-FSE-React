import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseList } from './course-list';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Course } from '../../models/course.model';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  let mockRouter: any;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Database Systems', code: 'CS201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({
          initialState: {
            course: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          },
        }),
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => ''
            })
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 109: Assert course cards render match store state
  it('should render course cards corresponding to the mock store state', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  // Step 110: Assert loading indicator visibility when store state transitions to loading
  it('should render loading indicator when store state has loading = true', () => {
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    const loadingText = fixture.debugElement.query(By.css('.loading-state'));
    expect(spinner).toBeTruthy();
    expect(loadingText.nativeElement.textContent).toContain('Loading courses...');
  });
});
