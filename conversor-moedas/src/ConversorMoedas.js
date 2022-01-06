import React, {useState} from 'react';
import logo from './logo.svg';
import './ConversorMoedas.css';
import { Card, Button, Form, Col, Spinner, Row, Container, 
Alert, Modal, ModalBody, ModalFooter} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListarMoedas from './ListarMoedas';
import axios from 'axios';

//App
function ConversorMoedas() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=64f3a54b0392056f2fd6c3873ed457d2';

  //valor - variavel dinamica
  //setvalor - alterar valor da var valor
  //useState - para setar o valor padrao 1
  const [valor, setValor] = useState('1');
  const [moedaDe, setMoedaDe] = useState('BRL');
  const [moedaPara, setMoedaPara] = useState('USD');
  const [exibirSpinner,setExibirSpinner] = useState(false);
  const [formValidado,setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState("");
  const [exibirErro,setExibirErro] = useState(false);

  //onChange - quando apertar tecla do teclado (quando o estado do input muda)
  //event.target.value - recebe o valor do Form control - 
  //event.target - É uma referência ao objeto que enviou o evento.
  function handleValor(event){
    // /\D/g - expressao regular global, g para global (percorre todos os caracteres)
    // \D - Encontra correspondência com um caractere que não seja número
    setValor(event.target.value.replace(/\D/g, ''));
  }
  function handleMoedaDe(event) {
    setMoedaDe(event.target.value);
  }
  function handleMoedaPara(event) {
    setMoedaPara(event.target.value);
  }
  function handleFecharModal(event){
    setValor('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setExibirModal(false);
  }
  function converter(event){
    event.preventDefault();//cancela evento de validacao
    setFormValidado(true);//valida manualmente
    //verifica se validated está true (campos estão (corretos) validados)
    if(event.currentTarget.checkValidity() === true){
      setExibirSpinner(true);
      //axios para manipular a API
      axios.get(FIXER_URL)
      .then(result => {
       const cotacao = obterCotacao(result.data);//result.data -> o objeto JSON da API
       if(cotacao){
       setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
       setExibirSpinner(false);
       setExibirModal(true);
       setExibirErro(false);
      }
       else{
        exibirErroFun();
       }
      }).catch(err => {
        exibirErroFun();
      });
    }
    //alert(cotacao);
  }

  function obterCotacao(dadosCotacao){
    //se JSON retornar false
    if(!dadosCotacao || dadosCotacao.success !== true){
      return false;
    }
    //pegando dados da API para realizar o calculo(cotacao)
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  function exibirErroFun(){
    setExibirErro(true);
    setExibirSpinner(false);
  }

  return (
    <Container fluid>
      {/*Modal - react bootstrap*/}
      <Modal show={exibirModal} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conversão</Modal.Title>
        </Modal.Header>
        <Modal.Body data-testid="modal">{/*para testes */}
          {resultadoConversao}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFecharModal}>Nova Conversão</Button>
        </Modal.Footer>
      </Modal>

      {/*Atributo false - react bootstrap*/}
      <Alert variant="danger" show={exibirErro}>
      ERRO
      </Alert>
      <Row>
        <Card style={{padding: 0}}>
          <Card.Header className="text-center"><h1>Conversor de Moedas</h1></Card.Header>
          <Card.Body>
            <Form onSubmit={converter} noValidate/*não usa a validacao do html5 no submit*/ validated={formValidado}>
              <Row>
                <Col sm={3}>
                  <Form.Control
                  //para alterar o valor do form.control deve-se usar uma variavel dinamica
                  placeholder="0"
                  value={valor} //dinamico
                  onChange={handleValor}
                  required
                  />
                </Col>
                <Col sm={3}>
                  {/* formulario do tipo select */}
                  <Form.Control as="select"
                  value={moedaDe}
                  onChange={handleMoedaDe}
                  >
                    <ListarMoedas/>
                  </Form.Control>
                </Col>
                <Col sm={1} className="text-center pt-2">
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Col>
                <Col sm={3}>
                  <Form.Control as="select"
                  value={moedaPara}
                  onChange={handleMoedaPara}> 
                    <ListarMoedas/>
                  </Form.Control>
                </Col>
                <Col sm={2} className="text-center">
                  <Button variant="success" type="submit" data-testid="btn-converter">
                    {/*spinner react bootstrap*/}
                    <span className={exibirSpinner ? null: "hidden"}>
                    <Spinner animation="border" size="sm" />
                    </span>
                    <span className={exibirSpinner ? "hidden": null}>
                    Converter
                    </span>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      
      <Row>
        <Col>

        </Col>
        <Col>
          <img src={logo} className="App-logo text-center" alt="react-logo"/>
        </Col>
        <Col>
        
        </Col>
      </Row>
    </Container>
  );
}
//exportando App
export default ConversorMoedas;
