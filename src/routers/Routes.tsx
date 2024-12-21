// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Profile from '../pages/Profile';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
