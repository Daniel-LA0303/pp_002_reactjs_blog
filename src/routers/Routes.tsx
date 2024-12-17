// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      
    </Routes>
  );
};

export default AppRoutes;
