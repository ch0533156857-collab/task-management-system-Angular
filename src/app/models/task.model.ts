import { TaskPriority } from "../enums/task-priority.enum";
import { TaskStatus } from "../enums/task-status.enum";
import { TaskComment } from "./comment.model";
//////wowwwwwwww
export interface Task {
    id: number;
    title: string;
    project_id: number;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string;
    assignee_to?: string;
    comments: TaskComment[]; 
    showComments?: boolean;
}

export interface CreateTaskRequest {
    title: string;
    projectId: number;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string;
    assignee_to?: number;
}

export interface UpdateTaskRequest {
    title?: string;
    project_id?: number;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string;
    assignee_to?: number;
}