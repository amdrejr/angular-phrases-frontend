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
  page: number = 1; // home já chama a primeira page
  size: number = 10;
  disable: boolean = this.phraseDataService.isLastPageFollowingPhrases();

  constructor(private phraseDataService: PhraseDataService) { }

  ngOnInit(): void { }

  load(): void {
    this.phraseDataService.loadFollowingPhrases(this.page, this.size)
    .subscribe({
      next: (page) => {
        this.phrases.update(phrases => [...phrases, ...page.content]);
        if(page.content.length < 10 || page.last) {
          this.phraseDataService.isLastPageFollowingPhrases.set(true);
          this.disable = true;
        }
        if(!page.last) {
          this.page++;
        }
      }
    })
  }
}
