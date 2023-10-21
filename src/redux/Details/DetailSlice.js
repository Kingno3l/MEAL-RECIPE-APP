import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMealsDetails = createAsyncThunk('mealsDetail/getMealsDetails', async (id) => {
  const baseUrl = `https://api.spoonacular.com/recipes/${id}/information`;
  const apiKey = '2d65b4801b2b4772b8e5bbbd4f17cec2';
  try {
    const response = await axios.get(`${baseUrl}?apiKey=${apiKey}&includeNutrition=true`);
    const data = await response.data;
    return data;
  } catch (error) {
    // eslint-disable-next-line
    console.error('Error in getMealsDetails:', error);
    return { error: true };
  }
});

const initialState = {
  mealsDetail: {},
  loading: false,
  error: '',
};

const MealsDetailsSlice = createSlice({
  name: 'mealsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMealsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMealsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsDetail = action.payload;
        const details = action.payload;
        state.mealsDetail = {
          id: details.id,
          images: details.image,
          title: details.title,
          nutrient: details.nutrition.nutrients,
        };
      })
      .addCase(getMealsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default MealsDetailsSlice.reducer;
