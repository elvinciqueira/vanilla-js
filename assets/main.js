import data from './data.js';
import CardapioList from './components/CardapioList.js';
import { render } from './lib/dom.js';

const log = console.log;

const $cardapios = document.querySelector('#app');

const menus = Array.from(data.menus.values())
  .slice(3)
  .map(function (menu) {
    return {
      ...menu,
      restaurant: {
        name: data.restaurants.get(menu.restaurantId).name,
      },
    };
  });

$cardapios.appendChild(render(CardapioList(menus)));
