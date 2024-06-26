import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Phrase } from '../../models/phrase';
import { PhraseDataService } from '../../services/phrase-data/phrase-data.service';
import { ButtonTextComponent } from '../button-text/button-text.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonTextComponent,
    FormsModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  postContent: string = '';

  constructor(
    private dialogRef: MatDialogRef<PostFormComponent>,
    private phraseDataService: PhraseDataService,
  ) { }

  post(): void {
    const phrase: Phrase = {
      text: this.postContent,
      id: 0,
      date: '',
      isLikedByMe: false,
      likes: 0,
      author: { id: 0, username: '' },
    }

    this.phraseDataService.createPhrase(phrase);

    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
