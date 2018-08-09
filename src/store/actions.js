import * as types from './mutation-types'

export const payInit = ({commit}) => {
    axios.get('/api/pay')
        .then((res) => {
            if (res.data.status) {
                commit(types.PAY_INIT,res.data.data)
            }
        })
        .catch((err) => {
            console.log('pay_err', err)
        })
}

export const payChk = ({commit}, id) => {
    commit(types.PAY_CHK, id)
}