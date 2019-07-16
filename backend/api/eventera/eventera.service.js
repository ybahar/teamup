const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_KEY = 'eventera'

module.exports= {
    query,
    add,
    update,
    remove,
    getById,

}

async function query(filterBy ={}){
     
    let criteria = {}
    if (filterBy.txt){
        criteria.name = filterBy.txt;
    }
    if (filterBy.categories && filterBy.categories.length){
        criteria.categories = {$all : filterBy.categories};
    }
    const collection = await dbService.getCollection(COLLECTION_KEY);
    try {
        const eventeras = await collection.find(criteria).toArray();
        return eventeras
    } catch (err) {
        logger.error(`ERROR: cannot get Eventeras`,err)
        throw err;
    }

}

async function add(newEventera){
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        await collection.insertOne(newEventera);
        return newEventera;
    } catch (err) {
        logger.error(`ERROR: cannot insert Eventera`,err)
        throw err;
    }
}

async function update(eventera) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        await collection.updateOne({"_id":ObjectId(eventera._id)}, {$set : eventera})
        return eventera
    } catch (err) {
        logger.error(`ERROR: cannot update Eventera ${eventera._id}` , err)
        throw err;
    }
}

async function getById(eventeraId) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        const eventera = await collection.findOne({"_id":ObjectId(eventeraId)})
        return eventera
    } catch (err) {
        logger.error(`ERROR: cannot get Eventera ${eventeraId}`,err)
        throw err;
    }
}

async function remove(eventeraId) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        await collection.remove({"_id":ObjectId(eventeraId)})
    } catch (err) {
        logger.error(`ERROR: cannot delete Eventera ${eventeraId}`,err)

        throw err;
    }
}