import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCard } from './course-card';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SimpleChange } from '@angular/core';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse = {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed' as const,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            course: { courses: [mockCourse], loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course name in template', () => {
    component.course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };
    fixture.detectChanges();
    const courseNameEl = fixture.debugElement.query(By.css('.course-name')).nativeElement;
    expect(courseNameEl.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested event when enroll button is clicked', () => {
    spyOn(component.enrollRequested, 'emit');
    
    const enrollBtn = fixture.debugElement.query(By.css('.btn-enroll')).nativeElement;
    enrollBtn.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log to console when input course changes', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });

    expect(console.log).toHaveBeenCalled();
  });
});
