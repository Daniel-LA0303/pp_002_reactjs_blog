// src/routes/Routes.tsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';

import Search from '../features/search/pages/Search';

import CreateBlog from '../features/blog/pages/CreateBlog';
import ViewBlog from '../features/blog/pages/ViewBlog';
import Profile from '../features/user/pages/Profile';
import UserSettings from '../features/user/pages/UserSettings';
import ViewCategories from '../features/category/pages/ViewCategories';
import Home from '../pages/Home/Home';
import PrincipalDashBoard from '../features/user/pages/dahsboard/PrincipalDashBoard';
import BlogsByUserDashboard from '../features/user/pages/dahsboard/BlogsByUserDashboard';
import BlogsByLikeDashboard from '../features/user/pages/dahsboard/BlogsByLikeDashboard';
import BlogsByCommentDashboard from '../features/user/pages/dahsboard/BlogsByCommentDashboard';
import BlogsBySavedDashboard from '../features/user/pages/dahsboard/BlogsBySavedDashboard';
import CategoriesByUserDashboard from '../features/user/pages/dahsboard/CategoriesByUserDashboard';
import UserFollowersDashboard from '../features/user/pages/dahsboard/UserFollowersDashboard';
import UserFollowingDashboar from '../features/user/pages/dahsboard/UserFollowingDashboar';
import PrivateRoute from './config/PrivateRoute';
import PublicAuthRoute from './config/PublicAuthRoute';
import WrappedBlogsByCategory from '../features/category/pages/WrappedBlogsByCategory ';
import UserConfirmed from '../features/auth/pages/UserConfirmed';
import ResetPasswordRequest from '../features/auth/pages/ResetPasswordRequest';
import ResetPasswordConfirm from '../features/auth/pages/ResetPasswordConfirm';
import AllNotifications from '../features/user/pages/AllNotifications';


const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route element={<PublicAuthRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-confirm/:id" element={<UserConfirmed />} />
        <Route path="/reset-password" element={<ResetPasswordRequest />} />
        <Route path="/new-password/:id" element={<ResetPasswordConfirm />} />

      </Route>

      {/* public routes */}
      <Route path='/search/:query' element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/view-blog/:id" element={<ViewBlog />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/categories" element={<ViewCategories />} />
      {/* <Route path="/categoy-by-blog/:nameCategory" element={<BlogsByCategory />}/> */}

      {/* <Routes> */}
      <Route path="/categoy-by-blog/:nameCategory" element={<WrappedBlogsByCategory />} />
      {/* </Routes> */}

      <Route path='/home-dev' element={<Home />} />
      <Route path="/" element={<Navigate to="/home-dev" />} />

      {/* private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/user-settings/:id" element={<UserSettings />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<PrincipalDashBoard />} />
        <Route path="/blogs-published/:id" element={<BlogsByUserDashboard />} />
        <Route path="/blogs-by-likes/:id" element={<BlogsByLikeDashboard />} />
        <Route path="/blogs-by-comments/:id" element={<BlogsByCommentDashboard />} />
        <Route path="/blogs-by-save/:id" element={<BlogsBySavedDashboard />} />
        <Route path="/categories-following/:id" element={<CategoriesByUserDashboard />} />
        <Route path="/users-followers/:id" element={<UserFollowersDashboard />} />
        <Route path="/users-following/:id" element={<UserFollowingDashboar />} />
        <Route path="/notifications/:id" element={<AllNotifications />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;

