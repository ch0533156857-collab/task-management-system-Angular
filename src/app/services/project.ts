import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { CreateProjectRequest, Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(teamId?: number): Observable<Project[]> {
    const url = teamId 
      ? `${API_ENDPOINTS.PROJECTS}?teamId=${teamId}` 
      : API_ENDPOINTS.PROJECTS;
      
    return this.http.get<Project[]>(url);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(API_ENDPOINTS.PROJECT_BY_ID(projectId));
  }

  createProject(data: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(API_ENDPOINTS.PROJECTS, data);
  }
}
