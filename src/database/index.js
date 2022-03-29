const { MongoClient } = require('mongodb');
const debug = require('debug')('app:database');

const { Config } = require('../config/index');

var conection = null;

module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    try {
        if (conection == null) {
            const client = new MongoClient(Config.mongoUri);
            conection = await client.connect();
            debug('Nueva conexion realizada');
        }
        debug('Utilizando conexion');
        const db = conection.db(Config.mongoDbName);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error);
    }
});