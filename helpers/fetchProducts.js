const fetchProducts = (argumento) => {
  if(!argumento){
    throw new Error ('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${argumento}` ;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
