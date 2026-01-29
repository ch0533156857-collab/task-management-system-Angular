import { environment } from '../../environments/environment';

const API_BASE = environment.apiUrl; 

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,
  
  TEAMS: `${API_BASE}/teams`,
  TEAM_BY_ID: (teamId: number) => `${API_BASE}/teams/${teamId}`,
  TEAM_MEMBERS: (teamId: number) => `${API_BASE}/teams/${teamId}/members`,
  REMOVE_TEAM_MEMBER: (teamId: number, memberId: number) => `${API_BASE}/teams/${teamId}/members/${memberId}`,
  
  PROJECTS: `${API_BASE}/projects`,
  PROJECT_BY_ID: (projectId: number) => `${API_BASE}/projects/${projectId}`,
  
  TASKS: `${API_BASE}/tasks`,
  TASK_BY_ID: (taskId: number) => `${API_BASE}/tasks/${taskId}`,
  TASKS_BY_PROJECT: (projectId: number) => `${API_BASE}/tasks?projectId=${projectId}`,
  
  COMMENTS: `${API_BASE}/comments`,
  COMMENTS_BY_TASK: (taskId: number) => `${API_BASE}/comments?taskId=${taskId}`,
  COMMENTS_BY_ID: (commentId: number) => `${API_BASE}/comments/${commentId}`,
  
  USERS: `${API_BASE}/users`,
  USER_BY_ID: (userId: number) => `${API_BASE}/users/${userId}`,

  SEARCH_USERS: (query: string) => `${API_BASE}/users/search?query=${query}`
};