import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../types/category";
import { ReplyCreateRequestDTO } from "../types/reply";
import { fetchCreateReply, fetchUpdateReply } from "../services/replyService";



interface CommentState {
    loading: boolean;
    errorReply: boolean;
    errorMessage: ApiResponse<any> | null;
}

const initialState: CommentState = {
    loading: false,
    errorReply: false,
    errorMessage: null,
};

export const resetCommentError = createAction('reply/resetCommentError');

export const fetchUpdateReplyT = createAsyncThunk(
    'comment/updateReply',
    async (params: { replyId: number, replyData: ReplyCreateRequestDTO }, { rejectWithValue }) => {
        try {
            const { replyId, replyData } = params;
            const response = await fetchUpdateReply(replyId, replyData); // Asumiendo que ya tienes esta función
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error to update comment');
        }
    }
);

export const fetchCreateReplyT = createAsyncThunk(
    'reply/createReply',
    async (replyData: ReplyCreateRequestDTO, { rejectWithValue }) => {
      try {
        const response = await fetchCreateReply(replyData);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error creating reply');
      }
    }
);


const replySlice = createSlice({
    name: 'reply',
    initialState,
    reducers: {
        resetReplyError(state) {
            state.loading = false;
            state.errorReply = false;
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {

        // update reply
        builder.addCase(fetchUpdateReplyT.pending, (state) => {
            state.loading = true;
            state.errorReply = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchUpdateReplyT.fulfilled, (state) => {
            state.loading = false;
            state.errorReply = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchUpdateReplyT.rejected, (state, action) => {
            state.loading = false;
            state.errorReply = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to update reply';
        });

        // create reply
        builder.addCase(fetchCreateReplyT.pending, (state) => {
            state.loading = true;
            state.errorReply = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchCreateReplyT.fulfilled, (state) => {
            state.loading = false;
            state.errorReply = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchCreateReplyT.rejected, (state, action) => {
            state.loading = false;
            state.errorReply = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to create reply';
        });

        // reset
        builder.addCase(resetCommentError, (state) => {
            state.errorReply = false;
            state.errorMessage = null;
        });
    }
});

export default replySlice.reducer;
export const selectLoadingReply = (state: any) => state.reply.loading;    
export const selectErrorReply = (state: any) => state.reply.errorReply;
export const selectErrorMessageReply = (state: any) => state.reply.errorMessage;













