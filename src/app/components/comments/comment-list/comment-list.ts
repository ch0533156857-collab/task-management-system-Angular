import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentService } from '../../../services/comment';
import { TaskComment } from '../../../models/comment.model';
import { CommentCreate } from "../comment-create/comment-create";
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-comment-list',
  imports: [CommentCreate, CommonModule, DatePipe, LoadingSpinner],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css',
})
export class CommentList {
    private commentService = inject(CommentService);
  
  taskId = input.required<number>();
  comments = signal<TaskComment[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.isLoading.set(true);
    this.commentService.getCommentByTask(this.taskId()).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onCommentAdded(newComment: TaskComment) {
    this.comments.update(oldComments => [newComment, ...oldComments]);
  }
}
