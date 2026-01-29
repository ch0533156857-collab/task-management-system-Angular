export interface Team {
    id: number;
    name: string;
}

export interface TeamMember {
    team_id: number;
    user_id: number;
    role: string;
}

export interface CreateTeamRequest {
    name: string;
}

export interface AddMemberRequest {
  email: string;
}