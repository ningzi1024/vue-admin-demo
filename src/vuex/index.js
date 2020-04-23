import Vue from 'vue'
import Vuex from 'vuex'
import state from "./store";
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions
})

