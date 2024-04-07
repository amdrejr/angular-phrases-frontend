import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getMyUserData(): Observable<User> {
    return this.http.get<User>(
      this.url + '/me',
      {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
    );
  }
}
