import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoginRequest } from "../services/authService";
import { ApiResponse } from "../types/category";


interface AuthState {
    loading: boolean;
    errorAuth: boolean;
    errorMessage: ApiResponse<any> | string | null;
}

const initialState: AuthState = {
    loading: false,
    errorAuth: false,
    errorMessage: null,
};

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetchLoginRequest({ email, password });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error during login');
        }
    }
);

export const resetAuthError = createAction('auth/resetError');


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.errorAuth = false;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLogin.pending, (state) => {
            state.loading = true;
            state.errorAuth = false;
            state.errorMessage = null;
        })
        .addCase(fetchLogin.fulfilled, (state) => {
            state.loading = false;
            state.errorAuth = false;
            state.errorMessage = null;
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false;
            state.errorAuth = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fecth login';        })

        .addCase(resetAuthError, (state) => {
            // reset the error state
            state.errorAuth = false;
            state.errorMessage = null;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectLoading = (state: any) => state.auth.loading;
export const selectError = (state: any) => state.auth.error;
export const selectErrorMessage = (state: any) => state.auth.errorMessage;
export const selectAccessToken = (state: any) => state.auth.accessToken;
export const selectTokenType = (state: any) => state.auth.tokenType;
