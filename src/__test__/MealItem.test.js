import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MealsItem from '../components/MealsItem';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('MealsItem', () => {
  it('should render the component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockData = {
      id: 1,
      image: 'image-url',
      title: 'Chicken Soup',
      amount: 100,
      unit: 'g',
    };

    render(
      <MemoryRouter>
        <MealsItem
          id={mockData.id}
          image={mockData.image}
          title={mockData.title}
          amount={mockData.amount}
          unit={mockData.unit}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(mockData.title)).toBeTruthy();
    expect(screen.getByText(mockData.amount)).toBeTruthy();
    expect(screen.getByText(mockData.unit)).toBeTruthy();
  });
});
