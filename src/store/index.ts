import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    store: {
      // stores globally the logged user credentials
      role: "",
      email: "",
      documento: "",
      token: "",
      nome: ""
    },
    dashColor: "#3D67B0" // defines here the main color to be used
  },
  plugins: [createPersistedState()], // makes vuex to be saved locally
  mutations: {
    SET_USER(state, obj) {
      state.store = obj;
    },
    REMOVE_USER(state) {
      // emptys credentials on logout
      state.store.role = "";
      state.store.email = "";
      state.store.documento = "";
      state.store.token = "";
      state.store.nome = "";
    },
    GET_TOKEN(state) {
      // checks if there is a token
      if (state.store.token == "") {
        return false;
      }
      return true;
    }
  },
  actions: {},
  modules: {}
});
