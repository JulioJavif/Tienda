const { ObjectId } = require('mongodb');
const debug = require('debug')('app:services');

const { Database } = require('../database/index');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: ObjectId(id)});
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const updateUser = async (user) => {
    const collection = await Database(COLLECTION);
    //debug(`precio: ${product.precio}, cantidad: ${product.cantidad}`);
    let result = await collection.updateOne(
        { "name": user.name },
        { $set: 
            {
                email: user.email
            }
        });
    
        return {
        "_id": user._id,
        "info": result
    };
}

const deleteUser = async (name) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({ name: String(name) });
    debug(name);
    return {
        "name": name,
        "info": result
    };
}

module.exports.UsersServices = {
    getAll,
    getById,
    create,
    updateUser,
    deleteUser
}