'use strict';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getTimeStamp(x, y) {
    return Date.now() + getRandomInt(x, y);
}
module.exports = {
    getTimeStamp,
    getRandomInt,
    }