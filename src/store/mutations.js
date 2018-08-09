import * as types from './mutation-types'

export default {
    [types.PAY_INIT](state, pay) {
        state.pay = pay
    },
    [types.PAY_CHK](state, id) {
        state.pay_chk = id
    }
}