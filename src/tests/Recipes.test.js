import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página de Recipe', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(emailInput, 'nome@test.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.click(btn);

    act(() => {
      history.push('/meals');
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('Verifica se as receitas são renderizadas', async () => {
    renderWithRouterAndRedux(<App />);
    const firstRecipe = await screen.findByTestId('0-recipe-card');
    const firstRecipeName = await screen.findByTestId('0-card-name');
    const firstRecipeImg = await screen.findByTestId('0-card-img');

    expect(firstRecipe).toBeInTheDocument();
    expect(firstRecipeName).toHaveTextContent('Corba');
    expect(firstRecipeImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
  });
});
