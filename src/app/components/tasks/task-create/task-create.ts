import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task';
import { CreateTaskRequest } from '../../../models/task.model';
import { TaskStatus } from '../../../enums/task-status.enum';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { TaskPriority } from '../../../enums/task-priority.enum';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css'
})
export class TaskCreate {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  projectId = input.required<string>(); 
  isLoading = signal(false);
  errorMessage = signal('');

  statusOptions = [
    { value: TaskStatus.TODO, label: '📋 To Do' },
    { value: TaskStatus.IN_PROGRESS, label: '🚀 In Progress' },
    { value: TaskStatus.DONE, label: '✅ Done' }
  ];

  priorityOptions = [
    { value: TaskPriority.LOW, label: '🟢 Low' },
    { value: TaskPriority.MEDIUM, label: '🟡 Medium' },
    { value: TaskPriority.HIGH, label: '🔴 High' }
  ];

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    status: [TaskStatus.TODO],
    priority: [TaskPriority.MEDIUM]
  });

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const taskData: CreateTaskRequest = {
      title: this.taskForm.value.title,
      projectId: Number(this.projectId()), 
      status: this.taskForm.value.status,
      priority: this.taskForm.value.priority 
    };

    console.log('Sending Task Data:', taskData); 

    this.taskService.createTask(taskData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/tasks', this.projectId()]);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('יצירת המשימה נכשלה. בדקי שכל השדות תקינים.');
        console.error('Full server error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks', this.projectId()]);
  }
}