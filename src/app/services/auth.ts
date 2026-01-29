import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { of, Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'auth_token';
  private readonly USER = 'current_user';
  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  login(credintials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ENDPOINTS.LOGIN, credintials).pipe(tap
    (response => {
      this.storage.setItem(this.TOKEN, response.token);
      this.storage.setObject<User>(this.USER, response.user);
    }));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ENDPOINTS.REGISTER, data).pipe(tap
    (response => {  
        this.storage.setItem(this.TOKEN, response.token);
        this.storage.setObject<User>(this.USER, response.user);
    }));
  }

  logout(): void {
    this.storage.removeItem(this.TOKEN);
    this.storage.removeItem(this.USER);
    this.currentUser.set(null); 
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.storage.getItem(this.TOKEN);
  }

getCurrentUser(): Observable<User | null> {
    const savedUser = this.storage.getObject<User>(this.USER);
    return of(savedUser);
  }
}
