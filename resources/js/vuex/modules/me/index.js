import axios from "axios";

const CONFIGS = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export default {
    state: {
        favorites: [],
        me: {
            name: '',
            email: '',
            photo: '',
            preference: {
                me_notify: true,
                background_chat: ''
            }
        }
    },

    mutations: {
        SET_MY_FAVORITES(state, users) {
            state.favorites = users;
        },

        SET_ME(state, me) {
            state.me = me;
        }
    },

    actions: {
        getMyFavorites({ commit }) {
            return axios.get('/api/v1/favorites')
                .then(response => commit('SET_MY_FAVORITES', response.data.data));
        },

        setNewFavorite({ commit, dispatch, state }, user) {
            return axios.post('/api/v1/favorites', { user: user.id })
                .then(response => {
                    commit('SET_USER_FAVORITE', user)

                    if (state.favorites.length > 0)
                        dispatch('getMyFavorites')
                });
        },

        removeFavorite({ commit, dispatch, state }, user) {
            return axios.delete('/api/v1/favorites', {
                data: {
                    user: user.id
                }
            })
                .then(response => {
                    commit('REMOVE_USER_FAVORITE', user)

                    if (state.favorites.length > 0)
                        dispatch('getMyFavorites')
                })
        },

        async getMe({ commit }) {
            const response = await axios.get('api/v1/me');
            return commit('SET_ME', response.data.data);
        },

        async updatePhotoProfile({ dispatch }, formData) {
            formData.append('_method', 'PATCH');
            return axios.post('api/v1/profile/update-image', formData, CONFIGS)
                .then(response => dispatch('getMe'));
        },

        async update({ dispatch }, formData) {
            return await axios.patch('api/v1/profile/update', {...formData})
                .then(response => dispatch('getMe'));
        },

        async toogleNotify({ dispatch, state }) {
            return axios.patch('api/v1/profile/update-preference', {
                me_notify: state.me.preference.me_notify
            })
        }
    }
}
