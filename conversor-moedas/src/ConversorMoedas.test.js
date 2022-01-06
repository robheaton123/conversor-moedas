import { render, fireEvent } from '@testing-library/react';
//importando App (function)
import ConversorMoedas from './ConversorMoedas';
import axiosMock from 'axios';//importando axios.js(falso) que simula o objeto da API
import '@testing-library/jest-dom/extend-expect'; //importando expect

describe('Teste do componente de conversão de moedas',() => {

  test('Deve renderizar sem erros', () => {
    render(<ConversorMoedas />);
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
  });

//objeto falso do fixer(em axios.js) para teste
  it('deve simular uma conversão de moedas', async () => {
    const {findByTestId, getByTestId} = render(<ConversorMoedas/>);
    axiosMock.get.mockResolvedValueOnce({
      data: {success: true, rates: {BRL: 4.564292, USD: 1.101049}}
    });
    //simulando teste do botao
    fireEvent.click(getByTestId('btn-converter'));
    //await para aguardar a requisicao ////utilizar async////
    const modal = await findByTestId('modal');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextContent('1 BRL = 0.24 USD');
});


});