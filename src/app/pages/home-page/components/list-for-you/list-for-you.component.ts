import { Component, OnInit } from '@angular/core';
import { ListPhrasesComponent } from '../../../../components/list-phrases/list-phrases.component';
import { Phrase } from '../../../../models/phrase';
import { PhraseDataService } from '../../../../services/phrase-data/phrase-data.service';

@Component({
  selector: 'app-list-for-you',
  standalone: true,
  imports: [
    ListPhrasesComponent
  ],
  templateUrl: './list-for-you.component.html',
  styleUrl: './list-for-you.component.css'
})
export class ListForYouComponent implements OnInit{
  phrases: Phrase[] = [
    {
      id: 0,
      text: '',
      author: '',
      date: '',
      allUsersLiked: [],
      likes: 0,
    },
  ]

  constructor(private phraseDataService: PhraseDataService) { }

  ngOnInit(): void {
    this.phraseDataService.getPhrases().subscribe({
      next: (data) => {
        console.log('data:', data);
        this.phrases = data;
      },
      error: (err) => {
        console.log('ERROR Error:', err);
      },
    });
  }
}
