import socketService from '@/services/SocketService'

export default {
  state: {
    chatMsgs: [],
    roomId: '',
    newEventerasMap: {
      sport: 0,
      music: 0,
      games: 0,
      'self improvement': 0,
      hobbies: 0,
      all: 0,
    }
  },
  getters: {
    chatMsgs(state) {
      return state.chatMsgs
    },
    roomId(state) {
      return state.roomId;
    },
    newEventeraMap(state){
        return state.newEventerasMap
    }
  },
  mutations: {
    setMsgs(state, msgs) {
      state.chatMsgs = msgs
    },
    setMsg(state, msg) {
      state.chatMsgs.push(msg)
    },
    setRoomId(state, { _id }) {
      state.roomId = _id;
    },
    updateAddedMap(state, { categories }) {
      categories.forEach(category => state.newEventerasMap[category.toLowerCase()]++)
      state.newEventerasMap.all++;
    },
    resetAddedMap(state) {
      state.newEventerasMap = {
        sport: 0,
        music: 0,
        games: 0,
        'self improvement': 0,
        hobbies: 0,
        all: 0,
      }
    }
  },
  actions: {
    joinEventeraChat(context, { _id }) {
      socketService.join(_id)
      context.commit({ type: 'setRoomId', _id })
    },
    leaveEventeraChat(context, { _id }) {
      socketService.leave(_id);
      context.commit({ type: 'setRoomId', _id: '' })
    },
    setMsgs(context, msgs) {
      context.commit('setMsgs', msgs)
    },
    setMsg(context, msg) {
      context.commit('setMsg', msg)
    },
    sendMsg(context, msg) {
      socketService.sendMsg(msg);
    },
    socketInit() {
      socketService.init();
    },
    disconnectSocket() {
      socketService.disconnect()
    },
    eventeraNotification(context, { eventera, method }) {
      socketService.sendNotification(eventera, method)
    },
    updateAddedMap(context, payload) {
      context.commit(payload)
    },
    updateNotification(context , {eventera}){
       socketService.updateNotification(eventera)
    },
    addNotification(context,{eventera}){
       socketService.addNotification(eventera)
    },
 
  },
}
