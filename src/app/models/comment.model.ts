export interface TaskComment {
    id: number;
    task_id: number;
    user_id: number;
    body: string;
    created_at: string;
}

export interface CreateCommentRequest {
    taskId: number;
    body: string;
}
