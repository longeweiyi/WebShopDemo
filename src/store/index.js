import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import cart from './modules/cart'
import address from './modules/address'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        cart,
        address
    }
})