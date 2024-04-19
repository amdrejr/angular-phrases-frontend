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
export class ListForYouComponent implements OnInit {
  phrases = this.phraseDataService.allPhrases;
  page: number = 1; // home já chama a primeira page
  size: number = 10;
  disable: boolean = this.phraseDataService.isLastPageAllPhrases();

  constructor(private phraseDataService: PhraseDataService) { }

  ngOnInit(): void { }

  load(): void {
    this.phraseDataService.loadPhrases(this.page, this.size)
    .subscribe({
      next: (page) => {
        this.phrases.update(phrases => [...phrases, ...page.content]);
        if(!page.last) {
          this.page++;
        } else {
          this.phraseDataService.isLastPageAllPhrases.set(true);
          this.disable = true;
        }
      }
    })
  }

}
