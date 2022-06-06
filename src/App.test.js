import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import renderWithRouter from './testes/utils/renderWithRouter';

test('Se existe um texto para o nome.', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText('Name');
  expect(linkElement).toBeInTheDocument();
});

test('Se existe um placeholder para o email.', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByPlaceholderText('email');
  expect(linkElement).toBeInTheDocument();
});

test('Se o botão de login existe.', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('button', {name:/^login$/i});
  expect(button).toBeInTheDocument();
});

test('Se o existe apenas um botão login.', () => {
  renderWithRouter(<App />);
  const listButton = screen.getAllByRole('button');
  expect(listButton).toHaveLength(1);
});

test('Se o botão login inicia desabilitado.', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('button');
  expect(button.disabled).toBeTruthy();
});

test('Se o botão é habilitado ao entrar com dados válidos.', () => {
  renderWithRouter(<App />);
  const VALIDNAME = 'Ana';
  const VALIDEMAIL = 'email@email.com';

  const nameElement = screen.getByPlaceholderText('name');
  const emailElement = screen.getByPlaceholderText('email');
  const button = screen.getByRole('button');
  expect(button.disabled).toBeTruthy();

  userEvent.type(nameElement, VALIDNAME);
  expect(button.disabled).toBeTruthy();

  userEvent.type(emailElement, VALIDEMAIL);
  expect(button.disabled).toBeFalsy();
});

test('Se o botão é desabilitado ao entrar com name inválido (menor que 3 letras).', () => {
  renderWithRouter(<App />);
  const INVALIDNAME = 'Hu';
  const VALIDEMAIL = 'email@email.com';

  const nameElement = screen.getByPlaceholderText('name');
  const emailElement = screen.getByPlaceholderText('email');
  const button = screen.getByRole('button');
  expect(button.disabled).toBeTruthy();

  userEvent.type(nameElement, INVALIDNAME);
  userEvent.type(emailElement, VALIDEMAIL)
  expect(button.disabled).toBeTruthy();
});

test('Se o botão é desabilitado ao entrar com email inválido.', () => {
  renderWithRouter(<App />);
  const VALIDNAME = 'Ana';
  const INVALIDEMAIL1 = 'asdfaa';
  const INVALIDEMAIL2 = '@';
  const INVALIDEMAIL3 = '@asdfasfd';
  const INVALIDEMAIL4 = 'asdfasdf@asdfasfd.c';

  const nameElement = screen.getByPlaceholderText('name');
  const emailElement = screen.getByPlaceholderText('email');
  const button = screen.getByRole('button');
  expect(button.disabled).toBeTruthy();

  userEvent.type(nameElement, VALIDNAME);
  userEvent.type(emailElement, INVALIDEMAIL1)
  expect(button.disabled).toBeTruthy();

  emailElement.value = ''
  // expect(emailElement.value).toBe('');
  userEvent.type(emailElement, INVALIDEMAIL2)
  expect(button.disabled).toBeTruthy();

  emailElement.value = ''
  // expect(emailElement.value).toBe('');
  userEvent.type(emailElement, INVALIDEMAIL3)
  expect(button.disabled).toBeTruthy();

  emailElement.value = ''
  // expect(emailElement.value).toBe('');
  userEvent.type(emailElement, INVALIDEMAIL4)
  expect(button.disabled).toBeTruthy();
});

test('Se com dados válidos é redirecionado para a página /home.', () => {
  const { history } = renderWithRouter(<App />);
  const VALIDNAME = 'Ana';
  const VALIDEMAIL = 'email@email.com';

  const nameElement = screen.getByPlaceholderText('name');
  const emailElement = screen.getByPlaceholderText('email');
  const button = screen.getByRole('button');

  userEvent.type(nameElement, VALIDNAME);
  userEvent.type(emailElement, VALIDEMAIL);
  expect(button.disabled).toBeFalsy(); // Habilitado

  userEvent.click(button);

  expect(history.location.pathname).toBe('/home')
});