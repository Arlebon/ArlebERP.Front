import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { CompanyNavbar } from './components/common/company-navbar/company-navbar';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CompanyNavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ArlebERP-front');
  private readonly _authService = inject(AuthService);

  isConnected = this._authService.isConnected;
}
