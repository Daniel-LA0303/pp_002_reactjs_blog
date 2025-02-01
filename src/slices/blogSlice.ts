import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateBlogRequestI, CreateBlogValidationErrorResponseI } from "../types/blog";
import { fetchCreateBlogRequest, fetchGetOneBlog } from "../services/blogService";
import { ApiResponse } from "../types/category";


interface BlogState {
    loading: boolean;
    errorBlog: boolean;
    errorMessage: ApiResponse<CreateBlogValidationErrorResponseI> | string | null;
}

const initialState: BlogState = {
    loading: false,
    errorBlog: false,
    errorMessage: null
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
            state.errorBlog = false;
            state.errorMessage = null;
        })
        .addCase(fetchCreateBlog.fulfilled, (state) => {
            state.loading = false;
            state.errorBlog = false;
            state.errorMessage = null
        })
        .addCase(fetchCreateBlog.rejected, (state, action) => {
            state.loading = false;
            state.errorBlog = true;
            state.errorMessage = action.payload as ApiResponse<CreateBlogValidationErrorResponseI> || 'Failded to fecth create blog'
        })

        .addCase(fecthGetOneBlogPage.pending, (state) => {
            state.loading = true;
            state.errorBlog = false;
            state.errorMessage = null;
        })
        .addCase(fecthGetOneBlogPage.fulfilled, (state, action) => {
            state.loading = false;
            state.errorBlog = false;
            state.errorMessage = null;
        })
        .addCase(fecthGetOneBlogPage.rejected, (state, action) => {
            state.loading = false;
            state.errorBlog = true;
            state.errorMessage = action.payload as ApiResponse<CreateBlogValidationErrorResponseI> || 'Failded to fecth get one blog'
        });
    }
});

export default blogSlice.reducer;

export const selectLoading = (state: any) => state.blog.loading;
export const selectError = (state: any) => state.blog.error;
