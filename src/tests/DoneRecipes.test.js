import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const pathDoneRecipes = '/done-recipes';

describe('teste da página doneRecipes', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  afterEach(() => {
    cleanup();
  });

  it('Verifica se a página renderizou corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push(pathDoneRecipes));

    expect(history.location.pathname).toBe(pathDoneRecipes);

    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    const allFRecipes = screen.getAllByTestId(/horizontal-name/);
    const imageMeal = screen.getByTestId('0-horizontal-image');
    const imageDrink = screen.getByTestId('1-horizontal-image');

    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(allFRecipes.length).toBe(2);
    expect(imageMeal).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(imageDrink).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });
  it('Verifica a funcionalidade dos botões da página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push(pathDoneRecipes));

    const allFRecipes = screen.getAllByTestId(/horizontal-name/);
    expect(allFRecipes.length).toBe(2);

    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilter);

    const applyMealFilter = screen.getAllByTestId(/horizontal-name/);
    expect(applyMealFilter.length).toBe(1);

    const allFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilter);

    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);

    const applyDrinkFilter = screen.getAllByTestId(/horizontal-name/);
    expect(applyDrinkFilter.length).toBe(1);

    const shareBtn = screen.getByTestId(/share-btn/);
    userEvent.click(shareBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/178319');
  });
});
