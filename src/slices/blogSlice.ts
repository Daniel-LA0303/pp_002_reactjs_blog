import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateBlogRequestI } from "../types/blog";
import { fetchCreateBlogRequest, fetchGetOneBlog } from "../services/blogService";
import { ApiResponse } from "../types/category";

interface BlogState {
    loading: boolean;
    errorBlog: boolean;
    errorMessage: ApiResponse<any> | string | null;
}

const initialState: BlogState = {
    loading: false,
    errorBlog: false,
    errorMessage: null
}

export const resetError = createAction('blog/resetError');

export const fetchCreateBlog = createAsyncThunk(
    'blog/createBlog',
    async (blog: CreateBlogRequestI, {rejectWithValue}) => {
        try {            
            const response = await fetchCreateBlogRequest(blog);
            console.log("response-create-blog-redux", response);
            
            return response.data;
        } catch (error: any) {
            console.log();
            
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
    reducers: {
        resetBlogState: (state) => {
            state.loading = false;
            state.errorBlog = false;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // create blog
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
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fecth create blog'
        })
        // get one blog
        .addCase(fecthGetOneBlogPage.pending, (state) => {
            state.loading = true;
            state.errorBlog = false;
            state.errorMessage = null;
        })
        .addCase(fecthGetOneBlogPage.fulfilled, (state) => {
            state.loading = false;
            state.errorBlog = false;
            state.errorMessage = null;
        })
        .addCase(fecthGetOneBlogPage.rejected, (state, action) => {
            state.loading = false;
            state.errorBlog = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fecth get one blog'
        })
        // reset error
        .addCase(resetError, (state) => {
            // reset the error state
            state.errorBlog = false;
            state.errorMessage = null;
        });
    }
});

export const { resetBlogState } = blogSlice.actions; 
export default blogSlice.reducer;

export const selectLoading = (state: any) => state.blog.loading;
export const selectError = (state: any) => state.blog.errorError;
export const selectErrorMessage = (state: any) => state.blog.errorMessage;
