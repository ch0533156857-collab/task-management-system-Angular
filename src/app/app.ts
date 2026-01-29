import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { Header } from './components/shared/header/header';
import { Sidebar } from './components/shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Login } from "./components/auth/login/login";
import { Register } from "./components/auth/register/register";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Header,
    Sidebar
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private authService = inject(AuthService);

  isLoggedIn = computed(() => !!this.authService.currentUser());
}