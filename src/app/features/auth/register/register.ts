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
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CardModule,
    PasswordModule,
    Button,
    LoadingModal,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isLoading: boolean = false;

  username = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  email = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  password = new FormControl('', [Validators.required]);

  registerForm = this._fb.group({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        this.isLoading = true;
        await this._authService.register({
          username: this.registerForm.value.username!,
          email: this.registerForm.value.email!,
          password: this.registerForm.value.password!,
        });
        this.isLoading = false;
        this._router.navigate(['/auth/login']);
      } catch (err) {
        this.isLoading = false;
        console.error(err);
      }
    }
  }
}
