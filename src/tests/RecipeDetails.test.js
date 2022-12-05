import { act, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página de Recipe', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    cleanup();
  });
  it('Verifica se a receita é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/meals/52771'));

    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeImg = await screen.findByTestId('recipe-photo');
    const recipeVideo = await screen.findByTestId('video');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeInstructions = await screen.findByTestId('instructions');

    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');
    expect(recipeImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(recipeVideo).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
    expect(recipeCategory).toHaveTextContent('Vegetarian');
    expect(recipeInstructions).toHaveTextContent(/Bring a large pot of water to a boil/);
  });
  it('Verifica se as recomendações são renderizadas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/meals/52771'));

    const recommendationTitle = await screen.findByTestId('0-recommendation-title');
    const recommendationImg = await screen.findByTestId('0-card-img');

    expect(recommendationTitle).toHaveTextContent('GG');
    expect(recommendationImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
  });
  it('Verifica os botões da página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks/178319');
    });

    const shareBtn = await screen.findByTestId('share-btn');
    const favBtn = await screen.findByTestId('favorite-btn');
    const startBtn = await screen.findByTestId('start-recipe-btn');

    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();

    // act(() => userEvent.click(shareBtn));

    // const linkCopied = await screen.findByText('Link copied!');
    // expect(linkCopied).toBeInTheDocument();

    act(() => userEvent.click(startBtn));

    waitFor(() => expect(history.location.pathname).toBe('/drinks/17222/in-progress'));
  });
});
