const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_KEY = 'eventera'

module.exports = {
    query,
    add,
    update,
    remove,
    getById,

}

async function query(filterBy = {}) {

    console.log('checkiong filter ', filterBy)
    let criteria = {}
    if (filterBy.txt) {
        // criteria.name = filterBy.txt;
        const regex = new RegExp(filterBy.txt)
        criteria.name = { $regex: regex, $options: 'i' }
    }
    if (filterBy.category !== 'General') {
        criteria.categories = { $all: [filterBy.category] };
    }
    let $gt = (filterBy.showClosed === 'true') ? 0 : Date.now()
    if (+filterBy.startingAt) {
        let $lt = Date.now() + +filterBy.startingAt
        criteria.expireAt = { $lt, $gt }
    } else criteria.expireAt = { $gt }
    const collection = await dbService.getCollection(COLLECTION_KEY);
    try {
        const eventeras = await collection.find(criteria).toArray();
        let filteredEventeras = eventeras
            .filter(eventera => {
               return ((filterBy.showClosed === 'true' || eventera.maxMembers > eventera.members.length) &&
                    (filterBy.almostFull !== 'true') || eventera.maxMembers - eventera.members.length <= 2)
            })
        console.log(filteredEventeras.length)
        console.log('checking query ', criteria)
        return filteredEventeras
    } catch (err) {
        logger.error(`ERROR: cannot get Eventeras ${err}`)
        throw err;
    }

}

async function add(newEventera, user) {

    newEventera.creator = {
        _id: user._id,
    }
    newEventera.members = [{
        _id: user._id,
        name: user.name,
        mvpVoteCount: 0,
    }]
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        newEventera = await collection.insertOne(newEventera);
        console.log(newEventera);
        return newEventera;
    } catch (err) {
        logger.error(`ERROR: cannot insert Eventera`, err)
        throw err;
    }
}

async function update(eventera, user) {
    if (eventera.creator._id !== user._id) return Promise.reject('Not authrized')
    const collection = await dbService.getCollection(COLLECTION_KEY)
    let eventeraId = eventera._id;
    try {
        delete eventera._id;
        await collection.updateOne({ "_id": ObjectId(eventeraId) }, { $set: eventera })
        eventera._id = eventeraId;
        return eventera
    } catch (err) {
        logger.error(`ERROR: cannot update Eventera ${eventeraId} , err :${err}`)
        throw err;
    }
}

async function getById(eventeraId) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        const eventera = await collection.findOne({ "_id": ObjectId(eventeraId) })
        console.log(eventera);
        return eventera
    } catch (err) {
        logger.error(`ERROR: cannot get Eventera ${eventeraId}`, err)
        throw err;
    }
}

async function remove(eventeraId, user) {
    let eventera = getById(eventeraId)
    if (eventera.creator._id === user._id) {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        try {
            await collection.remove({ "_id": ObjectId(eventeraId) })
        } catch (err) {
            logger.error(`ERROR: cannot delete Eventera ${eventeraId}`, err)

            throw err;
        }
    } else return Promise.reject('Not the event creator')
}