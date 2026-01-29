import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinner, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  errorMessage = signal('');
  isLoading: boolean = false;
  private route = inject(ActivatedRoute); 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {      
        this.errorMessage.set(params['message']);
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage.set(''); 

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/teams']);
      },
      error: (err) => { 
        console.error('Login failed:', err);
        this.isLoading = false;

        const serverMessage = err.error?.message || 'Login failed. Please check your credentials.';
        
        this.errorMessage.set(serverMessage);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
