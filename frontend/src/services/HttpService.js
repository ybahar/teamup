import store from '@/store'
import alertService from '@/services/AlertService'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3000/api/'


import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});
// mb add _ to ajax, it's not exported
async function ajax(endpoint, method = 'get', data = null, params = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params
        })
        return res.data;
    } catch (err) {
        console.warn('in httpservice : ', err)
        if(err.response.status === 401) handleSessionTimeout();
        throw err;
    }
}

export default {
    get(endpoint, params) {
        return ajax(endpoint, 'GET', null, params)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }

}

export function handleSessionTimeout(){
    let user = store.getters.loggedUser
    if(user){
        store.commit('setLoggedUser',{user:null});
        alertService.err('Please login again','Session timed out')
    } else alertService.err('Not logged in ','Please log in to preform this action')
}