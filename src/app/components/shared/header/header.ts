import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ConfirmDialog],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  currentUser = signal<User | null>(null);
  showLogoutDialog = signal(false);

  ngOnInit(): void {
      this.currentUser = this.authService.currentUser; 
      this.authService.getCurrentUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => this.currentUser.set(user));
  }

openLogoutDialog(): void {
    this.showLogoutDialog.set(true);
  }

  handleLogoutResponse(isConfirmed: boolean): void {
    this.showLogoutDialog.set(false); 
    if (isConfirmed) {
      this.performLogout();
    }
  }

  private performLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
