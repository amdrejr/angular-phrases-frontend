import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router:Router) { }

  login(username:string, password:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url, {username, password})
  }

  isLoggedIn(): boolean {
    try {
      const token = localStorage.getItem('token');
      return !!token; // Retorna true se o token estiver presente, caso contrário, retorna false
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}

interface AuthResponse {
  token: string;
}
