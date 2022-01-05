import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculadora from './Calculadora';
import '@testing-library/jest-dom/extend-expect';

describe('Calculadora', () => {

  //teste1
it('Deve renderizar o componente sem erros', () => {
  render(<Calculadora />);
  //const linkElement = screen.getByText(/learn react/i);
  ////expect(linkElement).toBeInTheDocument();
});

//teste2
it('deve limpar o campo de números', () => {
  //renderizando componente
  const {getByTestId, getByText} = render(<Calculadora />);
  //simulando click nos textos
  fireEvent.click(getByText('2'));
  //pegando pelo texto 'C'
  fireEvent.click(getByText('C'));
  //pegando pelo TestId 'txtNum' do form
  expect(getByTestId('txtNum')).toHaveValue('0');
});

//teste3
it('deve somar 2 + 3 e obter 5', () => {
  const {getByTestId, getByText } = render(<Calculadora />)
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('3'));
  fireEvent.click(getByText('='));
  expect(getByTestId('txtNum')).toHaveValue('5');
});

//teste4
it('deve subtrair 3 - 5 e obter -2', () => {
  const {getByTestId, getByText } = render(<Calculadora />)
  fireEvent.click(getByText('3'));
  fireEvent.click(getByText('-'));
  fireEvent.click(getByText('5'));
  fireEvent.click(getByText('='));
  expect(getByTestId('txtNum')).toHaveValue('-2');
});

//teste5
it('deve multiplicar 9 * 9 e obter 81', () => {
  const {getByTestId, getByText } = render(<Calculadora />)
  fireEvent.click(getByText('9'));
  fireEvent.click(getByText('*'));
  fireEvent.click(getByText('9'));
  fireEvent.click(getByText('='));
  expect(getByTestId('txtNum')).toHaveValue('81');
});

//teste6
it('deve dividir 3 / 2 e obter 1.5', () => {
  const {getByTestId, getByText } = render(<Calculadora />)
  fireEvent.click(getByText('3'));
  fireEvent.click(getByText('/'));
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('='));
  expect(getByTestId('txtNum')).toHaveValue('1.5');
});

//testePonto
it('deve somar 4.5 + 2.5 e obter 7', () => {
  const {getByTestId, getByText } = render(<Calculadora />)
  fireEvent.click(getByText('4'));
  fireEvent.click(getByText('.'));
  fireEvent.click(getByText('5'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('.'));
  fireEvent.click(getByText('5'));
  fireEvent.click(getByText('='));
  expect(getByTestId('txtNum')).toHaveValue('7');
});

});