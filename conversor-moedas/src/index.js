import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConversorMoedas from './ConversorMoedas';
import reportWebVitals from './reportWebVitals';
//importando Bootstrap para o projeto
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ConversorMoedas />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
