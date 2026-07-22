import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth';
import { errorHandlerInterceptor } from './interceptors/error-handler';
import { loadingInterceptor } from './interceptors/loading';

// NgRx imports
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';
import { EnrollmentEffects } from './store/enrollment/enrollment.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    ),
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer,
    }),
    provideEffects([CourseEffects, EnrollmentEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ]
};
