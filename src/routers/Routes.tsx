// src/routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Search from '../pages/Search/Search';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />







      <Route path='/search' element={<Search />} />
      
    </Routes>
  );
};

export default AppRoutes;
