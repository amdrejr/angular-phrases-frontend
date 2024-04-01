import { Component } from '@angular/core';
import { Phrase } from '../../models/phrase';
import { ListPhrasesComponent } from '../list-phrases/list-phrases.component';

@Component({
  selector: 'app-list-following',
  standalone: true,
  imports: [
    ListPhrasesComponent
  ],
  templateUrl: './list-following.component.html',
  styleUrl: './list-following.component.css'
})
export class ListFollowingComponent {
  phrases: Phrase[] = [
    {
      id: 1,
      text: 'FOLLOWING lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: {id: 1, username: 'masterUserFinal', phrases: []},
      date: '2021-01-01',
      likes: 10,
    },
    {
      id: 2,
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      author: {id: 2, username: 'master2UserFinal', phrases: []},
      date: '2021-01-01',
      likes: 22,
    }
  ]
}
