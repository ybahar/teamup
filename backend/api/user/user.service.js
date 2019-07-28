
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    clap
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.username) {
        criteria.username = filterBy.username
    }

    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    if(typeof userId === 'Object'){
        userId = userId.toString();
    }
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password;
        // delete user.username;
        return user;
    } catch (err) {

        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByUsername(username) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.remove({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    let userId = user._id;
    delete user._id;
    try {
        await collection.replaceOne({ "_id": ObjectId(userId) }, { $set: user })
        user._id = userId;
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${userId}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function clap(userId){
    try{
        let user = await getById(userId);
        if(!user.totalClaps) user.totalClaps = 0;
        user.totalClaps++;
        await update(user)
    } catch(err){
        logger.error(`err in clap user service ${err}`)
        throw err;
    }
     
}

