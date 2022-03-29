const { ObjectId } = require('mongodb');
const debug = require('debug')('app:sales-services');

const { Database } = require('../database/index');

const COLLECTION = 'sales';

const getAllSales = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getSaleByRef = async (ref) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: ObjectId(ref)});
}

const getSalesOf = async (id) => {
    const collection = await Database(COLLECTION);
    let resultado = await collection.find( { clientId: String(id) } );
    //debug(resultado);
    return resultado.toArray();
}

const createSale = async (venta) => {
    const collection = await Database(COLLECTION);
    debug('Insertando...');
    let result = await collection.insertOne(venta);
    debug(result);
    return result.insertedId;
}

module.exports.SalesServices = {
    getAllSales,
    getSaleByRef,
    getSalesOf,
    createSale
}