import { Component, OnInit } from '@angular/core';
import { ListPhrasesComponent } from '../../../../components/list-phrases/list-phrases.component';
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
  phrases = this.phraseDataService.allPhrases;

  constructor(private phraseDataService: PhraseDataService) { }

  ngOnInit(): void { }
}
