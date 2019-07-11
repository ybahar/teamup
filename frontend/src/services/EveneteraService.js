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

function query(filterBy){
    httpService.get(URL_ENDING,filterBy)
}
function getById(_id){
    httpService.get(`${URL_ENDING}/${_id}`)
}
function update(eventera){
    httpService.put(`${URL_ENDING}/${eventera._id}`,URL_ENDING,eventera)
}
function remove(_id){
    httpService.delete(`${URL_ENDING}/${_id}`)
}
function add(eventera){
    httpService.post(URL_ENDING,eventera)
    
}