require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

// const uri = 'mongodb://localhost:27017';
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnbwm.mongodb.net/`

const db = 'store';
const connection=async function() {
  const client = new MongoClient(uri, { useUnifiedTopology: true});
  try {
    await client.connect();
    const database =client.db(db);
    return database

  } catch (err) {
    console.log(err.stack);
  }

  await client.close();
}


module.exports=connection

