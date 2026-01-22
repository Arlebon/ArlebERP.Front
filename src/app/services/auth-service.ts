import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { UserRegisterForm } from '../core/models/auth-models/register-form.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserRole } from '../core/enums/user-role.enum';
import { Token } from '../core/models/auth-models/token.model';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../core/models/auth-models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  private _token = signal<string | null>(null);
  token = this._token.asReadonly();

  private _userId = signal<number | null>(null);
  userId = this._userId.asReadonly();

  private _userRole = signal<UserRole | null>(null);
  userRole = this._userRole.asReadonly();

  isConnected: Signal<boolean> = computed(() => !!this.token());

  constructor() {
    const tokenStr = localStorage.getItem('token');

    if (tokenStr) {
      this._token.set(tokenStr);
    }

    effect(() => {
      const token = this._token();

      if (token == null) {
        localStorage.removeItem('token');
        this._userId.set(null);
        this._userRole.set(null);
      } else {
        localStorage.setItem('token', token);
        const tokenProp = jwtDecode<Token>(token);
        this._userId.set(
          Number(tokenProp['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']),
        );
        this._userRole.set(
          tokenProp[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ].toLowerCase() as UserRole,
        );
      }
    });
  }

  async login(login: string, password: string): Promise<void> {
    const response = await firstValueFrom(
      this._httpClient.post<LoginResponse>(environment.apiUrl + 'api/User/login', {
        login,
        password,
      }),
    );
    this._token.set(response.token);
  }

  async register(form: UserRegisterForm): Promise<void> {
    await firstValueFrom(
      this._httpClient.post<void>(environment.apiUrl + 'api/User/register', form),
    );
  }

  logout() {
    this._token.set(null);
  }
}
