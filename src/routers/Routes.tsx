// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import CreateBlog from '../pages/Blog/CreateBlog';
import ViewBlog from '../pages/Blog/ViewBlog';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />

      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/view-blog" element={<ViewBlog />} />
      
    </Routes>
  );
};

export default AppRoutes;
