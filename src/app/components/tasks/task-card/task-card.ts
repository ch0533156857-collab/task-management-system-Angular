import { Component, input, output, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task';
import { TaskStatus } from '../../../enums/task-status.enum';
import { TaskPriority } from '../../../enums/task-priority.enum';
import { TaskComment } from '../../../models/comment.model';
import { CommentList } from "../../comments/comment-list/comment-list";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentList],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard implements OnInit {
  task = input.required<Task>();
  taskClicked = output<Task>();
  taskDeleted = output<number>();
  taskUpdated = output<void>();

  showComments = signal(false);
  isUpdating = signal(false);

  private taskService = inject(TaskService);

  //למחוקקק
  // task-card.ts - הוסיפי בתוך ngOnInit:
ngOnInit() {
  const task = this.task();
  
  console.log('📊 Checking all enum values:');
  console.log('Status:', task.status, '| Valid?', 
    Object.values(TaskStatus).includes(task.status as TaskStatus));
  console.log('Priority:', task.priority, '| Valid?', 
    Object.values(TaskPriority).includes(task.priority as TaskPriority));
    
  console.log('All valid statuses:', Object.values(TaskStatus));
  console.log('All valid priorities:', Object.values(TaskPriority));
}

  statusOptions = [
    { value: TaskStatus.TODO, label: '📋 To Do' },
    { value: TaskStatus.IN_PROGRESS, label: '🚀 In Progress' },
    { value: TaskStatus.DONE, label: '✅ Done' }
  ];

  priorityOptions = [
    { value: TaskPriority.LOW, label: '🟢 Low' },
    { value: TaskPriority.MEDIUM, label: '🟡 Medium' },
    { value: TaskPriority.HIGH, label: '🔴 High' },
    { value: TaskPriority.NORMAL, label: '🟡 Normal' }
  ];

  onTaskClick(): void {
    this.taskClicked.emit(this.task());
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.taskDeleted.emit(this.task().id);
  }

  onStatusChange(event: Event): void {
    event.stopPropagation();
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as TaskStatus;

    this.isUpdating.set(true);

    this.taskService.updateTask(this.task().id, { status: newStatus }).subscribe({
      next: () => {
        this.isUpdating.set(false);
        this.taskUpdated.emit();
      },
      error: (err) => {
        console.error('Status update failed:', err);
        this.isUpdating.set(false);
        selectElement.value = this.task().status || '';
      }
    });
  }

  onPriorityChange(event: Event): void {
    event.stopPropagation();
    const selectElement = event.target as HTMLSelectElement;
    const newPriority = selectElement.value as TaskPriority;

    this.isUpdating.set(true);

    this.taskService.updateTask(this.task().id, { priority: newPriority }).subscribe({
      next: () => {
        this.isUpdating.set(false);
        this.taskUpdated.emit();
      },
      error: (err) => {
        console.error('Priority update failed:', err);
        this.isUpdating.set(false);
        selectElement.value = this.task().priority || '';
      }
    });
  }

  toggleComments(event: Event): void {
    event.stopPropagation();
    this.showComments.update(v => !v);
  }
}