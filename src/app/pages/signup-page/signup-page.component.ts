import { Component } from '@angular/core';
import { ButtonTextComponent } from '../../components/button-text/button-text.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    InputTextComponent,
    ButtonTextComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  // verificar se o username já existe
}
