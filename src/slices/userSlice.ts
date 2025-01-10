import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetProfile, fetchGetUpdateUserInfo, fetchPutUpdateUserInfo } from '../services/userService';
import { UserUpdateInfoRequest } from '../types/user';


interface UserState {
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
};

export const fetchGetProfileBack = createAsyncThunk(
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

export const fetchGetUpdateUserInfoThunk = createAsyncThunk(
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

export const fetchPutUpdatedUserInfoThunk = createAsyncThunk(
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
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchGetProfileBack.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(fetchGetProfileBack.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchGetProfileBack.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || 'Failed to fetch user profile'; 
        })

        // when we get update user info
        .addCase(fetchGetUpdateUserInfoThunk.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(fetchGetUpdateUserInfoThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchGetUpdateUserInfoThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || 'Failed to fetch user profile'; 
        })

        // when we put user info
        .addCase(fetchPutUpdatedUserInfoThunk.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(fetchPutUpdatedUserInfoThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchPutUpdatedUserInfoThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || 'Failed to fetch user profile'; 
        });
    },
});
  

// export user slice to use it in the store
export default userProfileSlice.reducer;

export const selectLoading = (state: any) => state.user.loading;
export const selectError = (state: any) => state.user.error;