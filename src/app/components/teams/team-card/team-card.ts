import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../../models/team.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  team = input.required<Team>();
  teamClicked = output<Team>();

  onTeamClick(): void {
    this.teamClicked.emit(this.team());
  }
}