// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Profile from '../pages/UserPages/Profile';
import UserSettings from '../pages/UserPages/UserSettings';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user-settings" element={<UserSettings />} />
    </Routes>
  );
};

export default AppRoutes;
