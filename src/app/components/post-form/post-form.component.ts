import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  constructor(public dialog: MatDialog) { }

  openPostModal(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '400px' // Largura do modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }
}
