import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url: string = 'http://localhost:8080/users';
  private actualUser: WritableSignal<User> =  signal({
    username: 'loading...',
    id: 0,
    phrases: [],
    allFollowers: [],
    allFollowing: []
  });

  constructor(private http: HttpClient) { }

  private requestMyUserData = ():void =>  {
    this.http.get<User>(
      this.url + '/me',
      {headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }}
    ).subscribe(
      (user: User) => {
        localStorage.setItem('userId', user.id.toString());
        this.actualUser.set(user);
      }
    );
  }

  public getUserById = (id: number): Observable<User> => {
    return this.http.get<User>(
      this.url + '/' + id,
      {headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }}
    );
  }

  public followUserById = (id: number): Observable<boolean> => {
    return this.http.put<boolean>(
      this.url + '/' + id + '/follow',
      {},
      {headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }}
    )
  }

  get me () {
    console.log("Requisitando ME");
    this.requestMyUserData();
    return this.actualUser;
  }

  get myNameId () {
    return {
      id: this.actualUser().id,
      username: this.actualUser().username,
    }
  }
}
