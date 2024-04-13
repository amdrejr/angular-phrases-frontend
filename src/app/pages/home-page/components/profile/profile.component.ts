import { Component, OnInit, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
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
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void { }

  totalLikes = computed(()=> this.myPhrases().reduce((acc, phrase) => acc + phrase.likes, 0));

  logout = ():void => this.loginService.logout();

  deletePhrase = (id: number):void => {
    this.phraseDataService.deletePhrase(id);
  }

  openExclusionDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se o usuário clicou em "confirmar", exclua a frase
        this.deletePhrase(id);
      }
    });
  }

}

