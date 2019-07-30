const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_KEY = 'eventera'

module.exports = {
    query,
    add,
    update,
    remove,
    getById,
    join,
    leave,
    eventerasByUser,
    clap

}

async function query(filterBy = {}) {
    let criteria = {}
    if (filterBy.txt) {
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
        profileImgUrl: user.profileImgUrl,
        name: user.name,


    }
    newEventera.members = [{
        _id: ObjectId(user._id),
        name: user.name,
        profileImgUrl: user.profileImgUrl,
        mvpVoteCount: 0,
    }]
    const collection = await dbService.getCollection(COLLECTION_KEY)
    try {
        await collection.insertOne(newEventera);
        return newEventera;
    } catch (err) {
        logger.error(`ERROR: cannot insert Eventera`, err)
        throw err;
    }
}

async function update(eventera, user) {
    if (eventera.creator._id !== user._id) return Promise.reject('Not authrized')
    console.log(eventera);
    let eventeraId = eventera._id;
    try {
        let updatedEventera = await _saveUpdateToMongo(eventeraId, eventera);
        return updatedEventera;
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

async function join(_id, user) {
    try {
        const eventera = await getById(_id);
        if (eventera.members.length >= eventera.maxMembers || eventera.expireAt < Date.now()) {
            return Promise.reject('Eventera is closed')
        }
        let idx = eventera.members.findIndex(member => `${member._id}` === `${user._id}`);
        if (idx !== -1) return Promise.reject('Already joined this eventera')
        const member = {
            _id: ObjectId(user._id),
            name: user.name,
            profileImgUrl: user.profileImgUrl,
            mvpVoteCount: 0,
        }
        eventera.members.push(member)
        let updatedEventera = await _saveUpdateToMongo(_id, eventera);
        return updatedEventera;
    } catch (err) {
        logger.error(`${err} in join eventera.service`)
    }
}

async function leave(_id, user) {
    try {
        const eventera = await getById(_id);
        let idx = eventera.members.findIndex(member => {
            return `${member._id}` === `${user._id}`
        });
        if (idx !== -1) {
            eventera.members.splice(idx, 1);
            let updatedEventera = await _saveUpdateToMongo(_id, eventera);
            return updatedEventera;
        } else return Promise.reject('not a member');
    } catch (err) {
        logger.error(err)
    }
}

async function eventerasByUser(_id) {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    const eventeras = await collection.find({ "members._id": ObjectId(_id) }).toArray();
    return eventeras
}

async function _saveUpdateToMongo(_id, eventera) {
    delete eventera._id;
    const collection = await dbService.getCollection(COLLECTION_KEY)
    await collection.updateOne({ "_id": ObjectId(_id) }, { $set: eventera })
    eventera._id = _id;
    return eventera
}

async function clap(eventeraId, memberId) {
    try {
        const eventera = await getById(eventeraId);
        let member = await eventera.members.find(member => {
            return `${member._id}` === `${memberId}`
        });
        member.mvpVoteCount++;
        await _saveUpdateToMongo(eventeraId, eventera)
        return
    } catch (err) {
        logger.error(`eventera clap service ${err} `)
        throw err;
    }

}

(async function () {
    async function renewDb() {
        try {
            let eventeras = await query({});
            if (eventeras.length < 20) {
                eventeras = await query({ showClosed: 'true' });
                eventeras.forEach(async eventera => {
                    try{
                    if (eventera.expireAt < Date.now() || eventera.members >= eventera.maxMembers) {
                        if (eventera.expireAt < Date.now()) {
                            eventera.expireAt = utilService.getTimeStamp(10800000, 604800000)
                        }
                        if (eventera.members >= eventera.maxMembers) {
                            if (eventera.maxMembers < 15) {
                                eventera.maxMembers += 3;
                            } else {
                                eventera.members.splice(utilService.getRandomIt(0, 10), 3)
                            }
                        }
                        await _saveUpdateToMongo(eventera._id, eventera)
                    }
                }catch(err){
                    console.log(err)
                }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    renewDb();
    setInterval(renewDb, 86400000);
})() 