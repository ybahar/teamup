// quick guide to creating a neat db.json:
//      0. make sure u have both files in the folder: 
//      1. eventera.json
//      2. user.json
//      3. warning - this will change the current 'saved_file_name' file. so backup!
//      4. run with node!

// Customizing: 
//      1. the function 'buildEvent' is makes the data.

// const utilService = require('./miss-bug/services/util.service')

let eventeras = require('./eventera.json')
let users = require('./user.json')
const fs = require('fs')

const saved_eventeras_file_name = "./db.json"
// this is the old sequence
// createEventerasFile()

// a db file for json-server
createEntireDbJsonFile();

function createEventerasFile() {
    let fixedEventeras = eventeras.map(buildEvent)
    _saveObjectToJson(fixedEventeras)
}

function createEntireDbJsonFile() {
    let fixedEventeras = eventeras.map(buildEvent)
    let dbJson = {
        eventera: fixedEventeras,
        user: require('./user.json') 
    };
    _saveObjectToJson(dbJson)

}

function mongoReadyDb(){
   let mongoReady =  eventeras.map(buildEvent);
   _saveObjectToJson(mongoReady)
   console.log('in mongoReady function ');
   
}
// mongoReadyDb()


// const img = require('./image.service')
// Toys = Toys.toys
// img.suggestImgs('toys', Toys.length)
//     .then(res => res.forEach((imgUrl,idx) => Toys[idx].imgUrl = imgUrl))
//     .then(_saveBugsToFile)

function removeIds(eventera) {
    delete eventera._id
    // console.log(eventeras)
}
// Toys.forEach(toy => toy._id = utilService.makeId(8))
// console.log(Toys)
// _saveBugsToFile()
function buildEvent(eventera) {
    removeIds(eventera);
    console.log('START ----- ')
    eventera = organizeUserCollection(eventera)
    console.log(eventera)
    // break;
    eventera.createdAt = getTimeStamp(-604800000,0)
    eventera.expireAt = getTimeStamp(-100000 , 604800000)
    let usersCopy = users.slice()
    let user = usersCopy.splice(getRandomInt(0, usersCopy.length),1)[0]
    eventera.creator = {
        _id: user._id,
        name: user.name,
    };
    categories = ['soccer', 'sport', 'basketball', 'games', 'FIFA', 'katan', 'music', 'rock', 'pop']
    let a = getRandomInt(1, 4)
    eventera.categories = []
    for (let i = 0; i < a; i++) {
        let idx = getRandomInt(0, categories.length)
        eventera.categories.push(...categories.splice(idx, 1))
    }
    let member = {
        _id : user._id,
        name : user.name,
        role: null,
        mvpVoteCount:0
    }
    eventera.members = [member];
    a = getRandomInt(1, 4)
    // console.log(users.length)
    for (let i = 0; i < a; i++) {
        let user = usersCopy.splice(getRandomInt(0, usersCopy.length),1)[0]
        // console.log(user)
        let member = {
            _id : user._id,
            name:user.name,
            role: null,
            mvpVoteCount:0
        }
        eventera.members.push(member)
    }
    eventera.maxMembers = getRandomInt(eventera.members.length, 8)
    return eventera;
}
function _saveObjectToJson(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(saved_eventeras_file_name, JSON.stringify(data), (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        });
    })
}

function organizeUserCollection(u) {
    let newU = Object.assign({}, u);
    newU.loc = {
        geo: {
            lat: u.lat,
            lng: u.lng
        },
        address: u.address,
        city: u.city
    }
    // j
    newU.username = u.name.split(" ")[0].toLowerCase(); // his first name lowered
    newU.password = "123";

    delete newU.lat
    delete newU.lng
    delete newU.address
    delete newU.city
    // console.log('a user example: ', newU);
    return newU;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getTimeStamp(x, y) {
    return Date.now() + getRandomInt(x, y);
}