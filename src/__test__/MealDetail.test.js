import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MealsDetails from '../components/MealDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('MealsDetails', () => {
  it('should render the component with error state', () => {
    useSelector.mockReturnValue({ loading: false, error: true, mealsDetail: null });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <MealsDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText('Error...')).toBeTruthy();
  });
});
