const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'test';
let db

async function connectMongoDb() {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName);
}

function getDataBase(){
    return db
}

module.exports = {connectMongoDb,getDataBase}
