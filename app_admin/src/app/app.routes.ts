import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripFormComponent, canActivate: [authGuard] },
  { path: 'trips/:tripCode/edit', component: TripFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'trips' }
];
