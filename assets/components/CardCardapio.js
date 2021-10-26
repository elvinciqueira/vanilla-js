import el from '../lib/dom.js';

export default function CardCardapio(menu) {
  return el('div#card.cardapio', [
    el('header.card-header', [
      el(
        'h3',
        { style: 'color: red' },
        `${menu.title} - ${menu.restaurant.name}`
      ),
      el('div', [el('span', 'Oii'), 'Mundo', el('strong', '!!!')]),
    ]),
    el('div', [
      el(
        'ul',
        menu.sections.map(function (section) {
          return el('li', section.title);
        })
      ),
    ]),
  ]);
}
