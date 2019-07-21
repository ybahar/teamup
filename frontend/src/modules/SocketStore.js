import socketService from '@/services/SocketService'

export default {
    state: {
        chatMsgs:[]
      },
    getters: {
      
    },
    mutations: {
      setMsgs(){
          console.log('in mutation')
      }
    },
    actions: {
        joinEventeraChat(context,{_id}){
            socketService.join(_id)
        }
    },
}
