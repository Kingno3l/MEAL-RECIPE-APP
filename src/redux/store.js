import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './Meals/MealSlice';
import mealsDetailsReducer from './Details/DetailSlice';

const store = configureStore({
  reducer: {
    meals: mealReducer,
    mealsDetail: mealsDetailsReducer,
  },
});

export default store;
