import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonTextComponent } from '../../components/button-text/button-text.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    FormsModule,
    InputTextComponent,
    ButtonTextComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  username: string = '';
  password: string = '';
  passwordRepeat: string = '';
  errorMessage: string = '';
  isEmpty: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  signup() {
    if(!this.username || !this.password || !this.passwordRepeat) {
      this.isEmpty = true;
      return;
    }

    if (this.password !== this.passwordRepeat) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loginService.createAccount(this.username, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('ERROR Error:', err);
        this.errorMessage = err.error.message;
      },
    });
  }
}
