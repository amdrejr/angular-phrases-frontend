import { Component, Input } from '@angular/core';
import { Phrase } from '../../models/phrase';
import { PhraseCardComponent } from '../phrase-card/phrase-card.component';

@Component({
  selector: 'app-list-phrases',
  standalone: true,
  imports: [
    PhraseCardComponent
  ],
  templateUrl: './list-phrases.component.html',
  styleUrl: './list-phrases.component.css'
})
export class ListPhrasesComponent {
  @Input({required:true}) phrases: Phrase[] = [];
}
