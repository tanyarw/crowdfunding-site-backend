

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://ng:ng@wildsprint.ksltt.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      }
  )
    .then(client => {
      console.log('Connected!');
 
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
