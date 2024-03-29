import { Component } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { LogoTextComponent } from '../../components/logo-text/logo-text.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    InputTextComponent,
    LogoTextComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
