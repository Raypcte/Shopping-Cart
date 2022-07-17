const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('Teste a função getSavedCartItems', () => {
it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
})

