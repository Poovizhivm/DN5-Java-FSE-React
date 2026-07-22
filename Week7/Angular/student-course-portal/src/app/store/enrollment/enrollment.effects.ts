import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EnrollmentService } from '../../services/enrollment';
import * as EnrollmentActions from './enrollment.actions';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      switchMap(() =>
        this.enrollmentService.getEnrolledCourses().pipe(
          map((courses) =>
            EnrollmentActions.setEnrolledCourses({
              courseIds: courses.map((c) => Number(c.id)),
            })
          ),
          catchError(() => of({ type: 'NOOP' }))
        )
      )
    )
  );

  enrollInCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.enrollInCourse),
      mergeMap(({ courseId }) =>
        this.enrollmentService.enroll(courseId).pipe(
          map(() => EnrollmentActions.enrollInCourseSuccess({ courseId })),
          catchError(() => of({ type: 'NOOP' }))
        )
      )
    )
  );

  unenrollFromCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.unenrollFromCourse),
      mergeMap(({ courseId }) =>
        this.enrollmentService.unenroll(courseId).pipe(
          map(() => EnrollmentActions.unenrollFromCourseSuccess({ courseId })),
          catchError(() => of({ type: 'NOOP' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService
  ) {}
}
