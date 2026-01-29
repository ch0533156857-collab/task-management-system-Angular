import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../../../services/team';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { ConfirmDialog } from "../../shared/confirm-dialog/confirm-dialog";

@Component({
  selector: 'app-team-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinner, ConfirmDialog],
  templateUrl: './team-create.html',
  styleUrl: './team-create.css',
})
export class TeamCreate {
  teamForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  showCancelDialog = signal(false);
  teamService = inject(TeamService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.teamService.createTeam(this.teamForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/teams']);
      },
      error: (error: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(error);
      },
    });
  }

  onCancel(): void {
    if(this.teamForm.dirty) {
      this.showCancelDialog.set(true);
    } else {
      this.router.navigate(['/teams']);
    }
  }

  handleCancelResponse(confirmed: boolean): void {
    this.showCancelDialog.set(false); 
    if (confirmed) {
      this.router.navigate(['/teams']);
    }
  }
}
