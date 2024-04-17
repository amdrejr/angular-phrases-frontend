import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PhraseCardComponent } from '../../../../components/phrase-card/phrase-card.component';
import { TextButtonComponent } from '../../../../components/text-button/text-button.component';
import { UsersBoxDialogComponent } from '../../../../components/users-box-dialog/users-box-dialog.component';
import { Phrase } from '../../../../models/phrase';
import { User } from '../../../../models/user';
import { PhraseDataService } from '../../../../services/phrase-data/phrase-data.service';
import { UserDataService } from '../../../../services/user-data-service/user-data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatIconModule,
    TextButtonComponent,
    PhraseCardComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  implements OnInit {
  user: User = {
    id: 0,
    username: '',
    allFollowing: [],
    allFollowers: [],
  };
  userPhrases: Phrase[] = [];
  totalLikes = ()=> this.userPhrases.reduce((acc, phrase) => acc + phrase.likes, 0);
  isFollowing:boolean = false;

  constructor(
    private userDataService: UserDataService,
    private phraseDataService: PhraseDataService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // o subscribe é para que ao navegar de 'users/1' para 'users/2' o componente seja atualizado
      // toda vez que o parâmetro id da rota mudar, o ngOnInit será chamado novamente

      const userId = Number(params.get('id'));

      this.userDataService.getUserById(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.isFollowing = this.user.allFollowers.map(f => f.id).includes(Number(localStorage.getItem('userId')));
        }
      });

      this.phraseDataService.getPhrasesByUserId(userId).subscribe({
        next: (page) => {
          this.userPhrases = page.content;
        }
      });
    });
  }

  openFollowingDialog():void {
    this.dialog.open(
      UsersBoxDialogComponent,
      {
        data: {
          title: 'Following',
          array: this.user.allFollowing,
          noContent: 'No users followed'
        }
      }
    );
  }

  openFollowersDialog():void {
    this.dialog.open(
      UsersBoxDialogComponent,
      {
        data: {
          title: 'Followers',
          array: this.user.allFollowers,
          noContent: 'No followers'
        }
      }
    );
  }

  followUser(): void {
    this.userDataService.followUserById(this.user.id).subscribe({
      next: (isFollowing) => {
        this.isFollowing = isFollowing;
      },
      complete: () => {
        if(this.isFollowing){
          this.user.allFollowers.push(this.userDataService.myNameId);
        } else {
          this.user.allFollowers = this.user.allFollowers.filter((follower) => follower.id !== this.userDataService.myNameId.id);
        }
      }
    });
  }
}
