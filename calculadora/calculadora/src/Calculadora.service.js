function CalculadoraService(){

    const SOMA = '+';
    const SUB = '-';
    const MULT = '*';
    const DIV = '/';
    
    function calcular(num1,num2,operacao){
        let resultado;

        switch(operacao){
            case SOMA:
            resultado = num1 + num2;
            break;
            case SUB:
            resultado = num1 - num2;
            break;
            case MULT:
            resultado = num1 * num2;
            break;
            case DIV:
            resultado = num1 / num2;
            break;
            default:
                resultado = 0;
        }

        return resultado;
    }

    function concatenarNum(numAtual, numConcat) {
        
        //caso contehnha apenas '0' ou null, reinicia o valor
        if (numAtual === '0' || numAtual === null){
            numAtual = ''
        }
        
        //primeiro digito for '.' concatenar '0' antes do ponto
        if(numConcat === '.' && numAtual === ''){
            return '0.';
        }

        //caso '.' digitado e ja contenha um ponto, apenas retornar
        if(numConcat === '.' && numAtual.indexOf('.') > -1){ //caso o index seja maior que -1, ou seja, contenha o ponto
            return numAtual;
        }
        //console.log(numAtual+' '+numConcat)
        return numAtual + numConcat;

    }

    //retornando funcao pelo service
    return [
        calcular,
        concatenarNum,
        SOMA,
        SUB,
        MULT,
        DIV
    ];

}

//declaracao para habilitar a exportacao da funcao
export default CalculadoraService;