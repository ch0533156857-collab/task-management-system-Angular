import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task';
import { TaskStatus } from '../../../enums/task-status.enum';
import { TaskCard } from '../task-card/task-card';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, TaskCard, LoadingSpinner],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit {
  // 📥 Input from route/parent
  projectId = input<string>();

  // 🔄 State
  allTasks = signal<Task[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  private taskService = inject(TaskService);
  private router = inject(Router);

  // 📊 Computed columns (auto-updates when allTasks changes)
  todoTasks = computed(() =>
    this.allTasks().filter(task => task.status === TaskStatus.TODO)
  );

  inProgressTasks = computed(() =>
    this.allTasks().filter(task => task.status === TaskStatus.IN_PROGRESS)
  );

  doneTasks = computed(() =>
    this.allTasks().filter(task => task.status === TaskStatus.DONE)
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * 🔄 Load all tasks from server
   * Called on init and after any child updates
   */
  loadTasks(): void {
      console.log('🔄 loadTasks() called!'); // 👈 הוסף

    const pId = this.projectId();

      console.log('Project ID:', pId); // 👈

    if (!pId){ console.error('No project ID provided.'); return} 

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.taskService.getTasksByProject(Number(pId)).subscribe({
      next: (tasks: Task[]) => {

              console.log('📥 Received tasks from server:', tasks); // 👈


        this.allTasks.set(tasks); // 👈 This triggers computed() re-calculation
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load tasks. Please try again later.');
      },
    });
  }



  /**
   * 👆 Handle task card click
   */
  onTaskClick(task: Task): void {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  /**
   * 🗑️ Handle task deletion
   */
  onTaskDelete(taskId: number): void {
    if (!confirm('האם אתה בטוח שברצונך למחוק משימה זו?')) return;

    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.loadTasks(), // Refresh after delete
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete task');
      }
    });
  }

  /**
   * ➕ Navigate to create task page
   */
  onTaskCreate(): void {
    const id = this.projectId();
    if (id) {
      this.router.navigate(['/tasks', id, 'create']);
    }
  }
}

