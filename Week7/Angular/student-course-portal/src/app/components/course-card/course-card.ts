import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Observable } from 'rxjs';

// NgRx imports
import { Store } from '@ngrx/store';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges, OnInit {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus?: string };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  enrolledIds$: Observable<number[]>;
  isCurrentlyEnrolled = false;

  constructor(private store: Store) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    this.enrolledIds$.subscribe((ids) => {
      this.isCurrentlyEnrolled = ids.includes(Number(this.course.id));
    });
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isCurrentlyEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded,
    };
  }

  getBorderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed':
        return '#16a34a';
      case 'failed':
        return '#dc2626';
      case 'pending':
      default:
        return '#94a3b8';
    }
  }

  toggleExpand(event: Event) {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(event: Event) {
    event.stopPropagation();
    const cId = Number(this.course.id);
    if (this.isCurrentlyEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: cId }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: cId }));
    }
    this.enrollRequested.emit(cId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('Course input changed:', {
        previous: prev,
        current: curr
      });
    }
  }
}
