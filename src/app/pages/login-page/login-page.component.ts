import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonTextComponent } from '../../components/button-text/button-text.component';
import { InputCheckboxComponent } from '../../components/input-checkbox/input-checkbox.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { LogoTextComponent } from '../../components/logo-text/logo-text.component';
import { TextButtonComponent } from '../../components/text-button/text-button.component';
import { LoginService } from '../../services/login-service/login.service';
import { UserDataService } from '../../services/user-data-service/user-data.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
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
  username: string = '';
  password: string = '';
  isEmpty: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userDataService: UserDataService,
  ) { }

  redirectToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  login(): void {
    if(!this.username || !this.password) {
      this.isEmpty = true;
      return;
    }

    this.loginService.login(this.username, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', this.userDataService.me().id.toString());
      },
      complete: () => {
        this.router.navigate(['/home']);
      }
    });
  }
}
