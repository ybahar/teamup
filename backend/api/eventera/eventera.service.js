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
    join

}

async function query(filterBy = {}) {

    let criteria = {}
    if (filterBy.txt) {
        // criteria.name = filterBy.txt;
        const regex = new RegExp(filterBy.txt)
        criteria.name = { $regex: regex, $options: 'i' }
    }
    if (filterBy.category && filterBy.category !== 'General') {
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
                    ((filterBy.almostFull !== 'true') || eventera.maxMembers - eventera.members.length <= 2))
            })
        console.log(filteredEventeras.length)
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
        await collection.insertOne(newEventera);
        console.log('in add', newEventera);
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

async function join(_id,user){
    try{
        const eventera = await getById(_id);
        if(eventera.members.length >= eventera.maxMembers || eventera.expireAt < Date.now()) {
            return Promise.reject('Eventera is closed')
        }
        let idx = eventera.members.findIndex(member => member._id === user._id);
        if(idx !== -1) return Promise.reject('Already joined this eventera')
        const member = {
            _id : user._id,
            name :user.name,
            profileImgUrl:user.profileImgUrl,
            mvpVoteCount:0,
        }
        eventera.members.push(member)
        delete eventera._id;
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ "_id": ObjectId(_id) }, { $set: eventera })
        eventera._id = _id;
        return eventera
    } catch(err){
        logger.error(`${err} in join eventera.service`)
    }
}