import { ApiResponse } from "../../../../../types/global";
import { RepliesPageableResponseI, ReplyCardDTO, ReplyCreateRequestDTO } from "../types/reply";
import apiAuthClient from "../../../../../services/config-client/apiAuthClient";
import apiClient from "../../../../../services/config-client/apiClient";


export const fecthGetRepliesByCommentId = async (commentId: number, page: number, size: number): Promise<ApiResponse<RepliesPageableResponseI>> => {
    const response = await apiClient.get<ApiResponse<RepliesPageableResponseI>>(`/reply/get-replies-by-comment/${commentId}?page=${page}&size=${size}`);
    return response.data
}

export const fetchUpdateReply = async (replyId: number, replyData: ReplyCreateRequestDTO): Promise<ApiResponse<ReplyCardDTO>> => {
    const response = await apiAuthClient.put<ApiResponse<ReplyCardDTO>>(`/reply/${replyId}`,replyData);
    return response.data;
};

export const fetchCreateReply = async (replyData: ReplyCreateRequestDTO): Promise<ApiResponse<ReplyCardDTO>> => {
    const response = await apiAuthClient.post<ApiResponse<ReplyCardDTO>>('/reply', replyData);
    return response.data;
};