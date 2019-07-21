import socketService from '@/services/SocketService'

export default {
    state: {
        chatMsgs : [],
      },
    getters: {
      chatMsgs(state){
        return state.chatMsgs
      }
    },
    mutations: {
      setMsgs(state , msgs){
          state.chatMsgs = msgs
        },
        setMsg(state, msg){
            state.chatMsgs.push(msg)
      }
    },
    actions: {
        joinEventeraChat(context,{_id}){
            socketService.join(_id)
        },
        leaveEventeraChat(context,{_id}){
            socketService.leave(_id);
        },
        setMsgs(context,msgs){
            context.commit('setMsgs',msgs)
        },
        setMsg(context,msg){
            context.commit('setMsg',msg)
        },
        sendMsg(context,msg){
            socketService.sendMsg(msg);
        }
    },
}
