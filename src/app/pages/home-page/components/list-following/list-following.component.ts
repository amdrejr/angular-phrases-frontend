import { Component } from '@angular/core';
import { ListPhrasesComponent } from '../../../../components/list-phrases/list-phrases.component';
import { Phrase } from '../../../../models/phrase';

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
      author: 'randomUser1',
      date: '2021-01-01',
      allUsersLiked: [],
      likes: 10,
    },
    {
      id: 3,
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      author: 'master2UserFinal',
      date: '2021-01-01',
      allUsersLiked: [],
      likes: 22,
    }
  ]
}
