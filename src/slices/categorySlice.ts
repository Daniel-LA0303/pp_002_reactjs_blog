import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../services/categoryService';

// Estado inicial
interface CategoryState {
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  loading: false,
  error: null,
};

// Thunk para obtener categorías
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllCategories(); // Llama al servicio para obtener categorías
      return response.data;
       // Devuelve los datos
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error al cargar las categorías');
    }
  }
);

// this slice is responsible for managing 3 possible states: loading, error, and the data itself
// so this code is executed in 2th place
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // when the fetchCategories is pending
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        // when the fetchCategories is fulfilled
      .addCase(fetchCategories.fulfilled, (state) => {
        state.loading = false;
      })
        // when the fetchCategories is rejected or there was an error
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;

// Selector para obtener el estado de carga y error
export const selectLoading = (state: any) => state.categories.loading;
export const selectError = (state: any) => state.categories.error;
