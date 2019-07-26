
const socketIO = require('socket.io');
const roomService = require('./room-service');
const {eventerasByUser} = require('../api/eventera/eventera.service');
var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    const sessionMiddleware = require('../server')
  io.use(function(socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });
    io.on('connection', async function (socket) {
        const  {user} = socket.request.session
        let roomId;
        activeUsersCount++;
        if(!user) {
            socket.emit('not logged in');
            return;
        }
        socket.on('join', async (id) => {
            socket.join(id);
            roomId = id; 
            let {pastMsgs} = await roomService.joinRoom(id)
            socket.emit('msgs-history',pastMsgs)
        })
        socket.on('disconnect', () => {
            activeUsersCount--;
        });
        socket.on('leave', () => {
            socket.leave(roomId);
            roomId = '';
        });
        
        socket.on('chat msg', (msg) => {
            msg.sender = user.name;
            msg.sentAt = Date.now();
            roomService.setMsg(msg , roomId);
            io.to(roomId).emit('msg', msg);
        });
        socket.on('eventera join', (eventera) => {
            let {username} = user
            let alert = makeAlert('success',`${username} joined ${eventera.name}`
             , (+eventera.spotsLeft)? `Only ${eventera.spotsLeft} spots left` : `Eventera ${eventera.name} is now Full (Hooray)`)
            socket.join(`members_${eventera._id}`)
            io.to(`members_${eventera._id}`).emit('alert' , alert)
        });
        socket.on('eventera leave',eventera => {
            let {username} = user
            socket.leave(`members_${eventera._id}`)
            let alert = makeAlert('warn',`${username} left ${eventera.name}` , `${eventera.spotsLeft} spots left`)
            io.to(`members_${eventera._id}`).emit('alert' , alert)
        });
        let eventeras = await eventerasByUser(user._id)
        console.log(eventeras.length)
        eventeras.forEach(({_id}) => {
            console.log('joined',_id)
            socket.join(`members_${_id}`)})
    });




}

function makeAlert(type,title,body){
    return {
        type,
        title,
        body,
    }
}


module.exports = {
    setup
}