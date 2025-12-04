import { ApiResponse } from "../../../../../types/global";
import { commentResponseI, CommentsPageableResponseI, newCommentRequestI } from "../types/comment";
import apiAuthClient from "../../../../../services/config-client/apiAuthClient";
import apiClient from "../../../../../services/config-client/apiClient";

export const fetchCreateCommentRequest = async (post: newCommentRequestI): Promise<ApiResponse<commentResponseI>> => {
    const response = await apiAuthClient.post<ApiResponse<commentResponseI>>('/comment', post);
    return response.data;
}

export const fetchDeleteCommentRequest = async (commentId: number, userId: number, blogId: number): Promise<ApiResponse<string>> => {
    const response = await apiAuthClient.delete<ApiResponse<string>>(`/comment/${commentId}?userId=${userId}&blogId=${blogId}`);
    return response.data;
}

export const fecthGetCommentsByBlogId = async (blogId: number, page: number, size: number): Promise<ApiResponse<CommentsPageableResponseI>> => {
    const response = await apiClient.get<ApiResponse<CommentsPageableResponseI>>(`/comment/get-comments-by-blog/${blogId}?page=${page}&size=${size}`);
    return response.data
}

export const fetchUpdateCommentRequest = async (commentId: number, commentData: newCommentRequestI): Promise<ApiResponse<commentResponseI>> => {
    const response = await apiAuthClient.put<ApiResponse<commentResponseI>>(`/comment/${commentId}`,commentData);
    return response.data;
};