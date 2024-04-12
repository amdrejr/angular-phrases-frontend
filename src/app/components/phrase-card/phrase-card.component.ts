import { Component, Input, OnInit } from '@angular/core';
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
export class PhraseCardComponent implements OnInit {
  @Input() hideAuthor = false;
  @Input() hidePhoto = false;

  @Input() phrase: Phrase = {
    id: 0,
    text: '',
    allUsersLiked: [],
    author: { id: 0, username: '' },
    date: '',
    likes: 0,
  };

  constructor(private phraseDataService: PhraseDataService) { }
  ngOnInit(): void {
  }

  get dateFormatted(): string {
    const date = new Date(this.phrase.date);
    return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  get isLiked(): boolean {
    return this.phrase.allUsersLiked.map((user) => user.id).includes(Number(localStorage.getItem('userId')));
  }

  like(): void {
    this.phraseDataService.likePhrase(this.phrase.id).then(phrase => this.phrase = phrase);
  }

}


