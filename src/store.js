import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
       bins: []
    },
    getters: {
        getBins: (state) => {
            return state.bins
        }
    },
    mutations: {
        addBin: (state, b) =>{
            if (!state.bins.find(bin=>bin.bin==b.bin)){
                state.bins.push(b)
            }
        },
        deleteBin: (state, bin) => {
            let el;
            for (let i = 0; i < state.bins.length; i++) {
                if (state.bins[i].bin==bin) {
                    el=i;
                    break;
                }
            }
            state.bins.splice(el,1);
        },
        clear: (state)=>state.bins=[]
    },
    actions: {},
});
export default store