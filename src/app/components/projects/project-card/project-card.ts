import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  projectClicked = output<Project>();

  onProjectClick(): void {
    this.projectClicked.emit(this.project());
  }
}
