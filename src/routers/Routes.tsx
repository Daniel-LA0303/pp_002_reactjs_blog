// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';

import Search from '../pages/Search/Search';

import CreateBlog from '../pages/Blog/CreateBlog';
import ViewBlog from '../pages/Blog/ViewBlog';
import Profile from '../pages/UserPages/Profile';
import UserSettings from '../pages/UserPages/UserSettings';
import ViewCategories from '../pages/Category/ViewCategories';
import Home from '../pages/Home/Home';
import PrincipalDashBoard from '../pages/UserPages/Dashboard/PrincipalDashBoard';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route path='/search' element={<Search />} />

      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/view-blog/:id" element={<ViewBlog />} />

      

      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/user-settings/:id" element={<UserSettings />} />
      <Route path="/dashboard" element={<PrincipalDashBoard />} />  

      <Route path="/categories" element={<ViewCategories />} />

      <Route path='/home-dev' element={<Home />} />

    </Routes>
  );
};

export default AppRoutes;
