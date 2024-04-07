import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Phrase } from '../../models/phrase';
import { PhraseDataService } from '../../services/phrase-data/phrase-data.service';

@Component({
  selector: 'app-phrase-card',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './phrase-card.component.html',
  styleUrl: './phrase-card.component.css'
})
export class PhraseCardComponent {
  @Input() hideAuthor = false;
  @Input() hidePhoto = false;

  @Input() phrase: Phrase = {
    id: 0,
    text: '',
    allUsersLiked: [],
    author: 'teste',
    date: '',
    likes: 0,
  };

  constructor(private phraseDataService: PhraseDataService) { }

  get dateFormatted(): string {
    const date = new Date(this.phrase.date);
    return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  get isLiked(): boolean {
    return this.phrase.allUsersLiked.map((user) => user.id).includes(Number(localStorage.getItem('userId')));
  }

  like(): void {
    this.phraseDataService.likePhrase(this.phrase.id).subscribe({
      next: (data) => {
        this.phrase = data;
      },
      error: (err) => {
        console.log('ERROR Error:', err);
      },
    });
  }

}


