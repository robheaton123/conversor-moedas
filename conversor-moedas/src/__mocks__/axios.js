//funcao JEST 
//o codigo abaixo serve para não utilizar o objeto real(da API)
export default {
    get: jest.fn().mockResolvedValue({data: {} })
};