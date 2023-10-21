import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Meals from '../components/Meals';

const mockStore = configureStore([]);
const initialState = {
  meals: {
    mealsData: [], // Your initial state here
    loading: false,
    error: '',
  },
};

describe('Meals', () => {
  it('should render loading message when loading is true', () => {
    const store = mockStore({
      meals: {
        ...initialState.meals,
        loading: true,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          {' '}
          {/* Wrap your component with Router */}
          <Meals />
        </Router>
      </Provider>,
    );

    expect(getByText('Loading...')).toBeTruthy();
    expect(getByText('please wait')).toBeTruthy();
  });

  it('should render error message when error is true', () => {
    const store = mockStore({
      meals: {
        ...initialState.meals,
        error: 'Error message',
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          {' '}
          {/* Wrap your component with Router */}
          <Meals />
        </Router>
      </Provider>,
    );

    expect(getByText('Error!')).toBeTruthy();
    expect(getByText('Try again later')).toBeTruthy();
  });

  it('should render MealsItem components when not loading and no error', () => {
    const store = mockStore({
      meals: {
        ...initialState.meals,
      },
    });

    // eslint-disable-next-line no-unused-vars
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Router>
          {/* Wrap your component with Router */}
          <Meals />
        </Router>
      </Provider>,
    );
    // Add your assertions for rendering MealsItem components here
  });
});
