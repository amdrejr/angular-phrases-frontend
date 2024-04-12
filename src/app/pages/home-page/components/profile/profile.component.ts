import { Component, OnInit, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PhraseCardComponent } from '../../../../components/phrase-card/phrase-card.component';
import { TextButtonComponent } from '../../../../components/text-button/text-button.component';
import { LoginService } from '../../../../services/login-service/login.service';
import { NotificationService } from '../../../../services/notification-service/notification.service';
import { PhraseDataService } from '../../../../services/phrase-data/phrase-data.service';
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
  user = this.userDataService.me;
  myPhrases = this.phraseDataService.myPhrases;

  constructor(
    private userDataService: UserDataService,
    private loginService: LoginService,
    private phraseDataService: PhraseDataService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { }

  totalLikes = computed(()=> this.myPhrases().reduce((acc, phrase) => acc + phrase.likes, 0));

  logout = ():void => this.loginService.logout();

  deletePhrase = (id: number):void => {
   this.phraseDataService.deletePhrase(id).subscribe({
    next: (data) => {
      this.myPhrases().splice(this.myPhrases().findIndex(phrase => phrase.id === id), 1);
      this.notificationService.openNotification('Phrase deleted!');
    },
    error: (err) => {
      console.error('Error:', err);
    }
    });
  }

}

