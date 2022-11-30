import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página de Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {
    cleanup();
  });

  it('Verifica se o botão é desabilitado com a inserção incorreta dos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'NomeSobrenome');
    userEvent.type(passwordInput, '12345');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput.value).toBe('NomeSobrenome');
    expect(passwordInput.value).toBe('12345');
    expect(btn).toBeDisabled();
  });
  it('Verifica se o login é efetuado com sucesso, quando os inputs são inseridos corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'nome@test.com');
    userEvent.type(passwordInput, '1234567');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput.value).toBe('nome@test.com');
    expect(passwordInput.value).toBe('1234567');
    expect(btn).toBeEnabled();

    act(() => userEvent.click(btn));
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/meals');
  });
});
