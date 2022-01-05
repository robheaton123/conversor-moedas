import logo from './logo.svg';
import React, {useState} from 'react';
import './Calculadora.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
//funcao que é renderizada pelo index.js
import CalculadoraService from './Calculadora.service';

function Calculadora() {

  //importando funcoes da Calculadora.service
  const [calcular, concatenarNum, SOMA, SUB, MULT, DIV] = CalculadoraService();

  //variavel de estado(txtNum) inicializada com 0 , metodo setTxtNum para alterar o parametro da função
  //desconstruiu a função
  //constante ---- altera o valor da constante(estado) em tempo real
  const [txtNum, setTxtNum] = useState('0');

  //variaveis de estado para executar as operacoes
  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState(null);
  const [operacao, setOperacao] = useState(null);
  
  //funcao para concatenar txtNum com outro valor
  function adicionarNumero(numero) {
    //testes setTxtNum(txtNum + numero);
    let resultado;
    if (operacao === null){
      resultado = concatenarNum(num1,numero);
      setNum1(resultado);  //seta Num1 ex 77
    }else{
      //se houver operacao seta o num2
      resultado = concatenarNum(num2,numero);
      setNum2(resultado); //seta Num2 ex 4
    }

    setTxtNum(resultado);
  }

  //definir operacao / * - +
  function definirOperacao(op){
    //apenas define a operacao caso ela nao exista
    if(operacao === null){
      setOperacao(op);
      return;
    }

    //caso operacao estiver definida e numero 2 já escolhido, realiza o calculo da operacao.
    if(num2 !== null){
      //calculo nao muda
      const resultado = calcular(parseFloat(num1), parseFloat(num2), operacao);
      setOperacao(op);
      setNum1(resultado.toString());
      setNum2(null);
      setTxtNum(resultado.toString());
    }

  }

  //acao calcular -> =
  //se num2 nao estiver setado, não acontece nada
  function acaoCalcular() {
    if(num2 === null){
      return;
    }

    //nao executado se num2 === null
    const resultado = calcular(parseFloat(num1),parseFloat(num2),operacao);
    setTxtNum(resultado);
  }

  //zerar calculadora botao C
  //reinicializando variaveis
  function limpar(){
    setTxtNum('0');
    setNum1('0');
    setNum2(null);
    setOperacao(null);
  }

  return (
    
  <Container style={{
    background: 'transparent !important',
    backgroundColor: '#87CEEB',
    width: '600px',
    margin: '100px auto'
  }} >

    <Container>

      <Row>
        <Col xs="3">
          <Button variant="danger"
          //não precisa ser funcao anonima pois não tem parametro
          onClick={limpar}>C</Button>
        </Col>
        <Col xs="9">
          <Form.Control type="text" name="txtNum" style={{textAlign: 'right'}} 
          readOnly="readOnly" value={txtNum} data-testid="txtNum"/>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="light" 
          //funcao anonima chamada, para chamar a funcao adicionarNumero
          onClick={() => adicionarNumero('7')}>7</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('8')}>8</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('9')}>9</Button>
        </Col>
        <Col>
          <Button variant="warning"
          onClick={() => definirOperacao(DIV)}>/</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('4')}>4</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('5')}>5</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('6')}>6</Button>
        </Col>
        <Col>
          <Button variant="warning"
          onClick={() => definirOperacao(MULT)}>*</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('1')}>1</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('2')}>2</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('3')}>3</Button>
        </Col>
        <Col>
          <Button variant="warning"
          onClick={() => definirOperacao(SUB)}>-</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('0')}>0</Button>
        </Col>
        <Col>
          <Button variant="light"
          onClick={() => adicionarNumero('.')}>.</Button>
        </Col>
        <Col>
          <Button variant="success"
          //não precisa ser funcao anonima pois não tem parametro
          onClick={acaoCalcular}>=</Button>
        </Col>
        <Col>
          <Button variant="warning"
          onClick={() => definirOperacao(SOMA)}>+</Button>
        </Col>
      </Row>

    </Container>

  </Container>

  );
}
//exportando a funcao
export default Calculadora;
