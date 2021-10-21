import data from './data.js';

const log = console.log;

function isChildren(children) {
  return Array.isArray(children) || typeof children === 'string';
}

function el(tagName, props, children) {
  const $el = document.createElement(tagName);
  const _children = isChildren(props) ? props : children;
  const _props = !isChildren(props) ? props : [];
  Object.entries(_props).forEach(([key, value]) => {
    $el.setAttribute(key, value);
  });
  if (typeof _children === 'string') {
    $el.appendChild(document.createTextNode(_children));
  } else {
    for (let $child of _children) {
      $el.appendChild($child);
    }
  }

  return $el;
}

const $cardapios = document.querySelector('.cardapios');
const $fragment = document.createDocumentFragment();

function tplCardapio(menu) {
  return el('div', [
    el('header', [
      el(
        'h3',
        { style: 'color: red' },
        `${menu.title} - ${menu.restaurant.name}`
      ),
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
  // const $cardapio = document.createElement('div');
  // $cardapio.classList.add('cardapio');

  // const $header = document.createElement('header');

  // const $h3 = document.createElement('h3');
  // $h3.textContent = `${menu.title} - ${menu.restaurant.name}`;

  // $h3.setAttribute('style', 'color: red');

  // $header.appendChild($h3);

  // $cardapio.appendChild($header);

  // const $cardapioBody = document.createElement('div');
  // $cardapioBody.classList.add('cardapio-body');

  // const $ul = document.createElement('ul');

  // for (let section of menu.sections) {
  //   const $li = document.createElement('li');
  //   $li.textContent = section.title;
  //   $ul.appendChild($li);
  // }

  // $cardapioBody.appendChild($ul);

  // $cardapio.appendChild($cardapioBody);

  // return $cardapio;
}

Array.from(data.menus.values())
  .slice(0, 3)
  .map((menu) => ({
    ...menu,
    restaurant: {
      name: data.restaurants.get(menu.restaurantId).name,
    },
  }))
  .forEach((menu) => $fragment.appendChild(tplCardapio(menu)));

$cardapios.appendChild($fragment);
