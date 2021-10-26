import data from './data.js';
import el from './lib/dom.js';
import CardCardapio from './components/CardCardapio.js';

const log = console.log;

const $cardapios = document.querySelector('.cardapios');
const $fragment = document.createDocumentFragment();

Array.from(data.menus.values())
  .slice(0, 3)
  .map((menu) => ({
    ...menu,
    restaurant: {
      name: data.restaurants.get(menu.restaurantId).name,
    },
  }))
  .forEach((menu) => {
    console.log(CardCardapio(menu));
    // $fragment.appendChild(tplCardapio(menu));
  });

// $cardapios.appendChild($fragment);
