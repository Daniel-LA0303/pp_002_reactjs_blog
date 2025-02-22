
export interface newCommentRequestI {
    blogId: number;
    userId: number | null;
    content: string;
}

export interface newCommentResponseI {
    commentId: number;
    content: string;
    userId: number;
    blogId: number;
    createdAt: string;
    updatedAt: string;
}