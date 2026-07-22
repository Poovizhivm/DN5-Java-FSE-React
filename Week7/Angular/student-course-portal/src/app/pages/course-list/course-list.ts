import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// NgRx imports
import { Store } from '@ngrx/store';
import { loadCourses } from '../../store/course/course.actions';
import { loadEnrollments } from '../../store/enrollment/enrollment.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchTerm$ = new BehaviorSubject<string>('');
  filteredCourses$: Observable<Course[]>;
  selectedCourseId: number | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);

    // Combine courses stream and search term stream reactively
    this.filteredCourses$ = combineLatest([this.courses$, this.searchTerm$]).pipe(
      map(([courses, search]) => {
        if (!search.trim()) {
          return courses;
        }
        const term = search.toLowerCase();
        return courses.filter(
          (c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
        );
      })
    );
  }

  ngOnInit(): void {
    // Read query parameters
    this.route.queryParamMap.subscribe((queryParams) => {
      const term = queryParams.get('search') || '';
      this.searchTerm$.next(term);
    });

    this.store.dispatch(loadCourses());
    this.store.dispatch(loadEnrollments());
  }

  get searchVal(): string {
    return this.searchTerm$.getValue();
  }

  set searchVal(value: string) {
    this.searchTerm$.next(value);
  }

  onSearchChange() {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchVal || null },
      queryParamsHandling: 'merge',
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return Number(course.id);
  }

  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
  }

  onCardClick(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }
}
