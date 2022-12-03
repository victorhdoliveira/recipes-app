import { act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página favoriteRecipes', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });
  afterEach(() => {
    cleanup();
  });

  it('Verifica se a página renderizou corretamente', async () => {
    const { history, getByTestId, getAllByTestId } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/favorite-recipes'));

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));

    const allFilter = getByTestId('filter-by-all-btn');
    const mealFilter = getByTestId('filter-by-meal-btn');
    const drinkFilter = getByTestId('filter-by-drink-btn');
    const allFavorites = getAllByTestId(/horizontal-name/);

    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(allFavorites.length).toBe(2);

    act(() => userEvent.click(mealFilter));
    waitFor(() => expect(allFavorites.length).toBe(1));
    expect(allFavorites[0].innerHTML).toBe('Spicy Arrabiata Penne');

    act(() => userEvent.click(drinkFilter));
    waitFor(() => expect(allFavorites[0].innerHTML).toBe('Aquamarine'));

    act(() => userEvent.click(allFilter));
  });
});
