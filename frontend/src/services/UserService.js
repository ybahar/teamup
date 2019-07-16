'use strict';
import httpService from './HttpService'
import { storageService } from './StorageService'


const LOGGED_USER_STORAGE_KEY = "loggedUser";
const URL_ENDING = 'user';
export default {
    login,
    logout,
    signup,
    update,
    getLoggedUser // this can be removed when we get a backend
}


async function login({ username, password }) {
    try {
        const user = await httpService.post(`auth/login`,{ username, password })
            if (user) {
                storageService.store(LOGGED_USER_STORAGE_KEY,
                user);
                return user;
        } else throw new Error('Wrong username or wrong password');
    } catch (err) {
        console.log('ERR: had problems logging in', err);
        throw err;
    }
}

async function signup({ username, password }) {
    try {
        const newUser = await httpService.post(`auth/signup`, { username, password })
            storageService.store(LOGGED_USER_STORAGE_KEY, newUser);
            return newUser;
    } catch (err) {
        console.log('ERR: had problems with signup', err);
        throw err;
    }
}

async function logout() {
    try {
        await httpService.post(`auth/logout`)
        storageService.remove(LOGGED_USER_STORAGE_KEY);
        return {}
    } catch (err) {
        console.log('ERR : had problems with logout')
        throw err;
    }
}

async function getLoggedUser() {
    try {
        let credentials = storageService.load(LOGGED_USER_STORAGE_KEY);
        if (!credentials) {
           credentials = await httpService.get(`${URL_ENDING}/current`) 
        }
        if(!credentials) throw new Error('No logged in user');
        return httpService.get(`${URL_ENDING}/${credentials._id}`);
    } catch (err) {
        console.log('had problems with getLoggedUser ', err);
    }
}

function update(user) {
    return httpService.put(`${URL_ENDING}/${user._id}`, user);
}
function remove(_id) {
    httpService.delete(`${URL_ENDING}/${_id}`)
}
function add(eventera) {
    httpService.post(URL_ENDING, eventera)

}