import { Component, Input, OnInit, signal } from '@angular/core';
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
export class ListPhrasesComponent implements OnInit {
  @Input({required:true}) phrases = signal([] as Phrase[]);
  @Input() hideAuthor: boolean = false;
  @Input() hidePhoto: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
