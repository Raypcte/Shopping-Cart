require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Execute a função fetchItem com o argumento do item ', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledTimes(1);
  });

  it('Verificando a url passada no fetch', () => {
    fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(url);
  });

  it('Verificar o retorno da funçao fetchItem com o argumento Computador', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem', () => {
    expect(() => fetchItem()).toThrow('You must provide an url');
  });
});
