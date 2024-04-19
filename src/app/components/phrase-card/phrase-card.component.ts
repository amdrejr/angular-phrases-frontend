import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Phrase } from '../../models/phrase';
import { PhraseDataService } from '../../services/phrase-data/phrase-data.service';
import { TextButtonComponent } from '../text-button/text-button.component';
import { UsersBoxDialogComponent } from '../users-box-dialog/users-box-dialog.component';

@Component({
  selector: 'app-phrase-card',
  standalone: true,
  imports: [
    MatIconModule,
    TextButtonComponent
  ],
  templateUrl: './phrase-card.component.html',
  styleUrl: './phrase-card.component.css'
})
export class PhraseCardComponent implements OnInit {
  @Input() hideAuthor = false;
  @Input() hidePhoto = false;
  @Input() usersLiked = false;

  @Input() phrase: Phrase = {
    id: 0,
    text: '',
    isLikedByMe: false,
    author: { id: 0, username: '' },
    date: '',
    likes: 0,
  };

  constructor(
    private router: Router,
    private phraseDataService: PhraseDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  redirectToUser(): void {
    console.log("redirectToUser")
    if(this.phrase.author.id === Number(localStorage.getItem('userId'))){
      this.router.navigate(['/home/profile']);
    } else {
      this.router.navigate(['/home/users/' + this.phrase.author.id]);
    }
  }

  usersLikedBox() {
    this.phraseDataService.requestWhoLiked(this.phrase.id).subscribe({
      next: (users) => {
        this.dialog.open(
          UsersBoxDialogComponent,
          {
            data: {
              title: 'Users liked',
              array: users,
              noContent: 'No users liked this phrase'
            }
          }
        );
      }
    });
  }

  get dateFormatted(): string {
    const date = new Date(this.phrase.date);
    return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  like(): void {
    this.phraseDataService.likePhrase(this.phrase.id).then(phrase => this.phrase = phrase);
  }

}


