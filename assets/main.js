import data from './data.js';

const log = console.log;

function isChildren(children) {
  return Array.isArray(children) || typeof children === 'string';
}

const isString = (value) => typeof value === 'string';

const toArray = (value) => (Array.isArray(value) ? value : [value]);

function normalizeChildrens(children) {
  if (isString(children)) return document.createTextNode(children);
  if (Array.isArray(children)) {
    return children.map(($child) =>
      isString($child) ? document.createTextNode($child) : $child
    );
  }
  return children;
}

function extractTagName(tagName) {
  return tagName.match(/^\w+/)[0];
}

function extractClassesAndId(tagName) {
  const regexp = /[\#\.]{1}([\w\-\_]*)/gi;
  return Array.from(tagName.matchAll(regexp)).reduce(
    function (acc, current) {
      if (current[0].startsWith('.')) {
        acc.classes.push(current[1]);
      } else {
        acc.id.push(current[1]);
      }

      return acc;
    },
    { classes: [], id: [] }
  );
}

function el(tagName, props, children) {
  const $el = document.createElement(extractTagName(tagName));
  const { classes, id } = extractClassesAndId(tagName);
  if (id.length) $el.id = id.pop();
  if (classes.length) $el.classList.add(...classes);
  const _children = isChildren(props) ? props : children;
  const _props = !isChildren(props) ? props : [];
  Object.entries(_props).forEach(([key, value]) => {
    $el.setAttribute(key, value);
  });
  const $children = normalizeChildrens(_children);
  toArray($children).forEach(($child) => {
    $el.appendChild($child);
  });
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
