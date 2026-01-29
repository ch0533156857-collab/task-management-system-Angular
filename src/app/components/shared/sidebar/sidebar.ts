import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/click-outside';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface MenuItem  {
  label: string;
  route: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, MatSnackBarModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = signal(false);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  readonly menuItems: MenuItem[] = [
    { label: 'Login', route: '/login' },
    { label: 'Register', route: '/register' },
    { label: 'Projects',  route: '/projects' },
    { label: 'Teams',     route: '/teams' },
    { label: 'Tasks',     route: '/tasks' },
    { label: 'Settings',  route: '/settings' }
  ];

  toggleSidebar(): void {
    this.isCollapsed.update(collapsed => !collapsed);
  }

  navigateTo(path: string): void {
    if (path === '/teams') {
      this.router.navigate(['/teams']);
      return;
    }

    if (path === '/projects') {
      const lastId = localStorage.getItem('lastTeamId');
      if (lastId) {
        this.router.navigate(['/projects', lastId]);
      } else {
        this.snackBar.open('Please select a team first! 👥', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['graffiti-snackbar']
        });
        this.router.navigate(['/teams']);
      }
      return;
    }

    if (path === '/tasks') {
      const lastPId = localStorage.getItem('lastProjectId');
      if (lastPId) {
        this.router.navigate(['/tasks', lastPId]);
      } else {
        this.snackBar.open('Please select a project first! 📁', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['graffiti-snackbar']
        });
        this.router.navigate(['/teams']); 
      }
      return;
    }

    this.router.navigate([path]);
  }

  onClickOutside(): void {
    if (!this.isCollapsed()) {
      this.isCollapsed.set(true);
    }
  }
}
