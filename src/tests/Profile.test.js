import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página Profile', () => {
  const email = 'email-input';
  const password = 'password-input';
  const typedEmail = 'nome@test.com';

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {
    cleanup();
  });

  it('Verifica se o email do usuário está na página Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/profile');
    });

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBe(profileEmail);
  });
  it('Verifica se o botão Done Recipes altera para a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/profile');
    });

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica se o botão Favorite Recipes altera para a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/profile');
    });

    const favBtn = screen.getByTestId('profile-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifica se o botão Logout altera para a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, typedEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    act(() => {
      history.push('/profile');
    });

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
