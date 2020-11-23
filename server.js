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
  .post((request, response) => {
    if (request.body['_id']) {
      const { _id, ...data } = request.body;

      database
        .collection('registry')
        .updateOne({ _id }, { $set: data }, (error, _) => {
          if (error) {
            return response.send({ error });
          }

          response.send({ error: null });
        });
    } else {
      database
        .collection('registry')
        .insertOne(request.body, (error, result) => {
          if (error) {
            return response.send({ error });
          }

          response.send({ _id: result.insertedId });
        });
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
