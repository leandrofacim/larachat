import axios from "axios";

export default {
  state: {
    userConversation: null,
    messages: []
  },

  mutations: {
    ADD_USER_CONVERSATION(state, user) {
      state.userConversation = user;
    },

    REMOVE_USER_CONVERSATION(state, user) {
      state.userConversation = null;
    },

    ADD_MESSAGES(state, messages) {
      state.messages = messages;
    },

    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },

    CLEAR_MESSAGES(state, messages) {
      state.messages = [];
    }
  },

  actions: {
    async getMessagesConversation({ state, commit, dispatch }) {
      commit('CLEAR_MESSAGES');

      const response = await axios.get(`api/v1/messages/${state.userConversation.id}`);
          commit('ADD_MESSAGES', response.data.data);
          dispatch('markConversationAsRead');
    },

    async sendNewMessage({ state, commit }, message) {
      const response = await axios.post('api/v1/messages', {
            message,
            receiver_id: state.userConversation.id
        });
        commit('ADD_MESSAGE', {
            message: message,
            receiver: { ...state.userConversation },
            me: true
        });
    },

    async markConversationAsRead ({commit, state }) {
        const response = await axios.patch('/api/v1/messages/mark_as_read', { sender: state.userConversation.id });
        commit('CLEAR_TOTAL_UNREAD_MESSAGES', state.userConversation.id);
    }
  },

  getters: {

  }
}
