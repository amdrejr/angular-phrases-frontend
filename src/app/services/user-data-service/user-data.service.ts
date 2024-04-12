import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
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

  constructor(private http: HttpClient) {
    this.requestMyUserData();
  }

  private requestMyUserData = ():void =>  {
    this.http.get<User>(
      this.url + '/me',
      {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
    ).subscribe(
      (user: User) => {
        localStorage.setItem('userId', user.id.toString());
        this.actualUser.set(user);
      }
    );
  }

  get me () {
    this.requestMyUserData();
    return this.actualUser;
  }
}
