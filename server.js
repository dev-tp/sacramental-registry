const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const registry = [];

app
  .route('/api/registry')
  .get((_, response) => {
    response.json(registry);
  })
  .post((request, response) => {
    const data = request.body;
    registry.push(data);
    response.send({ data });
  });

app.listen('8080', () => console.log('Listening on port 8080'));
