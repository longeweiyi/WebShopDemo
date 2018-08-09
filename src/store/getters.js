export const pay = state => state.pay
export const pay_chk = state => state.pay_chk
export const payInfo = state => {
    var chk = {};
    state.pay.forEach((item) => {
        if(item.id == state.pay_chk) {
            chk = item
        }
    })
    return {
        chk
    }
}