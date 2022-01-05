import React from "react";
//import React from 'react-dom';
import CalculadoraService from './Calculadora.service';

//servico para teste... JEST
//descricao do teste, funcao anonima
describe('Teste do CalculadoraService', () => {
    //const calcular recebe retorno do CalculadoraService ....que está em Calculadora.service.js
    //criando instancia para usar CalculadoraService
    const [calcular, concatenarNum, SOMA, SUB, MULT, DIV] = CalculadoraService();

    //func it para teste do Jest
    it('deve garantir que 1 + 4 = 5', () => {
        let soma = calcular(2,3,SOMA);
        //espera do retorno
        expect(soma).toEqual(5);

    });

    it('deve garantir que 1 - 4 = -3', () => {
        let subtracao = calcular(1,4,SUB)
        expect(subtracao).toEqual(-3);
    });

    it('deve garantir que 8 * 4 = 32', () => {
        let multiplicacao = calcular(8,4,MULT)
        expect(multiplicacao).toEqual(32);
    });

    it('deve garantir que 1 / 4 = 0.25', () => {
        let divisao = calcular(1,4,DIV)
        expect(divisao).toEqual(0.25);
    });

    it('deve garantir que retorne 0', () => {
        let excecao = calcular(1,4,'=')
        expect(excecao).toEqual(0);
    });


});