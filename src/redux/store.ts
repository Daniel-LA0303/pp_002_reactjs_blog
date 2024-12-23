import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/categorySlice';

// Si vas a tener reducers, los importas aquí


export const store = configureStore({
  reducer: {
    // Asegúrate de agregar tus reducers aquí
    categories: categoryReducer,
  },
});

// Definir tipos para el store y los dispatchers (útil para TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;