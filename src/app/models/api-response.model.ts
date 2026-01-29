export interface ApiResponse<T> {
    data: T | null;
    massage?: string;
    success: boolean;
}