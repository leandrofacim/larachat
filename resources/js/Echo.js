import store from './vuex/store';
import Vue from 'vue';

const userId = window.laravel.user;

window.Echo.channel(`larachat_database_private-chat.${userId}`)
    .listen('NewMessageCreated', event => {
        console.log(event.message)
        let conversation = event.message;

        if (
            store.state.chat.userConversation == null ||
            store.state.chat.userConversation.id != conversation.sender.id
        ) {
            Vue.$vToastify.success(
                `Mensagem: ${conversation.message}`,
                `${conversation.sender.name} te enviou uma nova mensagem`
            );
        } else {
            conversation.me = false;
            store.state.chat.messages.push(conversation)
        }

        store.commit('UPDATE_TOTAL_UNREAD_MESSAGES', conversation.sender.id)

    })

window.Echo.join('larachat_database_chatroom')
    .here(users => {
        console.log('usuarios online')
        console.log(users)

        store.commit('ADD_ONLINE_USERS', users);
    })
    .joining(user => {
        console.log('Entrou')
        console.log(user)

        store.commit('ADD_ONLINE_USER', user);
    })
    .leaving(user => {
        console.log('Saiu')
        console.log(user)

        store.commit('REMOVE_ONLINE_USER', user);
    })
