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

  ngOnInit(): void {
    console.log("phrase:", this.phrase)
  }

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
    // Verifica se o formato é 'Sat Apr 20 17:04:12 BRT 2024'
    if (this.phrase.date.length > 25) {
      // Mapeamento dos meses
      enum enumMonths {
        Jan = '01', Feb = '02', Mar = '03', Apr = '04',
        May = '05', Jun = '06', Jul = '07', Aug = '08',
        Sep = '09', Oct = '10', Nov = '11', Dec = '12'
      }

      const mes:string = this.phrase.date.substring(4, 7);

      // Extrair os componentes da data
      const day = this.phrase.date.substring(8, 10);
      const month = enumMonths[mes as keyof typeof enumMonths];
      const year = this.phrase.date.substring(24, 28);
      const hour = this.phrase.date.substring(11, 13);
      const minute = this.phrase.date.substring(14, 16);

      // Formatar os componentes na string desejada
      const formattedDate = `${day}/${month}/${year}, ${hour}:${minute}`;

      return formattedDate;
    }

    const date = new Date(this.phrase.date);

    if (!isNaN(date.getTime())) {
        return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    // Formato não reconhecido, retorna a data original
    return this.phrase.date;
  }

  like(): void {
    this.phraseDataService.likePhrase(this.phrase.id).then(phrase => this.phrase = phrase);
  }

}


