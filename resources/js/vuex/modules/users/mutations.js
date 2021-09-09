export default {
  ADD_ALL_USERS(state, users) {
    state.users = users
  },

  ADD_ONLINE_USERS(state, users) {
    state.onlineUsers = users
  },

  ADD_ONLINE_USER(state, user) {
    state.onlineUsers.unshift(user)
  },

  REMOVE_ONLINE_USER(state, user) {
    state.onlineUsers = state.onlineUsers.filter(u => u.email !== user.email)
  },

  SET_USER_FAVORITE(state, favoriteUser) {
    state.users.data = state.users.data.map((user, index) => {
      if (user.email === favoriteUser.email) {
        user.isMyFavorite = true;

        return user;
      }
    });
  }
}
