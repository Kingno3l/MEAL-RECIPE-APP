import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataFromServer = createAsyncThunk('meals/getDataFromServer', async () => {
  const apiKey = '2d65b4801b2b4772b8e5bbbd4f17cec2';
  const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const query = 'chicken soup';
  try {
    const response = await axios.get(`${baseUrl}?apiKey=${apiKey}&query=${query}&minCalories=50&maxCalories=100`);
    const { data } = response;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const searchDataFromServer = createAsyncThunk('meals/searchDataFromServer', async (search) => {
  const apiKey = '2d65b4801b2b4772b8e5bbbd4f17cec2';
  const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const query = search;
  try {
    const response = await axios.get(`${baseUrl}?apiKey=${apiKey}&query=${query}&minCalories=50&maxCalories=100`);
    const { data } = response;
    return data;
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  mealsData: [],
  searchMeals: [],
  loading: false,
  error: '',
};

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsData = action.payload.results.map((meal) => (
          {
            id: meal.id,
            image: meal.image,
            title: meal.title,
            amount: meal.nutrition.nutrients[0].amount,
            unit: meal.nutrition.nutrients[0].unit,
          }
        ));
      })
      .addCase(getDataFromServer.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(searchDataFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDataFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsData = action.payload.results.map((meal) => (
          {
            id: meal.id,
            image: meal.image,
            title: meal.title,
            amount: meal.nutrition.nutrients[0].amount,
            unit: meal.nutrition.nutrients[0].unit,
          }
        ));
      })
      .addCase(searchDataFromServer.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default mealSlice.reducer;
