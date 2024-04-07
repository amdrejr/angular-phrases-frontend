import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PhraseCardComponent } from '../../../../components/phrase-card/phrase-card.component';
import { TextButtonComponent } from '../../../../components/text-button/text-button.component';
import { User } from '../../../../models/user';
import { LoginService } from '../../../../services/login-service/login.service';
import { UserDataService } from '../../../../services/user-data-service/user-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PhraseCardComponent,
    TextButtonComponent,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private userDataService: UserDataService, private loginService: LoginService) { }

  user: User = {
    username: 'loading...',
    id: 1,
    phrases: [
      {
        id: 1,
        text: 'lorem ipsum dolor sit amet',
        author: "loading...",
        allUsersLiked: [],
        date: "2021-01-01",
        likes: 12
      }
    ],
  };

  totalLikes: number = 0;

  ngOnInit(): void {
    this.userDataService.getMyUserData().subscribe({
      next: (data) => {
        console.log("user data:", data);
        this.user = data;
        this.totalLikes = data.phrases.reduce((acc, phrase) => acc + phrase.likes, 0);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  logout = ():void => this.loginService.logout();

}

