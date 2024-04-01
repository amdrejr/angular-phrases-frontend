import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTextComponent } from '../../components/button-text/button-text.component';
import { InputCheckboxComponent } from '../../components/input-checkbox/input-checkbox.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { LogoTextComponent } from '../../components/logo-text/logo-text.component';
import { TextButtonComponent } from '../../components/text-button/text-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    InputTextComponent,
    LogoTextComponent,
    InputCheckboxComponent,
    ButtonTextComponent,
    TextButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private router: Router) { }

  redirectToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
