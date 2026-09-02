import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  password = '';
  errorMessage = signal('');
  isLoading = signal(false);

  onLogin() {
    this.isLoading.set(true);

    this.authService.login(this.password).subscribe((success) => {
      this.isLoading.set(false);
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set('Falsches Password.');
      }
    });
  }
}
