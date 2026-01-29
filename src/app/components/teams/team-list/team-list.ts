import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../../services/team';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { TeamCard } from "../team-card/team-card";

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, TeamCard],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css',
})
export class TeamList implements OnInit {
  teams = signal<Team[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  private router = inject(Router);
  private teamService = inject(TeamService);
  
  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.teamService.getTeams().subscribe({
      next: (teams: Team[]) => {this.teams.set(teams); this.isLoading.set(false);},
      error: (error: any) => {this.errorMessage.set(error); this.isLoading.set(false);},
    });
  }

navigateToTeamDetails(team: Team): void {
  this.router.navigate(['/projects', team.id]); 
}

  onCreateTeam(): void {
    this.router.navigate(['/teams', 'create']);
  }
}
