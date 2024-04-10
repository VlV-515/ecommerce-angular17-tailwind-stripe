import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorResponseInterceptor } from './interceptors/error-response.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      progressBar: true,
      preventDuplicates: true,
    }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorResponseInterceptor])
    ),
  ],
};
