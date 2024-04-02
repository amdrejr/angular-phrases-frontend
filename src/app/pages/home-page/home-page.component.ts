import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogoTextComponent } from '../../components/logo-text/logo-text.component';
import { PhraseCardComponent } from '../../components/phrase-card/phrase-card.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, // redirecionar
    RouterLinkActive, // ativar link (add classe css)
    MatIconModule,
    LogoTextComponent,
    PhraseCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(public dialog: MatDialog) { }

  openPostModal(): void {
    console.log('Abrindo modal');
    const dialogRef = this.dialog.open(PostFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('O modal foi fechado');
    });
  }
}
