import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Phrase } from '../../models/phrase';

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
  @Input() phrase: Phrase = {
    id: 2,
    text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    author: {id: 2, username: 'master2UserFinal', phrases: []},
    date: '2021-01-01',
    likes: 22,
  };
}


