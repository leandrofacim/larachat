import store from './vuex/store';

const userId = window.laravel.user;

window.Echo.channel(`larachat_database_private-chat.${userId}`)
    .listen('NewMessageCreated', event => {
        console.log(event.message)
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
