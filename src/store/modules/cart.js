import * as types from '../mutation-types'

const state = {
    cart: [],
    cart_chk: []
}

const getters = {
    cart:state => state.cart,
    cart_chk: state => state.cart_chk,
    cartInfo: state => {
        var chk = []
        var chIsStr = ','+state.cart_chk.join(',')+',';
        var chk_price = 0;
        state.cart.forEach((item) => {
            if(chIsStr.indexOf(',' + item.id + ',') > -1) {
                chk.push(item);
                chk_price += item.price * item.cart_num
            }
        })
        return {
            chk,
            chk_price,
            chIsStr
        }
    }
}

const mutations = {
    [types.CART_INIT](state, cart) {
        state.cart = cart
    },
    [types.CART_ADD](state, payload) {
        var product = payload.product
        var num = payload.num

        var cartItem = state.cart.find(item => item.id == product.id);
        if(cartItem) {
            cartItem.cart_num+=num;
        } else {
            product = clone(product)
            product.cart_num = num;
            state.cart.push(product)
        }
    },
    [types.CART_DEL_NUM](state, product) {
        var cartItem = state.cart.find(item => item.id == product.id);
        cartItem.cart_num--;
    },
    [types.CART_SET_NUM](state, payload) {
        var product = payload.product;
        var cart_num = payload.cart_num
        var cartItem = state.cart.find(item => item.id == product.id);
        cartItem.cart_num = cart_num;
    },
    [types.CART_DEL](state, ids) {
        var idStr = ','+ids.join(',')+',';
        var cart = [];
        var cart_chk = [];
        state.cart.forEach((item) => {
            if (idStr.indexOf(','+item.id+',')==-1) {
                cart.push(item);
            }
        })
        state.cart = cart
        state.cart_chk = cart_chk
    },
    [types.CART_CHK](state,id) {
        var chIsStr = ','+state.cart_chk.join(',')+','
        if (chIsStr.indexOf(','+id+',') > -1) {
            for (var i=0; i<state.cart_chk.length; i++) {
                if (state.cart_chk[i]==id) {
                    state.cart_chk.splice(i,1);
                    return;
                }
            }
        }
        state.cart_chk.push(id)
    },
    [types.CART_CHK_ALL](state,is_all) {
        if (is_all) {
            state.cart_chk = state.cart.map((item) => item.id)
        } else {
            state.cart_chk = []
        }
    },
    [types.CART_SET_CHK](state, cart_chk) {
        state.cart_chk = cart_chk;
    }
}

const actions = {
    cartInit({commit}) {
        axios.get('/api/cart')
            .then((res) => {
                if (res.data.status) {
                    commit(types.CART_INIT, res.data.data);
                }
            })
            .catch((err) => {
                console.log('cart_err', err)
            })
    },
    cartAdd({commit},payload) {
        if (!payload.product.kucun) {
            alert('该商品库存不足');
            return
        }
        var cartItem = state.cart.find(item => item.id == payload.product.id);
        payload.num = payload.num == undefined ? 1 : parseInt(payload.num)
        var cart_num = cartItem ? cartItem.cart_num : 0;
        if (payload.num + cart_num > payload.product.kucun) {
            alert('该商品库存不足');
            return
        }
        setTimeout(() => {
            commit(types.CART_ADD, payload);
            if (payload.success) payload.success();
        }, 100)
    },
    cartDelNum({commit},product){
        var cartItem = state.cart.find(item => item.id == product.id);
        if(cartItem.cart_num <= 1) {
            return
        }
        setTimeout(() => {
            commit(types.CART_DEL_NUM, product);
        }, 100)
    },
    cartSetNum({commit},payload){
        if (isNaN(payload.cart_num)) {
            if (payload.complete) {
                payload.complete()
            }
            return
        }
        payload.cart_num = parseInt(payload.cart_num)
        
        if(payload.cart_num < 1)  payload.cart_num = 1;
        if(payload.cart_num > payload.product.kucun) payload.cart_num = payload.product.kucun
        setTimeout(() => {
            commit(types.CART_SET_NUM, payload);
            if (payload.complete) {
                payload.complete()
            }
        }, 100)
    },
    cartDel ({commit}, ids) {
        setTimeout(() => {
            commit(types.CART_DEL, ids);
        }, 100)
    },
    cartChk ({commit}, id) {
        commit(types.CART_CHK, id)
    },
    cartChkAll ({commit}, is_all) {
        commit(types.CART_CHK_ALL, is_all)
    },
    cartSetChk ({commit}, cart_chk) {
        commit(types.CART_SET_CHK, cart_chk)
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}