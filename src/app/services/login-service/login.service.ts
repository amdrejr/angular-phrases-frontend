import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }

  login(username:string, password:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/login', {username, password})
  }

  createAccount(username:string, password:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/signup', {username, password})
  }

  validateToken(): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/validate', this.token);
  }

  get token(): AuthResponse {
    let token;
    try {
      token = localStorage.getItem('token');
    } catch {
      token = '';
    }
    return { "token": token || '' };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }
}

interface AuthResponse {
  token: string;
}
