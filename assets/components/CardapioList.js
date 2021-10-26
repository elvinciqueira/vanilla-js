import el, { Fragment } from '../lib/dom.js';
import CardCardapio from '../components/CardCardapio.js';

export default function CardapioList(menus) {
  return el(Fragment, menus.map(CardCardapio));
}
