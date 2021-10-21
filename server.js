import http from 'http';
import fs from 'fs';
import ejs from 'ejs';
import data from './assets/data.js';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  if (req.url.match(/\.js$/)) {
    const fileStream = fs.createReadStream(`./assets${req.url}`);
    res.writeHead(200, {
      'Content-type': 'text/javascript',
    });
    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const templateData = {
      menus: Array.from(data.menus.values())
        .slice(0, 3)
        .map((menu) => ({
          ...menu,
          restaurant: {
            name: data.restaurants.get(menu.restaurantId).name,
          },
        })),
    };
    ejs.renderFile('./templates/index.ejs', templateData, (err, str) => {
      if (err) console.log(err);
      res.write(str);
      res.end();
    });
  }
});

server.listen(3001, (err) => {
  if (err) console.error(err);
  console.log('listen on port 3001');
});
