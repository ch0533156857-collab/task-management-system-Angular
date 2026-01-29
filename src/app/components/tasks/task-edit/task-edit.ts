// task-edit.component.ts
import { Component, inject, input, signal, OnInit, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { Task } from '../../../models/task.model';
import { CommentList } from "../../comments/comment-list/comment-list";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinner, CommentList],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEdit implements OnInit {
  taskIdNumber = computed(() => Number(this.taskId()));
  
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskId = input.required<string>(); 
  
  taskForm: FormGroup;
  isLoading = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  projectId = signal<number | null>(null); 

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    this.isLoading.set(true);
    this.taskService.getTaskById(Number(this.taskId())).subscribe({
      next: (task: Task) => {
        this.taskForm.patchValue(task);
        this.projectId.set(task.project_id);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('we could not load the task data');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.isSaving.set(true);
    
    this.taskService.updateTask(Number(this.taskId()), this.taskForm.value).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.goBack();
      },
      error: () => {
        this.errorMessage.set('עדכון המשימה נכשל');
        this.isSaving.set(false);
      }
    });
  }

  onCancel(): void {
    this.goBack();
  }

  private goBack(): void {
    if (this.projectId()) {
      this.router.navigate(['/projects', this.projectId(), 'tasks']);
    } else {
      this.router.navigate(['/projects']);
    }
  }
}