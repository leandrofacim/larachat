import axios from "axios"

export default {
   async getUsers({ commit }) {
        return await axios.get('api/v1/users')
            .then(response => commit('ADD_ALL_USERS', response.data))
    }
}
