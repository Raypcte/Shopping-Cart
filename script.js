// const { fetchProducts } = require('./helpers/fetchProducts');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function fetchItemsCar(id) {
 const item = await fetchItem(id);
 const ol = document.querySelector('.cart__items');
 ol.appendChild(createCartItemElement({ sku: id, name: item.title, salePrice: item.price }));
}

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section'); // Criou uma section
  section.className = 'item'; // Criou uma classe na section

  section.appendChild(createCustomElement('span', 'item__sku', sku)); // atribuir um filho span com sku
  section.appendChild(createCustomElement('span', 'item__title', name)); // com nome
  section.appendChild(createProductImageElement(image)); // com imagem
  const botaoAdd = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  botaoAdd.addEventListener('click', () => fetchItemsCar(sku));
  section.appendChild(botaoAdd); // com botao

  return section;
};

async function renderizaProdutos() {
  const produtos = await fetchProducts('computador'); // Esperando a promessa dos produtos chegar
  const sessaoProdutos = document.querySelector('.items'); // pegando a section do html.
  produtos.results.forEach((produto) => {
    // forEach para percorrer os produtos
    const produtoComputador = createProductItemElement({
      sku: produto.id,
      name: produto.title,
      image: produto.thumbnail,
    });

    sessaoProdutos.appendChild(produtoComputador); // Aqui fiz o appdendiChild para levar os itens do JS para o html tipo push
  });
  // console.log(produtos);
}

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

window.onload = () => {
  renderizaProdutos();
};
