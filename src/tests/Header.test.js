import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste o componente Header', () => {
  const email = 'email-input';
  const password = 'password-input';
  const typedEmail = 'nome@test.com';

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {
    cleanup();
  });

  it('Verifica se ao clicar no botão de perfil, é redirecionado á página Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/meals');
    });

    const mealsTitle = screen.getByTestId('page-title');
    expect(mealsTitle).toHaveTextContent('Meals');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);
    const profiletitle = screen.getByTestId('page-title');
    expect(profiletitle).toHaveTextContent('Profile');
  });

  it('Verifica se ao clicar no botão "Search" o input de pesquisa é rederizado, e removido ao clicar novamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByAltText('search Icon');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
