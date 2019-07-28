
const socketIO = require('socket.io');
const roomService = require('./room-service');
const eventeraService = require('../api/eventera/eventera.service');
const userService =  require('../api/user/user.service');
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
            return 
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
        socket.on('update' , eventera => {
            let {username} = user
            let alert = makeAlert('warn',`${eventera.name}'s details has been updated by ${username}`
             , `We hope they made it better`)
            io.to(`members_${eventera._id}`).emit('alert' , alert)
            
        })
        socket.on('add',({categories,_id}) =>{
            socket.join(`members_${_id}`);
            socket.broadcast.emit('added',categories)
        })
        socket.on('clapped',({userId , eventeraId})=>{
            userService.clap(userId);
            eventeraService.clap(eventeraId,userId)
        })
        socket.join(`user_${user._id}`);
        let eventeras = await eventeraService.eventerasByUser(user._id)
        eventeras.forEach(({_id}) => socket.join(`members_${_id}`))
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