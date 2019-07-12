'use strict';
import httpService from './HttpService'

const URL_ENDING = 'eventera'
export default {
    query,
    getById,
    update,
    add,
    remove
}

function query(filterBy) {
    return httpService.get(URL_ENDING, filterBy)
}
function getById(_id) {
    return httpService.get(`${URL_ENDING}/${_id}`)
}
function update(eventera) {
    return httpService.put(`${URL_ENDING}/${eventera._id}`, eventera)
}
function remove(_id) {
    return httpService.delete(`${URL_ENDING}/${_id}`)
}
function add(eventera) {
    return httpService.post(URL_ENDING, eventera)

}