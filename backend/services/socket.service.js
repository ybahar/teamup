
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    const sessionMiddleware = require('../server')
  io.use(function(socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });
    io.on('connection', function (socket) {
        console.log('a user connected');
        let roomId;
        activeUsersCount++;
        socket.on('join', async (id) => {
            socket.join(id);
            roomId = id; 
            let {pastMsgs} = await roomService.joinRoom(id)
            console.log('in join',id);
            socket.emit('msgs-history',pastMsgs)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });
        socket.on('leave', () => {
            socket.leave(roomId);
            roomId = '';
        });
        
        socket.on('chat msg', (txt) => {
            console.log('message: ' , txt);
            let {username} = socket.request.session.user
            let msg = {sender:username , txt , sentAt : Date.now()}
            roomService.setMsg(msg , roomId);
            io.to(roomId).emit('msg', msg);
        });
    });




}


module.exports = {
    setup
}