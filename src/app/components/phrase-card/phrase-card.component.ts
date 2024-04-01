import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-phrase-card',
  standalone: true,
  imports: [],
  templateUrl: './phrase-card.component.html',
  styleUrl: './phrase-card.component.css'
})
export class PhraseCardComponent {
  @Input() phrase: Phrase = {
    id: 0,
    text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: {
      id: 0,
      username: 'John Doe',
      phrases: []
    },
    date: '10/10/2021',
    likes: 49
  };
}

interface Phrase {
  id: number;
  text: string;
  author: User;
  date: string;
  likes: number;
}
