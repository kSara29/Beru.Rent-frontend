import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({

    plugins: [createPersistedState()],
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  getters: {
    getUser: state => state.user,
  },
});