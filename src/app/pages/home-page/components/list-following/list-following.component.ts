import { Component, OnInit } from '@angular/core';
import { ListPhrasesComponent } from '../../../../components/list-phrases/list-phrases.component';
import { PhraseDataService } from '../../../../services/phrase-data/phrase-data.service';

@Component({
  selector: 'app-list-following',
  standalone: true,
  imports: [
    ListPhrasesComponent
  ],
  templateUrl: './list-following.component.html',
  styleUrl: './list-following.component.css'
})
export class ListFollowingComponent implements OnInit {
  phrases = this.phraseDataService.followingPhrases;

  constructor(private phraseDataService: PhraseDataService) { }
  ngOnInit(): void { }
}
