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
        async getMessagesConversation({ state, commit }) {
            commit('CLEAR_MESSAGES');

            return await axios.get(`api/v1/messages/${state.userConversation.id}`)
                .then(response => commit('ADD_MESSAGES', response.data.data))
        },

        async sendNewMessage({ state, commit }, message) {
            return await axios.post('api/v1/messages', {
                message,
                receiver_id: state.userConversation.id
            })
            .then(response => {
                commit('ADD_MESSAGE', {
                    message: message,
                    receiver: {...state.userConversation},
                    me: true
                })
            })
        }
    },

    getters: {

    }
}
