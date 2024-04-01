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
    children: [
      {
        path: '',
        redirectTo: 'for-you',
        pathMatch: 'full'
      },
      {
        path: 'for-you',
        loadComponent: () => import('./components/list-for-you/list-for-you.component').then(m => m.ListForYouComponent)
      },
      {
        path: 'following',
        loadComponent: () => import('./components/list-following/list-following.component').then(m => m.ListFollowingComponent)
      }
    ]
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
