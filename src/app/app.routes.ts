import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
    // canActivate: [canActivateGuard]
  },
  {
    path: 'sign-up',
    component: SignupPageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
