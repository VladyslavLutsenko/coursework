import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
       
    },
    getters: {
        
    },
    mutations: {
       
    },
    actions: {},
});
export default store