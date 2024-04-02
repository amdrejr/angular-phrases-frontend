import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
  @Output() onClick = new EventEmitter<string>();
  postContent: string = '';

  constructor(private dialogRef: MatDialogRef<PostFormComponent>) { }

  emitEvent(): void {
    console.log("phrase:", this.postContent)
    // Emitir os dados do textarea quando o formulário for submetido
    this.onClick.emit(this.postContent);

    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
