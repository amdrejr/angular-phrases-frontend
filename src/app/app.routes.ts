import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { canActivateGuard } from './security/authguard/authguard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
    canActivate: [canActivateGuard],
    children: [
      {
        path: '',
        redirectTo: 'for-you',
        pathMatch: 'full'
      },
      {
        path: 'for-you',
        loadComponent: () => import('./pages/home-page/components/list-for-you/list-for-you.component').then(m => m.ListForYouComponent)
      },
      {
        path: 'following',
        loadComponent: () => import('./pages/home-page/components/list-following/list-following.component').then(m => m.ListFollowingComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/home-page/components/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/home-page/components/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./pages/home-page/components/user-profile/user-profile.component').then(m => m.UserProfileComponent)
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
