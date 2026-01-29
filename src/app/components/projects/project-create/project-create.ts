import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { ConfirmDialog } from "../../shared/confirm-dialog/confirm-dialog";

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, ReactiveFormsModule, ConfirmDialog],
  templateUrl: './project-create.html',
  styleUrl: './project-create.css',
})
export class ProjectCreate {
  projectForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  showCancelDialog = signal(false);
  router = inject(Router);
  projectService = inject(ProjectService);
  teamId = input.required<string>();

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const projectData = { ...this.projectForm.value, teamId: this.teamId() };

     this.projectService.createProject(projectData).subscribe({
      next: () => {
        this.isLoading.set(false);
        console.log('Navigating to projects with teamId:', this.teamId());
        this.router.navigate(['/projects', this.teamId()]);  
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error);
      },
    });
  }

  onCancel(): void {
    if(this.projectForm.dirty) {
      this.showCancelDialog.set(true);
    } else {
      this.router.navigate(['/projects', this.teamId()]);
    }
  }

  handleCancelResponse(confirmed: boolean): void {
    this.showCancelDialog.set(false); 
    if (confirmed) {
      this.router.navigate(['/projects']);
    }
  }
}
