const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let database = null;

app
  .route('/api/registry')
  .get((_, response) => {
    database
      .collection('registry')
      .find({})
      .toArray((error, documents) => {
        if (error) {
          return response.send({ error });
        }

        response.send(documents);
      });
  })
  .post(async (request, response) => {
    try {
      const result = await database
        .collection('registry')
        .insertOne(request.body);

      response.send({ _id: result.insertedId });
    } catch (error) {
      response.send({ error });
    }
  });

app.listen('8080', () => {
  console.log('Listening on port 8080');

  mongodb.MongoClient.connect(url, (error, client) => {
    if (error) {
      return console.error(error);
    }

    database = client.db('sacramental-registry');
  });
});
