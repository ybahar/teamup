'use strict';
import io from 'socket.io-client'
import store from '@/store'
import alertService from '@/services/AlertService'
import { handleSessionTimeout } from '@/services/HttpService'
export default {
    join,
    leave,
    sendMsg,
    init,
    disconnect,
    sendNotification,
    updateNotification,
    addNotification,
    clap,
}
let socket;

async function init() {
    try {
        if (process.env.NODE_ENV === 'production') {
            socket = await io()
        } else socket = await io('//localhost:3000')
        socket.on('msgs-history', _setMsgs)
        socket.on('msg', _setMsg)
        socket.on('alert', _alert)
        socket.on('added', updateAddedMap)
        socket.on('not logged in', handleSessionTimeout)
        if (store.getters.roomId) {
            join(store.getters.roomId)
        }
    } catch (err) {
        console.log('in socketInit', err)
    }

};
function disconnect() {
    if (socket) {
        socket.disconnect()
    }
}
async function join(_id) {
    if (socket) {
        socket.emit('join', _id)
    }
}
async function leave(_id) {
    if (socket) {
        socket.emit('leave', _id)
    }
}

function _setMsgs(msgs) {
    store.dispatch('setMsgs', msgs)
}
function _setMsg(msg) {
    store.dispatch('setMsg', msg)

}
function sendMsg(msg) {
    if (socket) {
        socket.emit('chat msg', msg)
    }
}
function _alert(alert) {
    alertService[alert.type](alert.title, alert.body)
}
function sendNotification(eventera, method) {
    let spotsLeft = eventera.maxMembers - eventera.members.length;
    socket.emit(`eventera ${method}`, { spotsLeft, _id: eventera._id, name: eventera.name })
}

function updateAddedMap(categories) {
    store.dispatch({ type: 'updateAddedMap', categories })
}
function updateNotification(eventera) {
    socket.emit('update',eventera)
}
function addNotification(eventera) {
    socket.emit('add',eventera)
}
function clap(clapData){
    socket.emit('clapped',clapData)
}