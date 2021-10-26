function isChildren(childrens) {
  return Array.isArray(childrens) || typeof childrens === 'string';
}

const isString = (value) => typeof value === 'string';

const toArray = (value) => (Array.isArray(value) ? value : [value]);

function normalizeChildrens(childrens) {
  if (isString(childrens)) {
    return document.createTextNode(childrens);
  }
  if (Array.isArray(childrens)) {
    return childrens.map(($children) =>
      isString($children) ? document.createTextNode($children) : $children
    );
  }
  return childrens;
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

export default function el(tag, props, childrensArr) {
  const tagName = extractTagName(tag);
  const { classes, id } = extractClassesAndId(tag);
  const attrs = !isChildren(props) ? props : {};
  if (id.length) {
    attrs.id = id.pop();
  }
  if (classes.length) {
    attrs.classNames = classes;
  }
  const childrens = toArray(isChildren(props) ? props : childrensArr);
  return {
    tagName,
    nodeType: 'element',
    attrs,
    childrens: childrens ? childrens : [],
  };
}

export function renderServer(node) {
  if (isString(node)) {
    return node;
  }
  const { tagName, attrs, childrens } = node;
  const attrsHTML = Object.entries(attrs)
    .map(function ([key, value]) {
      const values = Array.isArray(value) ? value.join(' ') : value;
      return `${key}="${values}"`;
    })
    .join(' ')
    .replace('classNames', 'class');
  const startTag = `<${tagName}${attrsHTML && ' '}${attrsHTML}>`;
  const endTag = `</${tagName}>`;
  const childrensHTML = childrens
    .map(function (children) {
      return renderServer(children);
    })
    .join('');
  const html = `${startTag}${childrensHTML}${endTag}`;
  return html;
}
/**
 * RESULTADO
 *
 *
 * <div id="card" class="card card-teste" style="color: red"><h3>Oi JS Raiz! <span>!!!!</span></h3></div>
 *
 * el('div#card.card.card-teste', { style: 'color: red' }, [
 *  el('h3', [
 *    'OI JS Raiz!',
 *    el('span', '!!!!')
 *  ])
 * ])
 *
 * {
 *  tagName: 'div',
 *  nodeType: 'element',
 *  id: 'card',
 *  classNames: ['card', 'card-teste'],
 *  attrs: { style: 'color: red', alt="asdasdas" },
 *  childrens: [
 *    {
 *      tagName: 'h3',
 *      nodeType: 'element',
 *      childrens: [
 *         'Oi JS Raiz!',
 *         {
 *           tagName: 'span',
 *           nodeType: 'element',
 *           childrens: ['!!!!']
 *         }
 *      ]
 *    }
 *  ]
 * }
 */
