import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { LogoTextComponent } from '../../components/logo-text/logo-text.component';
import { PhraseCardComponent } from '../../components/phrase-card/phrase-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    LogoTextComponent,
    PhraseCardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor() { }

}
