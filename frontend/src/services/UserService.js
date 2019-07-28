'use strict';
import httpService from './HttpService'
// import { storageService } from './StorageService'
// const LOGGED_USER_STORAGE_KEY = "loggedUser";


const URL_ENDING = 'user';
export default {
    getById,
    login,
    logout,
    signup,
    update,
    getLoggedUser, 
}


async function login({ username, password }) {
    try {
        return await httpService.post(`auth/login`, { username, password })
    } catch (err) {
        console.log('ERR: had problems logging in', err);
        throw new Error('Wrong username or wrong password');
    }
}

async function signup({ username, password, name }) {
    try {
        return await httpService.post(`auth/signup`, { username, password, name })
    } catch (err) {
        console.log('ERR: had problems with signup', err);
        throw err;
    }
}

async function logout() {
    try {
        return await httpService.post(`auth/logout`)
    } catch (err) {
        console.log('ERR : had problems with logout')
        throw err;
    }
}

async function getLoggedUser() {
    try {
        const credentials = await httpService.get(`${URL_ENDING}/current`)
        if(credentials){
            return httpService.get(`${URL_ENDING}/${credentials._id}`);
        } else return null;
    } catch (err) {
        console.log('No logged in user', err);
        throw err;
    }
}

function update(user) {
    return httpService.put(`${URL_ENDING}/${user._id}`, user);
}
function remove(_id) {
    httpService.delete(`${URL_ENDING}/${_id}`)
}

async function getById(_id) {
    try {
        const user = await httpService.get(`${URL_ENDING}/${_id}`)
        return user;
    } catch (err) {
        throw err
    }
}

