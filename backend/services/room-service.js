
// This is a room service that allows up to 2 people in a room

module.exports = {
    joinRoom,
    setMsg,
}
const gRooms = [];
function getRoomById(_id){
    return gRooms.find(room => _id === room._id)
    
}
function joinRoom(_id){
    let room = getRoomById(_id);
    if (!room) room = createRoom(_id)
    return room;
}
function setMsg(msg,roomId){
    let room = getRoomById(roomId);
    room.pastMsgs.push(msg)
    
}
  function createRoom(_id){
    let room =  {
          _id,
          pastMsgs:[],
      }
      gRooms.push(room);
      return room;
  }
// function placeInRoom(member) {
//     var room = findRoomWith(member)
//     if (room) return room;
//     room = findAvailableRoom()
//     if (room) {
//         room.members.push(member);
//         return room;
//     }
//     return createRoom(member)
// }

// // a room object:
// // {
// //     roomId,
// //     members : [],
//     //    history : [],
// // }
// function findRoomWith(member) {
// 	return gRooms.find(room => room.members.find((currMember) => currMember === member));
// }

// function findAvailableRoom() {
// 	return gRooms.find(({ members }) => members.length === 1);
// }

// function createRoom(member){
//     var newRoom = {
//         members: [member],
//         id: makeId()
//     }
//     gRooms.push(newRoom);
//     return newRoom;
// }

// function makeId(size = 5) {
//     var txt = "";
//     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     for (var i = 0; i < size; i++) {
//         txt += letters.charAt(Math.floor(Math.random() * letters.length));
//     }
//     return txt;
// }