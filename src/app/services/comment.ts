import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { CreateCommentRequest, TaskComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(API_ENDPOINTS.COMMENTS);
  }

  getCommentByTask(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(API_ENDPOINTS.COMMENTS_BY_TASK(taskId));
  }

  getCommentById(commentId: number): Observable<TaskComment> {
    return this.http.get<TaskComment>(API_ENDPOINTS.COMMENTS_BY_ID(commentId));
  }

  createComment(data: CreateCommentRequest): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.COMMENTS, data);
  }
}
