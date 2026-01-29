import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { Team, CreateTeamRequest, TeamMember, AddMemberRequest } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService  {
  constructor(private http: HttpClient) {}

  getTeams (): Observable<Team[]> {
    return this.http.get<Team[]>(API_ENDPOINTS.TEAMS);
  }

  getTeamById (teamId: number): Observable<Team> {
    return this.http.get<Team>(API_ENDPOINTS.TEAM_BY_ID(teamId));
  }

  getTeamMembers (teamId: number): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(API_ENDPOINTS.TEAM_MEMBERS(teamId));
  }

  createTeam (data: CreateTeamRequest): Observable<Team> {
    return this.http.post<Team>(API_ENDPOINTS.TEAMS, data);
  }

  addMemberToTeam (teamId: number, data: AddMemberRequest): Observable<TeamMember> {
    return this.http.post<TeamMember>(API_ENDPOINTS.TEAM_MEMBERS(teamId), data);
  }
}
