import axios from "axios";

export default {
  state: {
    favorites: [],
  },

  mutations: {
    SET_MY_FAVORITES(state, users) {
      state.favorites = users;
    },
  },

  actions: {
    async getMyFavorites({ commit }) {
      const response = await axios.get('/api/v1/favorites');
      return commit('SET_MY_FAVORITES', response.data.data);
    },

    async setNewFavorite({ commit, dispatch, state }, user) {
      const response = await axios.post('/api/v1/favorites', { user: user.id });
      commit('SET_USER_FAVORITE', user);
      if (state.favorites.length > 0)
        dispatch('getMyFavorites');
    }
  }
}