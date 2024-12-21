// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import CreateBlog from '../pages/Blog/CreateBlog';
import ViewBlog from '../pages/Blog/ViewBlog';
import Profile from '../pages/UserPages/Profile';
import UserSettings from '../pages/UserPages/UserSettings';
import ViewCategories from '../pages/Category/ViewCategories';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />

      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/view-blog" element={<ViewBlog />} />
      

      <Route path="/profile" element={<Profile />} />
      <Route path="/user-settings" element={<UserSettings />} />

      <Route path="/categories" element={<ViewCategories />} />

    </Routes>
  );
};

export default AppRoutes;
