'use strict';
import io from 'socket.io-client'
import store from '@/store'
export default {
    join,
    leave,
    sendMsg
}
let socket;
(async function initSocket() {
    try {
        if (process.env.NODE_ENV === 'production') {
            socket = await io()
            console.log('bobo')
        } else socket = await io('//localhost:3000')
        socket.on('msgs-history', setMsgs)
        socket.on('msg', setMsg)
    } catch (err) {
        console.log('in socketservice', err)
    }

})();


async function join(_id) {
    socket.emit('join', _id)
}
async function leave(_id) {
    socket.emit('leave', _id)
}

function setMsgs(msgs) {
    store.dispatch('setMsgs', msgs)
}
function setMsg(msg) {
    store.dispatch('setMsg', msg)

}
function sendMsg(msg){
    socket.emit('chat msg', msg)
}