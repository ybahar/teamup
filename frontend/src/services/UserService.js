'use strict';
import httpService from './HttpService'

const URL_ENDING = 'user'
export default {
    login,
    // logout,
    signup
}

async function login({ username, password }) {
    try {
        const users = await httpService.get(`${URL_ENDING}`)
        const user = users.find(u => u.username === username && u.password === password)
        if (user) {
            return user
        } else throw new Error('Wrong username or wrong password');
    } catch (err) {
        console.log('ERR: had problems logging in', err);
    }
}

async function signup({ username, password }) {
    try {
        const users = await httpService.get(`${URL_ENDING}`)
        const user = users.find(u => u.username === username)
        if (user) {
            throw new Error('User Exists')
        } else {
            return httpService.post(URL_ENDING, { username, password })
        }
    } catch (err) {
        console.log('ERR: had problems with signup', err);
        throw err;
    }

}
function query(filterBy) {
    httpService.get(URL_ENDING, filterBy)
}
function getById(_id) {
    httpService.get(`${URL_ENDING}/${_id}`)
}
function update(eventera) {
    httpService.put(`${URL_ENDING}/${eventera._id}`, URL_ENDING, eventera)
}
function remove(_id) {
    httpService.delete(`${URL_ENDING}/${_id}`)
}
function add(eventera) {
    httpService.post(URL_ENDING, eventera)

}