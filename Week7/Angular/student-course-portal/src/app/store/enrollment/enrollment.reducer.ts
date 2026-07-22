import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialState: EnrollmentState = {
  enrolledCourseIds: [],
};

export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: courseIds,
  })),
  on(EnrollmentActions.enrollInCourseSuccess, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
      ? state.enrolledCourseIds
      : [...state.enrolledCourseIds, courseId],
  })),
  on(EnrollmentActions.unenrollFromCourseSuccess, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  }))
);
