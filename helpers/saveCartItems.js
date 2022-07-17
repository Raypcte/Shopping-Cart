const saveCartItems = (argumento) => {
 localStorage.setItem('cartItems', argumento);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
