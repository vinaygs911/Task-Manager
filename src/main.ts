import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./app/features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));