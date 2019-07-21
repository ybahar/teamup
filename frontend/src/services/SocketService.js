'use strict';
import io from 'socket.io-client'
import store from '@/store'
export default {
    join,
}
let socket;
(async function initSocket(){
    try{
        if(process.env.NODE_ENV === 'production'){
            socket = await io()
        } else socket = await io('//localhost:3000')
       socket.on('msgs-history', setMsgs)
       socket.on('msg', setMsg)
    } catch(err){
        console.log('in socketservice',err)
    }
        
})();


async function join(_id){
    socket.emit('join',_id)
}

function setMsgs(msgs){
    console.log(msgs , 'send to store msgs')
    store.commit('setMsgs')
    
}
function setMsg(msg){
    console.log(msg , 'send to store msg')
    
}