import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../types/category";
import { newCommentRequestI } from "../types/comment";
import { fetchCreateCommentRequest, fetchDeleteCommentRequest, fetchUpdateCommentRequest } from "../services/commentService";

interface CommentState {
    loading: boolean;
    errorComment: boolean;
    errorMessage: ApiResponse<any> | null;
}

const initialState: CommentState = {
    loading: false,
    errorComment: false,
    errorMessage: null,
};

export const resetCommentError = createAction('comment/resetCommentError');


export const fetchCreateComment = createAsyncThunk(
    'comment/createComment',
    async (comment: newCommentRequestI, { rejectWithValue }) => {
        try {
            const response = await fetchCreateCommentRequest(comment);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error to create comment');
        }
    }
);

export const fetchDeleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (params: { commentId: number, userId: number, blogId: number }, { rejectWithValue }) => {
        try {
            const { commentId, userId, blogId } = params;
            const response = await fetchDeleteCommentRequest(commentId, userId, blogId); // Asumiendo que ya tienes esta función
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error to delete comment');
        }
    }
);

export const fetchUpdateComment = createAsyncThunk(
    'comment/updateComment',
    async (params: { commentId: number, commentData: newCommentRequestI }, { rejectWithValue }) => {
        try {
            const { commentId, commentData } = params;
            const response = await fetchUpdateCommentRequest(commentId, commentData); // Asumiendo que ya tienes esta función
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error to update comment');
        }
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetCommentError: (state) => {
            state.loading = false;
            state.errorComment = false;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateComment.pending, (state) => {
            state.loading = true;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchCreateComment.fulfilled, (state) => {
            state.loading = false;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchCreateComment.rejected, (state, action) => {
            state.loading = false;
            state.errorComment = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to create comment';
        });

        builder.addCase(fetchDeleteComment.pending, (state) => {
            state.loading = true;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchDeleteComment.fulfilled, (state) => {
            state.loading = false;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchDeleteComment.rejected, (state, action) => {
            state.loading = false;
            state.errorComment = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failed to delete comment';
        });

        builder.addCase(fetchUpdateComment.pending, (state) => {
            state.loading = true;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchUpdateComment.fulfilled, (state) => {
            state.loading = false;
            state.errorComment = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchUpdateComment.rejected, (state, action) => {
            state.loading = false;
            state.errorComment = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failed to update comment';
        });

        builder.addCase(resetCommentError, (state) => {
            state.errorComment = false;
            state.errorMessage = null;
        });
    }
});

export default commentSlice.reducer;

export const selectLoadingComment = (state: any) => state.comment.loading;
export const selectErrorComment = (state: any) => state.comment.errorComment;
export const selectErrorMessageComment = (state: any) => state.comment.errorMessage;