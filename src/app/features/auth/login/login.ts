import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Button } from 'primeng/button';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { LoadingModal } from '../../../components/common/loading-modal/loading-modal';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    Button,
    LoadingModal,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isLoading: boolean = false;

  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm = this._fb.group({
    login: this.login,
    password: this.password,
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        this.isLoading = true;
        await this._authService.login(this.loginForm.value.login!, this.loginForm.value.password!);
        this.isLoading = false;
        this._router.navigate(['/']);
      } catch (err) {
        this.isLoading = false;
        console.error(err);
      }
    }
  }
}
