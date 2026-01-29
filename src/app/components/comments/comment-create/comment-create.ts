import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment';
import { CreateCommentRequest, TaskComment } from '../../../models/comment.model';
import { AuthService } from '../../../services/auth';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-comment-create',
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css',
})
export class CommentCreate {
  private fb = inject(FormBuilder);
  private commentService = inject(CommentService);

  taskId = input.required<number>();
  commentAdded = output<TaskComment>();
  isLoading = signal(false);

  private authService = inject(AuthService); 

  commentForm: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(2)]]
  });

  onSubmit() {
  if (this.commentForm.invalid) return;

  this.isLoading.set(true);

  // האובייקט המדויק שהשרת ביקש:
  const commentData: CreateCommentRequest = {
      taskId: Number(this.taskId()), // המרה למספר ליתר ביטחון
      body: this.commentForm.value.text
    };

    this.commentService.createComment(commentData).subscribe({
      next: (newComment) => {
        this.commentAdded.emit(newComment); 
        this.commentForm.reset(); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('שגיאה בשליחה:', err);
        this.isLoading.set(false);
      }
    });
  }
}
