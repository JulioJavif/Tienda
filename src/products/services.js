const { ObjectId } = require('mongodb');
const { ProductsUtils } = require('./utils');
const debug = require('debug')('app:products-services');

const { Database } = require('../database/index');

const COLLECTION = 'products'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    debug(ObjectId(id));
    return collection.findOne({ _id: ObjectId(id)});
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const generateReport = async (name, res) => {
    let productos = await getAll();
    ProductsUtils.excelGenerator(productos, res, name);
}

const updateProduct = async (product, amount = null) => {
    const collection = await Database(COLLECTION);
    //debug(`precio: ${product.precio}, cantidad: ${product.cantidad}`);
    if (amount === null) {
        let result = await collection.updateOne(
            { "name": product.name },
            { $set: 
                {
                    precio: product.precio,
                    cantidad: product.cantidad
                }
            }
        );
        
        return {
            "_id": product._id,
            "info": result
        };
    } else{
        let result = await collection.updateOne(
            { "name": product.name },
            { $set: 
                {
                    precio: product.precio,
                    cantidad: product.cantidad - amount
                }
            }
        );
        
        return {
            "_id": product._id,
            "info": result
        };
    }
}

const deleteProduct = async (name) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({ name: String(name) });
    debug(name);
    return {
        "name": name,
        "info": result
    };
}

const saleProduct = async (id, amount) => {
    //debug(id);
    const collection = await Database(COLLECTION);
    
    let product = await getById(id);
    debug(product);
    if (product.cantidad < amount) {
        return null;
    }

    let productSale = await updateProduct(product, amount);
    debug(productSale);

    return {
        "id": id,
        "precio": product.precio
    };
}

module.exports.ProductsServices = {
    getAll,
    getById,
    create,
    generateReport,
    updateProduct,
    deleteProduct,
    saleProduct
}