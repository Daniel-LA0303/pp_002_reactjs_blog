// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';

import Search from '../pages/Search/Search';

import CreateBlog from '../pages/Blog/CreateBlog';
import ViewBlog from '../pages/Blog/ViewBlog';
import Profile from '../pages/UserPages/Profile';
import UserSettings from '../pages/UserPages/UserSettings';
import ViewCategories from '../pages/Category/ViewCategories';
import Home from '../pages/Home/Home';
import PrincipalDashBoard from '../pages/UserPages/Dashboard/PrincipalDashBoard';
import BlogsByCategory from '../pages/Category/BlogsByCategory';
import BlogsByUserDashboard from '../pages/UserPages/Dashboard/BlogsByUserDashboard';
import BlogsByLikeDashboard from '../pages/UserPages/Dashboard/BlogsByLikeDashboard';
import BlogsByCommentDashboard from '../pages/UserPages/Dashboard/BlogsByCommentDashboard';
import BlogsBySavedDashboard from '../pages/UserPages/Dashboard/BlogsBySavedDashboard';
import CategoriesByUserDashboard from '../pages/UserPages/Dashboard/CategoriesByUserDashboard';
import UserFollowersDashboard from '../pages/UserPages/Dashboard/UserFollowersDashboard';
import UserFollowingDashboar from '../pages/UserPages/Dashboard/UserFollowingDashboar';
import PrivateRoute from '../pages/Auth/PrivateRoute';
import PublicAuthRoute from '../pages/Auth/PublicAuthRoute';
import WrappedBlogsByCategory from '../pages/Category/WrappedBlogsByCategory ';


const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route element={<PublicAuthRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* public routes */}
      <Route path='/search' element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/view-blog/:id" element={<ViewBlog />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/categories" element={<ViewCategories />} />
      {/* <Route path="/categoy-by-blog/:nameCategory" element={<BlogsByCategory />}/> */}

      {/* <Routes> */}
  <Route path="/categoy-by-blog/:nameCategory" element={<WrappedBlogsByCategory />} />
{/* </Routes> */}

      <Route path='/home-dev' element={<Home />} />

      {/* private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/user-settings/:id" element={<UserSettings />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<PrincipalDashBoard />} />  
        <Route path="/blogs-published/:id" element={<BlogsByUserDashboard />} />
        <Route path="/blogs-by-likes" element={<BlogsByLikeDashboard />} />
        <Route path="/blogs-by-comments" element={<BlogsByCommentDashboard />} />
        <Route path="/blogs-by-save" element={<BlogsBySavedDashboard />} />
        <Route path="/categories-following" element={<CategoriesByUserDashboard />} />
        <Route path="/users-followers" element={<UserFollowersDashboard />} />
        <Route path="/users-following" element={<UserFollowingDashboar />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
