import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLoginRequest, fetchRegisterRequest } from "../services/authService";
import { ApiResponse } from "../../../types/global";


interface AuthState {
    loading: boolean;
    errorAuth: boolean;
    errorMessage: ApiResponse<any> | null;
    accessToken: string | null;
    userId: number | null;
    userName: string | null;
    email: string | null;
    profileImage: string | null;
}

const initialState: AuthState = {
    loading: false,
    errorAuth: false,
    errorMessage: null,
    accessToken: localStorage.getItem('authToken'),
    userId: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') as string) : null,
    userName: localStorage.getItem('userName'),
    email: localStorage.getItem('email'),
    profileImage: localStorage.getItem('profileImage'),
};

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetchLoginRequest({ email, password });

            console.log(response);
            
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error during login');
        }
    }
);

export const fetchRegister = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }: {username: string ,email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetchRegisterRequest({ username, email, password });

            console.log(response);
            
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
            state.accessToken = null;
            state.userId = null;
            state.userName = null;
            state.email = null;
        },
        setToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        },
        clearToken(state) {
            state.accessToken = null;
            localStorage.removeItem('authToken'); // Eliminar el token de localStorage al cerrar sesión
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLogin.pending, (state) => {
            state.loading = true;
            state.errorAuth = false;
            state.errorMessage = null;
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.errorAuth = false;
            state.errorMessage = null;
            state.accessToken = action.payload.data.tokenInfo.accessToken;
            localStorage.setItem('authToken', action.payload.data.tokenInfo.accessToken as string);
            state.userId = action.payload.data.userId;
            localStorage.setItem('userId', action.payload.data.userId.toString());
            state.userName = action.payload.data.username;
            localStorage.setItem('userName', action.payload.data.username as string);
            state.email = action.payload.data.email;
            localStorage.setItem('email', action.payload.data.email as string);
            state.profileImage = action.payload.data.profileImage;
            localStorage.setItem('profileImage', action.payload.data.profileImage as string);
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false;
            state.errorAuth = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fecth login';        
            state.accessToken = null;
        })
        // Register
        .addCase(fetchRegister.pending, (state) => {
            state.loading = true;
            state.errorAuth = false;
            state.errorMessage = null;
        })
        .addCase(fetchRegister.fulfilled, (state) => {
            state.loading = false;
            state.errorAuth = false;
            state.errorMessage = null;
            //state.accessToken = action.payload.data.tokenInfo.accessToken;
            //localStorage.setItem('authToken', action.payload.data.tokenInfo.accessToken as string);
            //state.userId = action.payload.data.userId;
            //localStorage.setItem('userId', action.payload.data.userId.toString());
            //state.userName = action.payload.data.username;
            //localStorage.setItem('userName', action.payload.data.username as string);
            //state.email = action.payload.data.email;
            //localStorage.setItem('email', action.payload.data.email as string);
        })
        .addCase(fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.errorAuth = true;
            state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fecth login';        
            state.accessToken = null;
        })

        .addCase(resetAuthError, (state) => {
            // reset the error state
            state.errorAuth = false;
            state.errorMessage = null;
            state.userId = null;
            state.userName = null;
            state.email = null;
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
