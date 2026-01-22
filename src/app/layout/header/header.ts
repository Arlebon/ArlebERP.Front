import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isConnected = this._authService.isConnected;

  onLogout() {
    this._authService.logout();
    this._router.navigate(['/auth/login']);
  }
}
