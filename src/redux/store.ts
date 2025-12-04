import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/store/categorySlice';
import userReducer from '../features/user/store/userSlice';
import blogReducer from '../features/blog/store/blogSlice'
import authReducer from '../features/auth/store/authSlice';
import commentReducer from '../features/blog/.modules/comments/store/commentSlice';
import replyReducer from '../features/blog/.modules/replies/store/replySlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    user: userReducer,
    blog: blogReducer,
    auth: authReducer,
    comment: commentReducer,
    reply: replyReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;