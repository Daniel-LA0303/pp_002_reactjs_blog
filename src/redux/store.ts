import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/categorySlice';
import userReducer from '../slices/userSlice';
import blogReducer from '../slices/blogSlice'
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    user: userReducer,
    blog: blogReducer,
    auth: authReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;