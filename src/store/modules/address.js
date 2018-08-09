import * as types from '../mutation-types'
import axios from '../../../node_modules/axios';

const state = {
    address: [],
    address_chk: 0
}

const getters = {
    address: state => state.address,
    address_chk: state => state.address_chk,
    addressInfo: state => {
        var chk = {};
        state.address.forEach((item) => {
            if (item.id == state.address_chk) {
                chk = item;
            }
        })
        return {
            chk
        }
    }
}

const mutations = {
    [types.ADDRESS_INIT](state, address) {
        for (var i=0;i<address.length;i++) {
            if (address[i].is_default == 1) {
                var address_default = null;
                address_default = address.splice(i,1)[0];
                state.address_chk = address_default.id;
                address.unshift(address_default)
                break;
            }
        }
        state.address = address
    },
    [types.ADDRESS_CHK](state, id) {
        state.address_chk = id
    },
    [types.ADDRESS_SET_DEFAULT](state, id) {
        state.address.forEach((item) => {
            if (item.id == id) {
                item.is_default = 1;
            } else {
                item.is_default = 0
            }
        })
    },
    [types.ADDRESS_DEL](state, id) {
        for (var i=0;i< state.address.length;++i) {
            if(state.address[i].id == id) {
                state.address.splice(i, 1)
                if(state.address_chk==id) {
                    state.address_chk=0;
                }
                break;
            }
        }
    },
    [types.ADDRESS_ADD](state, payload) {
        state.address.push(clone(payload.address));
    }
}

const actions = {
    addressInit ({commit}) {
        axios.get('/api/address')
            .then((res) => {
                if(res.data.status) {
                    commit(types.ADDRESS_INIT,res.data.data)
                }
            })
            .catch((err) => {
                console.log('address_err', err)
            })
    },
    addressChk ({commit}, id) {
        commit(types.ADDRESS_CHK, id)
    },
    addressSetDefault ({commit}, id) {
        setTimeout(() => {
            commit(types.ADDRESS_SET_DEFAULT, id)
        }, 100);
    },
    addressDel ({commit}, id) {
        commit(types.ADDRESS_DEL, id)
    },
    addressAdd ({commit,state}, payload) {
        setTimeout(() => {
            payload.address['id'] = state.address[state.address.length-1].id + 1
            payload.address['is_default'] = 0
            commit(types.ADDRESS_ADD, payload);
            if (payload.success) payload.success();
            if (payload.complete) payload.complete();
        }, 3000);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}