import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction('[Enrollment] Enroll In Course', props<{ courseId: number }>());
export const enrollInCourseSuccess = createAction('[Enrollment] Enroll In Course Success', props<{ courseId: number }>());
export const unenrollFromCourse = createAction('[Enrollment] Unenroll From Course', props<{ courseId: number }>());
export const unenrollFromCourseSuccess = createAction('[Enrollment] Unenroll From Course Success', props<{ courseId: number }>());
export const setEnrolledCourses = createAction('[Enrollment] Set Enrolled Courses', props<{ courseIds: number[] }>());
export const loadEnrollments = createAction('[Enrollment] Load Enrollments');
