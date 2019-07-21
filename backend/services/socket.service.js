
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        let roomId;
        activeUsersCount++;
        socket.on('join', async (id) => {
            socket.join(id);
            roomId = id; 
            let {history} = await roomService.joinRoom(id)
            console.log('in join',id);
            socket.emit('msgs',history)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });
        socket.on('leave', () => {
            socket.leave(roomId);
            roomId = '';
        });

        socket.on('chat msg', (msg) => {
            console.log('message: ' + msg);
            io.to(roomId).emit('chat newMsg', msg);
        });
    });




}


module.exports = {
    setup
}