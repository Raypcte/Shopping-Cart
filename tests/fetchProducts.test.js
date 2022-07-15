require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
describe('1 Teste a função fetchProducts', () => {
  it('Verificar se "fetchproducts" é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verificar se a função chama o "fetch"', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledTimes(1);
  });

  it('Verificar se a função chama o "fetch"', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledTimes(1);
  });

  it('Verificando a url passada no fetch', () => {
    fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });

  it('Verificar o retorno da funçao fetchProducts com o argumento Computador', async () => {
    expect(await fetchProducts('computador')).toBe(computadorSearch);
  });

  it('Verificar se gera erro com mensagem', async () => {
    await expect(() =>fetchProducts()).toThrow('You must provide an url');
  });
});
