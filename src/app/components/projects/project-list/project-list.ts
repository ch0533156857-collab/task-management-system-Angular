import { Component, inject, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../services/project';
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { ProjectCard } from "../project-card/project-card";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  projects = signal<Project[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  teamId = input<string>();
  
  private projectService = inject(ProjectService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects(): void {
    const currentTeamId = this.teamId();
    if (!currentTeamId) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.projectService.getProjects().subscribe({
      next: (allProjects: Project[]) => {
        const filtered = allProjects.filter(p => String(p.team_id) === currentTeamId);
        this.projects.set(filtered);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load projects. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  navigateToProjectDetails(project: Project): void {
    this.router.navigate(['/tasks', project.id]);
  }

  onCreateProject(): void {
    const id = this.teamId();
    if (id) {
      this.router.navigate(['/projects', id, 'create']);
    }
  }
}