import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateBlogRequestI, CreateBlogValidationErrorResponseI } from "../types/blog";
import { fetchCreateBlogRequest, fetchGetOneBlog } from "../services/blogService";
import { ApiResponse } from "../types/category";


interface BlogState {
    loading: boolean;
    error: ApiResponse<CreateBlogValidationErrorResponseI> | string | null;
}

const initialState: BlogState = {
    loading: false,
    error: null
}

export const fetchCreateBlog = createAsyncThunk(
    'blog/createBlog',
    async (blog: CreateBlogRequestI, {rejectWithValue}) => {
        try {            
            const response = await fetchCreateBlogRequest(blog);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error creating the blog')
        }
    }
);

export const fecthGetOneBlogPage = createAsyncThunk(
    '/blog/getOneBlogPage',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await fetchGetOneBlog(id);
            return response;
        } catch (error: any) {
            return  rejectWithValue(error.response?.data || 'Error to get one blog')
        }
    }
)

const blogSlice =  createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCreateBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCreateBlog.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchCreateBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as ApiResponse<CreateBlogValidationErrorResponseI> || 'Failded to fecth create blog'
        })

        .addCase(fecthGetOneBlogPage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fecthGetOneBlogPage.fulfilled, (state, action) => {
            state.loading = false;
            // state.error = null;
            //state.currentBlog = action.payload; // Ajustar según tu estado
        })
        .addCase(fecthGetOneBlogPage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default blogSlice.reducer;

export const selectLoading = (state: any) => state.blog.loading;
export const selectError = (state: any) => state.blog.error;
