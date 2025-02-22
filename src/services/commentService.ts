import { ApiResponse } from "../types/category";
import { newCommentRequestI, newCommentResponseI } from "../types/comment";
import apiAuthClient from "./apiAuthClient";

export const fetchCreateCommentRequest = async (post: newCommentRequestI): Promise<ApiResponse<newCommentResponseI>> => {
    const response = await apiAuthClient.post<ApiResponse<newCommentResponseI>>('/comment', post);
    return response.data;
}