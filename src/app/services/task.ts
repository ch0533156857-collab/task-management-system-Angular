import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/task.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { TaskComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_ENDPOINTS.TASKS);
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(API_ENDPOINTS.TASK_BY_ID(taskId));
  }

  createTask(data: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(API_ENDPOINTS.TASKS, data);
  }

  updateTask(id : number, data: UpdateTaskRequest): Observable<Task> {
    return this.http.patch<Task>(API_ENDPOINTS.TASK_BY_ID(id), data);
  }

  addComment(taskId: string, comment: string): Observable<TaskComment> {
    return this.http.post<TaskComment>(API_ENDPOINTS.COMMENTS, { taskId, comment });
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.TASK_BY_ID(taskId));
  }

  getTasksByProject(projectId: number): Observable<Task[]> { 
    return this.http.get<Task[]>(`${API_ENDPOINTS.TASKS}?projectId=${projectId}`);
  }
}
