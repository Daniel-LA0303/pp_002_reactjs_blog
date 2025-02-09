import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { fetchGetProfile, fetchGetUpdateUserInfo, fetchPutUpdateUserInfo } from '../services/userService';
import { UserUpdateInfoRequest } from '../types/user';
import { ApiResponse } from '../types/category';


interface UserState {
    loading: boolean;
    errorUser: boolean;
    errorMessage: ApiResponse<any> | string | null;
}

const initialState: UserState = {
    loading: false,
    errorUser: false,
    errorMessage: null,
};

export const resetUserError = createAction('user/resetUserError');

export const fetchGetProfileBackToolkit = createAsyncThunk(
    'user/getProfile',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await fetchGetProfile(id); 
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error to get user profile');
      }
    }
);

export const fetchGetUpdateUserInfoToolkit = createAsyncThunk(
  'user/getUpdateUserInfo',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetchGetUpdateUserInfo(id); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error to get user profile');
    }
  }
);

export const fetchPutUpdatedUserInfoToolkit = createAsyncThunk(
  'user/putUpdatedUserInfo',
  async ({ id, userInfoUpdated }: { id: number; userInfoUpdated: UserUpdateInfoRequest }, { rejectWithValue }) => {
    console.log(id, userInfoUpdated);
    
    try {
      const response = await fetchPutUpdateUserInfo(id, userInfoUpdated);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error to get user profile');
    }
  }
);


const userProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      resetUserState: (state) => {
          state.loading = false;
          state.errorUser = false;
          state.errorMessage = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGetProfileBackToolkit.pending, (state) => {
          state.loading = true;
          state.errorUser = false; 
          state.errorMessage = null;
        })
        .addCase(fetchGetProfileBackToolkit.fulfilled, (state) => {
          state.loading = false;
          state.errorUser = false;
          state.errorMessage = null;
        })
        .addCase(fetchGetProfileBackToolkit.rejected, (state, action) => {
          state.loading = false;
          state.errorUser = true;
          state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fetch to get user profile';
        })

        // when we get update user info
        .addCase(fetchGetUpdateUserInfoToolkit.pending, (state) => {
          state.loading = true;
          state.errorUser = false;
          state.errorMessage = null; 
        })
        .addCase(fetchGetUpdateUserInfoToolkit.fulfilled, (state) => {
          state.loading = false;
          state.errorUser = false;
          state.errorMessage = null;
        })
        .addCase(fetchGetUpdateUserInfoToolkit.rejected, (state, action) => {
          state.loading = false;
          state.errorUser = true;
          state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fetch to get user profile';
        })

        // when we put user info
        .addCase(fetchPutUpdatedUserInfoToolkit.pending, (state) => {
          state.loading = true;
          state.errorUser = false;
          state.errorMessage = null; 
        })
        .addCase(fetchPutUpdatedUserInfoToolkit.fulfilled, (state) => {
          state.loading = false;
          state.errorUser = false;
          state.errorMessage= null;
        })
        .addCase(fetchPutUpdatedUserInfoToolkit.rejected, (state, action) => {
          state.loading = false;
          state.errorUser = true;
          state.errorMessage = action.payload as ApiResponse<any> || 'Failded to fetch to get user profile';
        })

        // reset error
        .addCase(resetUserError, (state) => {
          state.errorUser = false;
          state.errorMessage = null;
        });
    },
});
  

// export user slice to use it in the store
export default userProfileSlice.reducer;

export const selectLoading = (state: any) => state.user.loading;
export const selectError = (state: any) => state.user.errorUser;
export const selectErrorMessage = (state: any) => state.user.errorMessage;