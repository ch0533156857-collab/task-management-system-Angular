export interface Project {
    id: number;
    name: string;
    team_id: number;
    description?: string;
}

export interface CreateProjectRequest {
    name: string;
    team_id: number;
    description?: string;
}