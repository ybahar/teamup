import socketService from '@/services/SocketService'

export default {
    state: {
        chatMsgs : [],
        roomId : '',
      },
    getters: {
      chatMsgs(state){
        return state.chatMsgs
      },
      roomId(state){
        return state.roomId;
      }
    },
    mutations: {
      setMsgs(state , msgs){
          state.chatMsgs = msgs
        },
        setMsg(state, msg){
            state.chatMsgs.push(msg)
      },
      setRoomId(state,{_id}){
        state.roomId = _id;
      }
    },
    actions: {
        joinEventeraChat(context,{_id}){
            socketService.join(_id)
            context.commit({type:'setRoomId',_id})
          },
          leaveEventeraChat(context,{_id}){
            socketService.leave(_id);
            context.commit({type:'setRoomId', _id: ''})
        },
        setMsgs(context,msgs){
            context.commit('setMsgs',msgs)
        },
        setMsg(context,msg){
            context.commit('setMsg',msg)
        },
        sendMsg(context,msg){
            socketService.sendMsg(msg);
        },
        socketInit(){
          socketService.init();
        },
        disconnectSocket(){
          socketService.disconnect()
        },
        eventeraNotification(context , {eventera , method}){
             socketService.sendNotification(eventera,method)
        }
    },
}
