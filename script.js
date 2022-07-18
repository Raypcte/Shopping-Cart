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

function valorTotal() {
  const itensLista = document.querySelectorAll('.cart__item');
  let total = 0;
  itensLista.forEach((li) => {
    const preco = Number(li.innerHTML.split('$')[1]);
    total += preco;
  });
  console.log(total);
  const pTotal = document.querySelector('.total-price');
  pTotal.innerHTML = total;
}

const cartItemClickListener = (event) => {
  const removerItem = event.target;
  removerItem.remove();
  valorTotal();
};

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
  const produto = createCartItemElement({
    sku: id,
    name: item.title,
    salePrice: item.price,
  });

  ol.appendChild(produto);
  saveCartItems(ol.innerHTML);
  valorTotal();
  // console.log('produto', ol.innerHTML);
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

function atualizaCarrinho() {
  const produtosCarrinho = getSavedCartItems();
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = produtosCarrinho;

  const itensLista = document.querySelectorAll('.cart__item');
  console.log(itensLista);
  itensLista.forEach((li) =>
    li.addEventListener('click', cartItemClickListener));
  valorTotal();
}

window.onload = () => {
  atualizaCarrinho();
  renderizaProdutos();
};
